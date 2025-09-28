import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Heart, Brain } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const techniques = [
  {
    id: 'relaxation',
    name: 'Relaxation Breathing',
    description: 'A simple technique to help you relax and reduce stress',
    pattern: '4 seconds in, 6 seconds out',
    benefits: ['Reduces anxiety', 'Promotes relaxation', 'Easy to learn'],
    icon: Heart,
    color: '#4FC3F7',
  },
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Used by Navy SEALs for focus and calm under pressure',
    pattern: '4-4-4-4 pattern (in-hold-out-hold)',
    benefits: ['Improves focus', 'Reduces stress', 'Enhances performance'],
    icon: Brain,
    color: '#9C27B0',
  },
  {
    id: 'calm',
    name: '4-7-8 Technique',
    description: 'Dr. Andrew Weil\'s technique for deep relaxation and sleep',
    pattern: '4 seconds in, 7 seconds hold, 8 seconds out',
    benefits: ['Promotes sleep', 'Reduces anxiety', 'Calms nervous system'],
    icon: Clock,
    color: '#66BB6A',
  },
];

export default function TechniquesScreen() {
  return (
    <LinearGradient
      colors={['#e3f2fd', '#f3e5f5', '#e8f5e8']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Breathing Techniques</Text>
        <Text style={styles.subtitle}>Choose the technique that works best for you</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {techniques.map((technique) => {
          const IconComponent = technique.icon;
          return (
            <TouchableOpacity key={technique.id} style={styles.techniqueCard}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconContainer, { backgroundColor: `${technique.color}20` }]}>
                  <IconComponent size={28} color={technique.color} />
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.techniqueName}>{technique.name}</Text>
                  <Text style={styles.techniquePattern}>{technique.pattern}</Text>
                </View>
              </View>

              <Text style={styles.techniqueDescription}>{technique.description}</Text>

              <View style={styles.benefitsContainer}>
                <Text style={styles.benefitsTitle}>Benefits:</Text>
                {technique.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <View style={[styles.bulletPoint, { backgroundColor: technique.color }]} />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Tips for Better Practice</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipText}>• Find a quiet, comfortable space</Text>
            <Text style={styles.tipText}>• Sit or lie down with good posture</Text>
            <Text style={styles.tipText}>• Focus on your breath, not distractions</Text>
            <Text style={styles.tipText}>• Start with shorter sessions and build up</Text>
            <Text style={styles.tipText}>• Practice regularly for best results</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  techniqueCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardTitleContainer: {
    flex: 1,
  },
  techniqueName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  techniquePattern: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  techniqueDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 16,
  },
  benefitsContainer: {
    marginTop: 8,
  },
  benefitsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
  },
  tipsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  tipsList: {
    gap: 8,
  },
  tipText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});

