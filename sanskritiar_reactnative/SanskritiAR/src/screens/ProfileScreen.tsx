import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getThemeColors } from '../styles/colors';
import { Spacing, BorderRadius } from '../styles/spacing';
import { Typography } from '../styles/typography';

interface ProfileScreenProps {
  navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const colors = getThemeColors(isDark);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const stats = [
    { id: '1', label: 'Sites Visited', value: '12', icon: 'place' },
    { id: '2', label: 'Favorites', value: '8', icon: 'favorite' },
    { id: '3', label: 'AR Views', value: '25', icon: 'view-in-ar' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: colors.textInverse }]}>
            <Icon name="person" size={48} color={colors.primary} />
          </View>
          <Text style={[styles.userName, { color: colors.textInverse }]}>
            {user?.name || 'Heritage Explorer'}
          </Text>
          <Text style={[styles.userEmail, { color: colors.textInverse }]}>
            {user?.email || 'explorer@sanskritiar.com'}
          </Text>
          
          {/* Decorative Mandala Pattern */}
          <Text style={[styles.decorativePattern, { color: colors.textInverse }]}>
            ✦ ❋ ✦
          </Text>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map(stat => (
            <View key={stat.id} style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Icon name={stat.icon as any} size={32} color={colors.accent} />
              <Text style={[styles.statValue, { color: colors.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Sections */}
        <View style={styles.content}>
          {/* Account Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>ACCOUNT</Text>
            
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name="person" size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>Edit Profile</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.textTertiary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name="favorite-border" size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>My Favorites</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.textTertiary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name="history" size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>Visit History</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>PREFERENCES</Text>
            
            <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name={isDark ? 'dark-mode' : 'light-mode'} size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>Dark Mode</Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.disabled, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>

            <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name="notifications-none" size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: colors.disabled, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>

            <View style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name="location-on" size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>Location Services</Text>
              </View>
              <Switch
                value={locationEnabled}
                onValueChange={setLocationEnabled}
                trackColor={{ false: colors.disabled, true: colors.primary }}
                thumbColor={colors.textInverse}
              />
            </View>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name="language" size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>Language</Text>
                <Text style={[styles.menuItemSubtext, { color: colors.textTertiary }]}>English</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>SUPPORT</Text>
            
            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name="help" size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>Help & Support</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.textTertiary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name="info" size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>About SanskritiAR</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.textTertiary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colors.card }]}>
              <View style={styles.menuItemLeft}>
                <Icon name="security" size={24} color={colors.primary} />
                <Text style={[styles.menuItemText, { color: colors.text }]}>Privacy Policy</Text>
              </View>
              <Icon name="chevron-right" size={24} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.card, borderColor: colors.error }]}
            onPress={handleLogout}>
            <Icon name="logout" size={24} color={colors.error} />
            <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
          </TouchableOpacity>

          {/* Version */}
          <Text style={[styles.versionText, { color: colors.textTertiary }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  userName: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    ...Typography.body,
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  decorativePattern: {
    fontSize: 20,
    letterSpacing: 8,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginTop: -Spacing.xxl,
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    ...Typography.h2,
    marginTop: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  content: {
    padding: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.caption,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  menuItemText: {
    ...Typography.body,
    flex: 1,
  },
  menuItemSubtext: {
    ...Typography.caption,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    marginBottom: Spacing.lg,
  },
  logoutText: {
    ...Typography.body,
    fontWeight: '600',
  },
  versionText: {
    ...Typography.caption,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
