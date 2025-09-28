import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Vibrate, Palette, Info, Heart } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(Platform.OS !== 'web');
  const [darkMode, setDarkMode] = useState(false);

  const settingsSections = [
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Breathing Reminders',
          description: 'Get reminded to practice breathing exercises',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: Vibrate,
          label: 'Haptic Feedback',
          description: 'Feel gentle vibrations during breathing cues',
          type: 'switch',
          value: hapticFeedback,
          onValueChange: setHapticFeedback,
          disabled: Platform.OS === 'web',
        },
        {
          icon: Palette,
          label: 'Dark Mode',
          description: 'Switch to dark theme for evening practice',
          type: 'switch',
          value: darkMode,
          onValueChange: setDarkMode,
        },
      ],
    },
    {
      title: 'About',
      items: [
        {
          icon: Heart,
          label: 'About Breathe',
          description: 'Learn more about this app and breathing techniques',
          type: 'button',
        },
        {
          icon: Info,
          label: 'Help & Support',
          description: 'Get help with using the app',
          type: 'button',
        },
      ],
    },
  ];

  const stats = {
    sessionsCompleted: 42,
    totalMinutes: 156,
    currentStreak: 7,
    longestStreak: 12,
  };

  return (
    <LinearGradient
      colors={['#e3f2fd', '#f3e5f5', '#e8f5e8']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your breathing experience</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.sessionsCompleted}</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.totalMinutes}</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.currentStreak}</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.longestStreak}</Text>
              <Text style={styles.statLabel}>Best Streak</Text>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity 
                    key={itemIndex} 
                    style={[
                      styles.settingItem,
                      itemIndex === section.items.length - 1 && styles.lastSettingItem
                    ]}
                    disabled={item.disabled}
                    activeOpacity={item.type === 'switch' ? 1 : 0.7}
                  >
                    <View style={styles.settingLeft}>
                      <View style={[
                        styles.settingIcon,
                        item.disabled && styles.settingIconDisabled
                      ]}>
                        <IconComponent 
                          size={22} 
                          color={item.disabled ? '#ccc' : '#4FC3F7'} 
                        />
                      </View>
                      <View style={styles.settingText}>
                        <Text style={[
                          styles.settingLabel,
                          item.disabled && styles.settingLabelDisabled
                        ]}>
                          {item.label}
                        </Text>
                        <Text style={[
                          styles.settingDescription,
                          item.disabled && styles.settingDescriptionDisabled
                        ]}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                    
                    {item.type === 'switch' && (
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        disabled={item.disabled}
                        trackColor={{ false: '#e0e0e0', true: '#4FC3F780' }}
                        thumbColor={item.value ? '#4FC3F7' : '#f4f3f4'}
                        ios_backgroundColor="#e0e0e0"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>Breathe App</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            A simple and beautiful app to help you practice mindful breathing
          </Text>
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
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4FC3F7',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  settingsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  lastSettingItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(79, 195, 247, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingIconDisabled: {
    backgroundColor: 'rgba(204, 204, 204, 0.1)',
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  settingLabelDisabled: {
    color: '#ccc',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  settingDescriptionDisabled: {
    color: '#ddd',
  },
  appInfo: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});