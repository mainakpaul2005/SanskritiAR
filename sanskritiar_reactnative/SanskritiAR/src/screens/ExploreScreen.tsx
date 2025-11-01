import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { heritageSites, heritageCategories, HeritageSite } from '../data/heritageSites';
import { FallbackImage } from '../components/FallbackImage';
import { getThemeColors } from '../styles/colors';
import { Spacing, BorderRadius } from '../styles/spacing';
import { Typography } from '../styles/typography';

const { width } = Dimensions.get('window');

interface ExploreScreenProps {
  navigation: any;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');

  // Get unique states
  const states = ['all', ...new Set(heritageSites.map(site => site.state))];

  // Filter sites
  const filteredSites = heritageSites.filter(site => {
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         site.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'all' || site.state === selectedState;
    const matchesCategory = selectedCategory === 'all' || site.category === selectedCategory;
    return matchesSearch && matchesState && matchesCategory;
  });

  const handleSitePress = (site: HeritageSite) => {
    navigation.navigate('HeritageDetail', { site });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.textInverse }]}>
          Explore Heritage
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textInverse }]}>
          Discover India's Cultural Treasures
        </Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <Icon name="search" size={24} color={colors.textTertiary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search heritage sites..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>

        {/* View Mode Toggle */}
        <View style={styles.viewModeToggle}>
          <TouchableOpacity
            style={[
              styles.viewModeButton,
              viewMode === 'grid' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setViewMode('grid')}>
            <Icon
              name="grid-view"
              size={20}
              color={viewMode === 'grid' ? colors.textInverse : colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewModeButton,
              viewMode === 'list' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setViewMode('list')}>
            <Icon
              name="view-list"
              size={20}
              color={viewMode === 'list' ? colors.textInverse : colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewModeButton,
              viewMode === 'map' && { backgroundColor: colors.primary },
            ]}
            onPress={() => setViewMode('map')}>
            <Icon
              name="map"
              size={20}
              color={viewMode === 'map' ? colors.textInverse : colors.text}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}>
        {/* Category Filter */}
        <TouchableOpacity
          style={[
            styles.filterChip,
            selectedCategory === 'all' && { backgroundColor: colors.primary },
            { backgroundColor: colors.surface },
          ]}
          onPress={() => setSelectedCategory('all')}>
          <Text
            style={[
              styles.filterChipText,
              selectedCategory === 'all' && { color: colors.textInverse },
              { color: colors.text },
            ]}>
            All Types
          </Text>
        </TouchableOpacity>
        {heritageCategories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.filterChip,
              selectedCategory === category.id && { backgroundColor: colors.primary },
              { backgroundColor: colors.surface },
            ]}
            onPress={() => setSelectedCategory(category.id)}>
            <Icon
              name={category.icon as any}
              size={18}
              color={selectedCategory === category.id ? colors.textInverse : colors.text}
            />
            <Text
              style={[
                styles.filterChipText,
                selectedCategory === category.id && { color: colors.textInverse },
                { color: colors.text },
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* State Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.stateFilterContainer}
        contentContainerStyle={styles.filtersContent}>
        {states.map(state => (
          <TouchableOpacity
            key={state}
            style={[
              styles.stateChip,
              selectedState === state && { backgroundColor: colors.secondary },
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            onPress={() => setSelectedState(state)}>
            <Text
              style={[
                styles.stateChipText,
                selectedState === state && { color: colors.textInverse },
                { color: colors.textSecondary },
              ]}>
              {state === 'all' ? 'All States' : state}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results */}
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsText, { color: colors.textSecondary }]}>
          {filteredSites.length} sites found
        </Text>
      </View>

      {/* Content */}
      {viewMode === 'map' ? (
        <View style={[styles.mapView, { backgroundColor: colors.surface }]}>
          <Icon name="map" size={60} color={colors.textTertiary} />
          <Text style={[styles.mapText, { color: colors.textSecondary }]}>
            Map View Coming Soon
          </Text>
          <Text style={[styles.mapSubtext, { color: colors.textTertiary }]}>
            Interactive map with heritage site markers
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
            {filteredSites.map(site => (
              <TouchableOpacity
                key={site.id}
                style={[
                  viewMode === 'grid' ? styles.gridCard : styles.listCard,
                  { backgroundColor: colors.card },
                ]}
                onPress={() => handleSitePress(site)}
                activeOpacity={0.8}>
                <FallbackImage
                  uri={site.image}
                  style={viewMode === 'grid' ? styles.gridImage : styles.listImage}
                  fallbackIcon="landscape"
                  fallbackColors={[colors.primary, colors.accent]}
                />
                <View style={viewMode === 'grid' ? styles.gridCardContent : styles.listCardContent}>
                  <Text
                    style={[styles.cardTitle, { color: colors.text }]}
                    numberOfLines={2}>
                    {site.name}
                  </Text>
                  <View style={styles.cardLocation}>
                    <Icon name="location-on" size={16} color={colors.secondary} />
                    <Text
                      style={[styles.cardLocationText, { color: colors.textSecondary }]}
                      numberOfLines={1}>
                      {site.location}
                    </Text>
                  </View>
                  {viewMode === 'list' && (
                    <Text
                      style={[styles.cardDescription, { color: colors.textSecondary }]}
                      numberOfLines={2}>
                      {site.description}
                    </Text>
                  )}
                  <View style={[styles.cardBadge, { backgroundColor: colors.primary + '20' }]}>
                    <Text style={[styles.cardBadgeText, { color: colors.primary }]}>
                      {site.category}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingTop: Spacing.md,
  },
  headerTitle: {
    ...Typography.display,
    fontWeight: '800',
    marginBottom: Spacing.sm,
    letterSpacing: -1,
  },
  headerSubtitle: {
    ...Typography.h6,
    opacity: 0.95,
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    paddingVertical: Spacing.xs,
  },
  viewModeToggle: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    maxHeight: 50,
  },
  filtersContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  filterChipText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  stateFilterContainer: {
    maxHeight: 40,
    marginTop: Spacing.sm,
  },
  stateChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  stateChipText: {
    ...Typography.caption,
    fontWeight: '500',
  },
  resultsHeader: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  resultsText: {
    ...Typography.body,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  listContainer: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  gridCard: {
    width: '100%',
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  listCard: {
    flexDirection: 'row',
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  gridImage: {
    width: '100%',
    height: 220,
  },
  listImage: {
    width: 140,
    height: 140,
  },
  gridImagePlaceholder: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listImagePlaceholder: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridCardContent: {
    padding: Spacing.lg,
  },
  listCardContent: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...Typography.h5,
    fontWeight: '700',
    marginBottom: Spacing.sm,
    lineHeight: 28,
  },
  cardLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  cardLocationText: {
    ...Typography.body,
    flex: 1,
  },
  cardDescription: {
    ...Typography.body,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  cardBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  cardBadgeText: {
    ...Typography.labelSmall,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  mapView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
  },
  mapText: {
    ...Typography.h3,
    marginTop: Spacing.md,
  },
  mapSubtext: {
    ...Typography.body,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
});
