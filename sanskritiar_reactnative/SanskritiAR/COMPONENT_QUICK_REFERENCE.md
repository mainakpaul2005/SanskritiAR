# 🎨 Modern UI Component Examples

## Quick Reference Guide for SanskritiAR Developers

---

## 📐 Typography Examples

### Headings
```tsx
import { Typography } from '../styles/typography';

// Display - Hero text (Playfair Display, 48px)
<Text style={[Typography.display, { color: colors.text }]}>
  Explore Heritage
</Text>

// H1 - Main headings (Playfair Display, 34px)
<Text style={[Typography.h1, { color: colors.text }]}>
  Welcome to SanskritiAR
</Text>

// H2 - Section headings (Playfair Display, 30px)
<Text style={[Typography.h2, { color: colors.text }]}>
  Featured Sites
</Text>

// H3 - Card titles (Poppins Bold, 26px)
<Text style={[Typography.h3, { color: colors.text }]}>
  Taj Mahal
</Text>

// Body - Regular text (Poppins Regular, 16px)
<Text style={[Typography.body, { color: colors.textSecondary }]}>
  An ivory-white marble mausoleum...
</Text>

// Caption - Small text (Poppins Regular, 12px)
<Text style={[Typography.caption, { color: colors.textTertiary }]}>
  Built in 1653
</Text>
```

---

## 🎨 Color Usage

### Primary Colors
```tsx
// Primary - Main brand color
<View style={{ backgroundColor: colors.primary }}>
  <Text style={{ color: colors.textInverse }}>Primary</Text>
</View>

// Secondary - Accent actions
<TouchableOpacity style={{ backgroundColor: colors.secondary }}>
  <Text>Explore</Text>
</TouchableOpacity>

// Accent - Highlights
<View style={{ borderColor: colors.accent, borderWidth: 2 }}>
  <Text>Special</Text>
</View>
```

### Gradients
```tsx
import { LinearGradient } from 'expo-linear-gradient';

// Primary gradient
<LinearGradient
  colors={[colors.gradientStart, colors.gradientEnd]}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.gradient}
>
  <Text>Gradient Background</Text>
</LinearGradient>

// Image overlay
<LinearGradient
  colors={['transparent', 'rgba(0,0,0,0.7)']}
  style={StyleSheet.absoluteFillObject}
/>
```

---

## 🖼️ Image Components

### Using FallbackImage
```tsx
import { FallbackImage } from '../components/FallbackImage';

// Basic usage
<FallbackImage 
  uri="https://images.unsplash.com/photo-..."
  style={{ width: 200, height: 200, borderRadius: 12 }}
/>

// With custom fallback
<FallbackImage 
  uri={site.image}
  style={styles.image}
  fallbackIcon="landscape"
  fallbackColors={[colors.primary, colors.accent]}
/>

// Full width card image
<FallbackImage 
  uri={imageUrl}
  style={{ 
    width: '100%', 
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  }}
/>
```

---

## 🔘 Button Variants

### Primary Button (Gradient)
```tsx
<Button
  title="Get Started"
  onPress={handlePress}
  variant="primary"
  size="large"
/>
```

### Secondary Button
```tsx
<Button
  title="Learn More"
  onPress={handlePress}
  variant="secondary"
  size="medium"
/>
```

### Outline Button
```tsx
<Button
  title="Cancel"
  onPress={handlePress}
  variant="outline"
  size="medium"
/>
```

### With Icons
```tsx
<Button
  title="Continue"
  onPress={handlePress}
  variant="primary"
  leftIcon={<Icon name="arrow-forward" size={20} color="#FFF" />}
/>

<Button
  title="Share"
  onPress={handleShare}
  variant="outline"
  rightIcon={<Icon name="share" size={18} color={colors.primary} />}
/>
```

### Loading State
```tsx
<Button
  title="Submitting..."
  onPress={handleSubmit}
  loading={isLoading}
  variant="primary"
/>
```

---

## 📱 Card Layouts

### Modern Card with Image
```tsx
<View style={styles.card}>
  <FallbackImage 
    uri={site.image}
    style={styles.cardImage}
  />
  <LinearGradient
    colors={['transparent', 'rgba(0,0,0,0.7)']}
    style={styles.imageGradient}
  />
  <View style={styles.cardContent}>
    <Text style={[Typography.h4, { color: colors.text }]}>
      {site.name}
    </Text>
    <Text style={[Typography.caption, { color: colors.textSecondary }]}>
      {site.location}
    </Text>
  </View>
</View>

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  imageGradient: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    height: 100,
  },
  cardContent: {
    padding: Spacing.md,
  },
});
```

---

## 🏷️ Badge Components

### Category Badge
```tsx
<View style={[styles.badge, { backgroundColor: colors.primary }]}>
  <Text style={[Typography.overline, { color: colors.textInverse }]}>
    TEMPLE
  </Text>
</View>

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
});
```

### Status Badge
```tsx
// Success
<View style={[styles.statusBadge, { backgroundColor: colors.success + '20' }]}>
  <Icon name="check-circle" size={16} color={colors.success} />
  <Text style={[Typography.caption, { color: colors.success }]}>
    Verified
  </Text>
</View>

// Warning
<View style={[styles.statusBadge, { backgroundColor: colors.warning + '20' }]}>
  <Icon name="warning" size={16} color={colors.warning} />
  <Text style={[Typography.caption, { color: colors.warning }]}>
    Limited Access
  </Text>
</View>
```

---

## 📋 List Items

