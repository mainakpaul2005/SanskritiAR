import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { HeritageSite } from '../data/heritageSites';
import { FallbackImage } from '../components/FallbackImage';
import { getThemeColors } from '../styles/colors';
import { Spacing, BorderRadius } from '../styles/spacing';
import { Typography } from '../styles/typography';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  HeritageDetail: { site: HeritageSite };
  ARView: { site: HeritageSite };
};

type HeritageDetailScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HeritageDetail'>;
  route: RouteProp<RootStackParamList, 'HeritageDetail'>;
};

export const HeritageDetailScreen: React.FC<HeritageDetailScreenProps> = ({
  navigation,
  route,
}) => {
  const { site } = route.params;
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const { isFavorite: checkIsFavorite, toggleFavorite } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(checkIsFavorite(site.id));

  useEffect(() => {
    setIsFavorite(checkIsFavorite(site.id));
  }, [site.id, checkIsFavorite]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${site.name} - ${site.description}\n\nLocation: ${site.location}`,
        title: site.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleARView = () => {
    navigation.navigate('ARView', { site });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <FallbackImage 
            uri={site.image}
            style={styles.headerImage}
            fallbackIcon="landscape"
            fallbackColors={[colors.primary, colors.accent]}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.8)']}
            style={styles.imageOverlay}
          />
          
          {/* Header Buttons */}
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={[styles.headerButton, { backgroundColor: colors.card }]}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
            <View style={styles.headerButtonsRight}>
              <TouchableOpacity
                style={[styles.headerButton, { backgroundColor: colors.card }]}
                onPress={async () => {
                  await toggleFavorite(site.id);
                  setIsFavorite(!isFavorite);
                }}>
                <Icon
                  name={isFavorite ? 'favorite' : 'favorite-border'}
                  size={24}
                  color={isFavorite ? colors.error : colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.headerButton, { backgroundColor: colors.card }]}
                onPress={handleShare}>
                <Icon name="share" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Category Badge */}
          <View style={[styles.floatingBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.badgeText, { color: colors.textInverse }]}>
              {site.category.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Content */}
        <View style={[styles.content, { backgroundColor: colors.background }]}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.title, { color: colors.text }]}>{site.name}</Text>
            <View style={styles.locationRow}>
              <Icon name="location-on" size={20} color={colors.secondary} />
              <Text style={[styles.location, { color: colors.textSecondary }]}>
                {site.location}
              </Text>
            </View>
          </View>

          {/* Quick Info Cards */}
          <View style={styles.infoCards}>
            <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
              <Icon name="access-time" size={24} color={colors.accent} />
              <Text style={[styles.infoCardLabel, { color: colors.textSecondary }]}>Built</Text>
              <Text style={[styles.infoCardValue, { color: colors.text }]}>
                {site.yearBuilt || 'Ancient'}
              </Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
              <Icon name="place" size={24} color={colors.accent} />
              <Text style={[styles.infoCardLabel, { color: colors.textSecondary }]}>State</Text>
              <Text style={[styles.infoCardValue, { color: colors.text }]}>
                {site.state}
              </Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
              <Icon name="star" size={24} color={colors.accent} />
              <Text style={[styles.infoCardLabel, { color: colors.textSecondary }]}>Type</Text>
              <Text style={[styles.infoCardValue, { color: colors.text }]}>
                {site.category}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="description" size={24} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
            </View>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {site.description}
            </Text>
          </View>

          {/* Significance */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="stars" size={24} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Significance</Text>
            </View>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {site.significance}
            </Text>
          </View>

          {/* Decorative Mandala Pattern */}
          <View style={[styles.decorativePattern, { borderColor: colors.border }]}>
            <Text style={[styles.decorativeText, { color: colors.accent }]}>✦ ❋ ✦</Text>
          </View>

          {/* AR View Button */}
          <TouchableOpacity onPress={handleARView} activeOpacity={0.8}>
            <LinearGradient
              colors={[colors.primary, colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.arButton}>
              <Icon name="view-in-ar" size={28} color={colors.textInverse} />
              <Text style={[styles.arButtonText, { color: colors.textInverse }]}>
                Experience in AR
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: height * 0.5,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    ...Typography.h3,
    marginTop: Spacing.md,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  headerButtons: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButtonsRight: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  floatingBadge: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  badgeText: {
    ...Typography.caption,
    fontWeight: '700',
    letterSpacing: 1,
  },
  content: {
    padding: Spacing.lg,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    marginTop: -20,
  },
  titleSection: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    marginBottom: Spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  location: {
    ...Typography.body,
    flex: 1,
  },
  infoCards: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  infoCard: {
    flex: 1,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  infoCardLabel: {
    ...Typography.caption,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCardValue: {
    ...Typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
  },
  description: {
    ...Typography.body,
    lineHeight: 24,
  },
  decorativePattern: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: Spacing.md,
    marginVertical: Spacing.xl,
    alignItems: 'center',
  },
  decorativeText: {
    fontSize: 24,
    letterSpacing: 8,
  },
  arButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  arButtonText: {
    ...Typography.h3,
    fontWeight: '600',
  },
});
