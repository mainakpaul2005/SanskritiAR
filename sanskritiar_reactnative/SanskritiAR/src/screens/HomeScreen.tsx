import React, { useState } from 'react';
import {
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  View,
  Text as RNText,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { heritageSites, heritageCategories, HeritageSite } from '../data/heritageSites';
import { FallbackImage } from '../components/FallbackImage';
import { AppLogo } from '../components/AppLogo';
import { IndianDecor } from '../components/IndianDecor';
import { getThemeColors } from '../styles/colors';
import { Spacing, BorderRadius } from '../styles/spacing';
import { Typography } from '../styles/typography';
import { ACTIVE_OPACITY } from '../styles/animations';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - Spacing.lg * 2; // Full width card with margins

interface HeritageSiteCardProps {
  site: HeritageSite;
  onPress: () => void;
}

const HeritageSiteCard: React.FC<HeritageSiteCardProps> = ({ site, onPress }) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  
  return (
    <TouchableOpacity style={[styles.heritageCard, { backgroundColor: colors.card }]} onPress={onPress} activeOpacity={ACTIVE_OPACITY.MEDIUM}>
      <View style={styles.cardImageContainer}>
        <FallbackImage 
          uri={site.image}
          style={styles.cardImage}
          fallbackIcon="landscape"
          fallbackColors={[colors.primary, colors.accent]}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageGradient}
        />
        <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
          <RNText style={[styles.categoryText, { color: colors.textInverse }]}>
            {site.category.toUpperCase()}
          </RNText>
        </View>
      </View>
      <View style={styles.cardContent}>
        <RNText style={[styles.siteTitle, { color: colors.text }]} numberOfLines={2}>
          {site.name}
        </RNText>
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color={colors.secondary} />
          <RNText style={[styles.locationText, { color: colors.textSecondary }]} numberOfLines={1}>
            {site.location}
          </RNText>
        </View>
        <RNText style={[styles.siteDescription, { color: colors.textSecondary }]} numberOfLines={2}>
          {site.description}
        </RNText>
        <View style={styles.yearContainer}>
          <Icon name="access-time" size={14} color={colors.textTertiary} />
          <RNText style={[styles.yearText, { color: colors.textTertiary }]}>
            {site.yearBuilt || 'Ancient'}
          </RNText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface CategoryFilterProps {
  categories: typeof heritageCategories;
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
      contentContainerStyle={styles.categoryContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryChip,
            { 
              backgroundColor: selectedCategory === category.id ? colors.primary : colors.surface,
              borderColor: selectedCategory === category.id ? colors.primary : colors.border,
            },
          ]}
          onPress={() => onCategorySelect(category.id)}
          activeOpacity={0.8}
        >
          <Icon 
            name={category.icon as any} 
            size={16} 
            color={selectedCategory === category.id ? colors.textInverse : colors.primary} 
          />
          <RNText style={[
            styles.categoryChipText,
            { 
              color: selectedCategory === category.id ? colors.textInverse : colors.primary,
            },
          ]}>
            {category.name}
          </RNText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const colors = getThemeColors(isDark);

  const filteredSites = selectedCategory === 'all' 
    ? heritageSites 
    : heritageSites.filter(site => site.category === selectedCategory);

  const handleSitePress = (site: HeritageSite) => {
    navigation.navigate('HeritageDetail', { site });
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.header}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <AppLogo size="small" variant="icon-only" color={colors.textInverse} />
            <View style={styles.greetingContainer}>
              <RNText style={[styles.greeting, { color: colors.textInverse }]}>
                Welcome back,
              </RNText>
              <RNText style={[styles.userName, { color: colors.textInverse }]}>
                {user?.email?.split('@')[0] || 'Explorer'}
              </RNText>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.themeToggle} 
              onPress={toggleTheme}
            >
              <Icon 
                name={isDark ? 'light-mode' : 'dark-mode'} 
                size={24} 
                color={colors.textInverse} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Icon name="logout" size={24} color={colors.textInverse} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
          <Icon name="search" size={20} color={colors.textTertiary} />
          <RNText style={[styles.searchPlaceholder, { color: colors.textTertiary }]}>
            Search heritage sites...
          </RNText>
          <TouchableOpacity>
            <Icon name="tune" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Icon name="account-balance" size={32} color={colors.primary} />
            <RNText style={[styles.statNumber, { color: colors.text }]}>
              {heritageSites.length}
            </RNText>
            <RNText style={[styles.statLabel, { color: colors.textSecondary }]}>
              Heritage Sites
            </RNText>
          </View>
          <View style={[styles.statCard, { backgroundColor: colors.card }]}>
            <Icon name="explore" size={32} color={colors.secondary} />
            <RNText style={[styles.statNumber, { color: colors.text }]}>
              {heritageCategories.length - 1}
            </RNText>
            <RNText style={[styles.statLabel, { color: colors.textSecondary }]}>
              Categories
            </RNText>
          </View>
        </View>

        {/* Decorative Separator */}
        <IndianDecor type="separator" size="small" />

        {/* Category Filter */}
        <View style={styles.filterSection}>
          <RNText style={[styles.sectionTitle, { color: colors.text }]}>
            Explore by Category
          </RNText>
          <CategoryFilter
            categories={heritageCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </View>

        {/* Heritage Sites Grid */}
        <View style={styles.sitesSection}>
          <View style={styles.sectionHeader}>
            <RNText style={[styles.sectionTitle, { color: colors.text }]}>
              {selectedCategory === 'all' ? 'All Sites' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}s`}
            </RNText>
            <RNText style={[styles.sitesCount, { color: colors.textSecondary }]}>
              {filteredSites.length} sites
            </RNText>
          </View>
          
          <View style={styles.sitesGrid}>
            {filteredSites.map((site) => (
              <HeritageSiteCard
                key={site.id}
                site={site}
                onPress={() => handleSitePress(site)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  // Header styles - Minimal
  header: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greetingContainer: {
    marginLeft: Spacing.sm,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    ...Typography.body,
    opacity: 0.95,
    marginBottom: 4,
    fontWeight: '500',
  },
  userName: {
    ...Typography.h2,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  themeToggle: {
    padding: Spacing.sm,
    marginRight: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  logoutButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  
  // Content styles
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Spacing.xl,
  },
  
  // Search styles - Clean
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    marginHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    borderRadius: BorderRadius.md,
    shadowColor: '#2E3440',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchPlaceholder: {
    ...Typography.body,
    flex: 1,
    marginHorizontal: Spacing.md,
  },
  
  // Stats styles - Minimal cards
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginTop: Spacing.xl,
    gap: Spacing.lg,
  },
  statCard: {
    flex: 1,
    padding: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    shadowColor: '#2E3440',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statNumber: {
    ...Typography.h1,
    fontWeight: '700',
    marginTop: Spacing.sm,
    letterSpacing: -0.5,
  },
  statLabel: {
    ...Typography.bodySmall,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  
  // Section styles - Clean spacing
  filterSection: {
    marginTop: Spacing.xxxl,
    marginBottom: Spacing.lg,
  },
  sitesSection: {
    marginTop: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h3,
    fontWeight: '700',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
    letterSpacing: -0.3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sitesCount: {
    ...Typography.body,
    fontWeight: '600',
  },
  
  // Category filter styles - Minimal chips
  categoryContainer: {
    paddingHorizontal: Spacing.xl,
  },
  categoryContent: {
    gap: Spacing.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1.5,
    gap: Spacing.sm,
  },
  categoryChipText: {
    ...Typography.label,
    fontWeight: '600',
  },
  
  // Heritage card styles - Clean & minimal
  sitesGrid: {
    gap: Spacing.xl,
  },
  heritageCard: {
    width: CARD_WIDTH,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#2E3440',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: Spacing.lg,
  },
  cardImageContainer: {
    position: 'relative',
    height: 200,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  imagePlaceholderText: {
    ...Typography.caption,
    textAlign: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    shadowColor: '#2E3440',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryText: {
    ...Typography.labelSmall,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardContent: {
    padding: Spacing.xl,
  },
  siteTitle: {
    ...Typography.h4,
    fontWeight: '600',
    marginBottom: Spacing.sm,
    lineHeight: 26,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  locationText: {
    ...Typography.bodySmall,
    flex: 1,
  },
  siteDescription: {
    ...Typography.bodySmall,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  yearText: {
    ...Typography.bodySmall,
    fontWeight: '500',
  },
});