### Modern List Item
```tsx
<TouchableOpacity style={styles.listItem} activeOpacity={0.8}>
  <FallbackImage 
    uri={item.image}
    style={styles.listImage}
  />
  <View style={styles.listContent}>
    <Text style={[Typography.body, { color: colors.text, fontWeight: '600' }]}>
      {item.name}
    </Text>
    <View style={styles.listMeta}>
      <Icon name="location-on" size={14} color={colors.textTertiary} />
      <Text style={[Typography.caption, { color: colors.textSecondary }]}>
        {item.location}
      </Text>
    </View>
  </View>
  <Icon name="chevron-right" size={24} color={colors.textTertiary} />
</TouchableOpacity>

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.md,
  },
  listContent: {
    flex: 1,
  },
  listMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.xs,
  },
});
```

---

## 🔍 Search Bar

### Modern Search Input
```tsx
<View style={[styles.searchBar, { backgroundColor: colors.surface }]}>
  <Icon name="search" size={22} color={colors.textTertiary} />
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

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
});
```

---

## 🎯 Filter Chips

### Category Filter Chips
```tsx
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  <View style={styles.chipContainer}>
    {categories.map((category) => (
      <TouchableOpacity
        key={category.id}
        style={[
          styles.chip,
          selected === category.id && styles.chipSelected,
          { 
            backgroundColor: selected === category.id 
              ? colors.primary 
              : colors.surface 
          }
        ]}
        onPress={() => setSelected(category.id)}
      >
        <Icon 
          name={category.icon} 
          size={18} 
          color={selected === category.id ? colors.textInverse : colors.primary} 
        />
        <Text style={[
          Typography.caption,
          { 
            color: selected === category.id 
              ? colors.textInverse 
              : colors.text,
            fontWeight: '600',
          }
        ]}>
          {category.name}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</ScrollView>

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
```

---

## 💫 Loading States

### Skeleton Loader
```tsx
<View style={styles.skeletonCard}>
  <View style={[styles.skeletonImage, { backgroundColor: colors.surface }]} />
  <View style={styles.skeletonContent}>
    <View style={[styles.skeletonTitle, { backgroundColor: colors.surface }]} />
    <View style={[styles.skeletonText, { backgroundColor: colors.surface }]} />
  </View>
</View>

const styles = StyleSheet.create({
  skeletonCard: {
    backgroundColor: colors.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  skeletonImage: {
    width: '100%',
    height: 180,
  },
  skeletonContent: {
    padding: Spacing.md,
  },
  skeletonTitle: {
    height: 20,
    borderRadius: 4,
    marginBottom: Spacing.sm,
  },
  skeletonText: {
    height: 14,
    width: '60%',
    borderRadius: 4,
  },
});
```

### Activity Indicator
```tsx
<View style={styles.loadingContainer}>
  <ActivityIndicator size="large" color={colors.primary} />
  <Text style={[Typography.body, { color: colors.textSecondary, marginTop: Spacing.md }]}>
    Loading heritage sites...
  </Text>
</View>
```

---

## 🎨 Shadow Styles

### Elevation Levels
```tsx
// Subtle shadow (cards)
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 4,
  elevation: 2,
}

// Medium shadow (buttons, chips)
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 8,
  elevation: 4,
}

// Strong shadow (modals, floating elements)
{
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 12,
  elevation: 8,
}
```

---

## 🎭 Animation Examples

### Fade In Animation
```tsx
import { Animated } from 'react-native';

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
}, []);

<Animated.View style={{ opacity: fadeAnim }}>
  {/* Content */}
</Animated.View>
```

### Scale Animation
```tsx
const scaleAnim = useRef(new Animated.Value(0.9)).current;

useEffect(() => {
  Animated.spring(scaleAnim, {
    toValue: 1,
    tension: 50,
    friction: 7,
    useNativeDriver: true,
  }).start();
}, []);

<Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
  {/* Content */}
</Animated.View>
```

---

## 🎯 Best Practices

### 1. Always use theme colors
```tsx
❌ Bad: style={{ color: '#FF0000' }}
✅ Good: style={{ color: colors.error }}
```

### 2. Use typography styles
```tsx
❌ Bad: style={{ fontSize: 16, fontWeight: '600' }}
✅ Good: style={[Typography.body, { fontWeight: '600' }]}
```

### 3. Consistent spacing
```tsx
❌ Bad: style={{ padding: 10, margin: 5 }}
✅ Good: style={{ padding: Spacing.md, margin: Spacing.sm }}
```

### 4. Use BorderRadius constants
```tsx
❌ Bad: borderRadius: 8
✅ Good: borderRadius: BorderRadius.md
```

### 5. Handle dark mode
```tsx
const { isDark } = useTheme();
const colors = getThemeColors(isDark);
// Always use colors from theme
```

---

## 📱 Responsive Breakpoints

```tsx
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const isSmallDevice = width < 375;
const isMediumDevice = width >= 375 && width < 768;
const isLargeDevice = width >= 768;

// Responsive card width
const CARD_WIDTH = isSmallDevice 
  ? width - Spacing.lg * 2 
  : (width - Spacing.lg * 3) / 2;
```

---

## 🎨 Quick Color Reference

```tsx
// Status colors with alpha
backgroundColor: colors.success + '20'  // 20% opacity success
backgroundColor: colors.error + '10'    // 10% opacity error
backgroundColor: colors.primary + '15'  // 15% opacity primary

// Text hierarchy
color: colors.text           // Primary text
color: colors.textSecondary  // Secondary text
color: colors.textTertiary   // Tertiary/hint text
color: colors.textInverse    // On dark backgrounds
```

---

**Happy Coding! 🚀**
