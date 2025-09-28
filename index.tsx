import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  interpolate,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Pause, RotateCcw } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.6;

const breathingTechniques = {
  relaxation: { inhale: 4, hold: 0, exhale: 6, name: 'Relaxation' },
  box: { inhale: 4, hold: 4, exhale: 4, name: 'Box Breathing' },
  calm: { inhale: 4, hold: 7, exhale: 8, name: '4-7-8 Technique' },
};

export default function HomeScreen() {
  const [isActive, setIsActive] = useState(false);
  const [currentTechnique, setCurrentTechnique] = useState('relaxation');
  const [phase, setPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionTime, setSessionTime] = useState(5); // minutes
  const [totalTime, setTotalTime] = useState(5 * 60); // seconds
  
  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0.3);
  const rotation = useSharedValue(0);

  const technique = breathingTechniques[currentTechnique];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` }
    ],
    opacity: opacity.value,
  }));

  const startBreathingAnimation = () => {
    const { inhale, hold, exhale } = technique;
    const totalCycle = inhale + hold + exhale;
    
    const animateBreathingCycle = () => {
      // Inhale phase
      scale.value = withTiming(1.2, {
        duration: inhale * 1000,
        easing: Easing.inOut(Easing.ease),
      });
      opacity.value = withTiming(0.8, {
        duration: inhale * 1000,
        easing: Easing.inOut(Easing.ease),
      });
      
      // Hold phase (if any)
      if (hold > 0) {
        setTimeout(() => {
          setPhase('hold');
        }, inhale * 1000);
      }
      
      // Exhale phase
      setTimeout(() => {
        setPhase('exhale');
        scale.value = withTiming(0.7, {
          duration: exhale * 1000,
          easing: Easing.inOut(Easing.ease),
        });
        opacity.value = withTiming(0.3, {
          duration: exhale * 1000,
          easing: Easing.inOut(Easing.ease),
        });
      }, (inhale + hold) * 1000);
      
      // Reset to inhale
      setTimeout(() => {
        setPhase('inhale');
        if (Platform.OS !== 'web') {
          Haptics.selectionAsync();
        }
      }, totalCycle * 1000);
    };

    // Start the repeating animation
    rotation.value = withRepeat(
      withTiming(360, { duration: totalCycle * 1000, easing: Easing.linear }),
      -1
    );
    
    animateBreathingCycle();
    const interval = setInterval(animateBreathingCycle, totalCycle * 1000);
    
    return interval;
  };

  useEffect(() => {
    let interval;
    let breathingInterval;
    
    if (isActive && timeLeft > 0) {
      setPhase('inhale');
      breathingInterval = startBreathingAnimation();
      
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (breathingInterval) clearInterval(breathingInterval);
      cancelAnimation(scale);
      cancelAnimation(opacity);
      cancelAnimation(rotation);
    };
  }, [isActive, timeLeft, currentTechnique]);

  const startSession = () => {
    setTimeLeft(sessionTime * 60);
    setTotalTime(sessionTime * 60);
    setIsActive(true);
  };

  const pauseSession = () => {
    setIsActive(false);
  };

  const resetSession = () => {
    setIsActive(false);
    setTimeLeft(sessionTime * 60);
    setTotalTime(sessionTime * 60);
    setPhase('inhale');
    scale.value = 0.7;
    opacity.value = 0.3;
    rotation.value = 0;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return '#4FC3F7';
      case 'hold': return '#9C27B0';
      case 'exhale': return '#66BB6A';
      default: return '#4FC3F7';
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      default: return 'Breathe In';
    }
  };

  return (
    <LinearGradient
      colors={['#e3f2fd', '#f3e5f5', '#e8f5e8']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Breathe</Text>
        <Text style={styles.subtitle}>{technique.name}</Text>
      </View>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.phaseText}>{getPhaseText()}</Text>
      </View>

      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, animatedStyle]}>
          <LinearGradient
            colors={[getPhaseColor(), `${getPhaseColor()}80`]}
            style={styles.circleGradient}
          />
        </Animated.View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={resetSession}
        >
          <RotateCcw size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.playButton]}
          onPress={isActive ? pauseSession : startSession}
        >
          {isActive ? (
            <Pause size={32} color="#fff" />
          ) : (
            <Play size={32} color="#fff" />
          )}
        </TouchableOpacity>

        <View style={styles.sessionControls}>
          <Text style={styles.sessionLabel}>Session</Text>
          <View style={styles.sessionButtons}>
            {[3, 5, 10].map((minutes) => (
              <TouchableOpacity
                key={minutes}
                style={[
                  styles.sessionButton,
                  sessionTime === minutes && styles.sessionButtonActive
                ]}
                onPress={() => {
                  setSessionTime(minutes);
                  if (!isActive) {
                    setTimeLeft(minutes * 60);
                    setTotalTime(minutes * 60);
                  }
                }}
              >
                <Text
                  style={[
                    styles.sessionButtonText,
                    sessionTime === minutes && styles.sessionButtonTextActive
                  ]}
                >
                  {minutes}m
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.techniqueSelector}>
        {Object.entries(breathingTechniques).map(([key, tech]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.techniqueButton,
              currentTechnique === key && styles.techniqueButtonActive
            ]}
            onPress={() => {
              if (!isActive) {
                setCurrentTechnique(key);
                setPhase('inhale');
              }
            }}
          >
            <Text
              style={[
                styles.techniqueText,
                currentTechnique === key && styles.techniqueTextActive
              ]}
            >
              {tech.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
}