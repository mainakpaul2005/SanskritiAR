import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';
import { HeritageSite } from '../data/heritageSites';
import { getThemeColors } from '../styles/colors';
import { Spacing, BorderRadius } from '../styles/spacing';
import { Typography } from '../styles/typography';

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
  ARView: { site: HeritageSite };
};

type ARViewScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ARView'>;
  route: RouteProp<RootStackParamList, 'ARView'>;
};

export const ARViewScreen: React.FC<ARViewScreenProps> = ({ navigation, route }) => {
  const { site } = route.params;
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);
  const [isScanning, setIsScanning] = useState(false);
  const [arMode, setArMode] = useState<'scan' | 'placed' | 'info'>('scan');

  const handleCapture = () => {
    Alert.alert('Photo Captured', 'Your AR photo has been saved to gallery!');
  };

  const handlePlaceObject = () => {
    setArMode('placed');
    Alert.alert('Object Placed', 'Heritage site placed in AR space!');
  };

  const toggleScanning = () => {
    setIsScanning(!isScanning);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* AR Camera View Placeholder */}
      <View style={[styles.cameraView, { backgroundColor: colors.surface }]}>
        <LinearGradient
          colors={[colors.primary + '20', colors.secondary + '20']}
          style={styles.gradientOverlay}>
          <Icon name="videocam" size={80} color={colors.textTertiary} />
          <Text style={[styles.cameraText, { color: colors.textSecondary }]}>
            AR Camera View
          </Text>
          <Text style={[styles.cameraSubtext, { color: colors.textTertiary }]}>
            Point camera at a flat surface
          </Text>
          
          {/* Scanning Indicator */}
          {isScanning && (
            <View style={[styles.scanningBox, { borderColor: colors.primary }]}>
              <View style={[styles.cornerTL, { borderColor: colors.primary }]} />
              <View style={[styles.cornerTR, { borderColor: colors.primary }]} />
              <View style={[styles.cornerBL, { borderColor: colors.primary }]} />
              <View style={[styles.cornerBR, { borderColor: colors.primary }]} />
            </View>
          )}

          {/* AR Grid Pattern */}
          <View style={styles.gridPattern}>
            {[...Array(5)].map((_, i) => (
              <View
                key={i}
                style={[styles.gridLine, { backgroundColor: colors.primary + '30' }]}
              />
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* Top Controls */}
      <View style={styles.topControls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={[styles.siteNameBadge, { backgroundColor: colors.card }]}>
          <Text style={[styles.siteNameText, { color: colors.text }]} numberOfLines={1}>
            {site.name}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: colors.card }]}
          onPress={() => setArMode('info')}>
          <Icon name="info" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        {/* AR Mode Indicators */}
        <View style={styles.modeIndicators}>
          <View style={[styles.modeIndicator, { backgroundColor: colors.surface }]}>
            <Icon
              name="search"
              size={20}
              color={arMode === 'scan' ? colors.primary : colors.textTertiary}
            />
            <Text
              style={[
                styles.modeText,
                { color: arMode === 'scan' ? colors.primary : colors.textTertiary },
              ]}>
              Scan
            </Text>
          </View>
          <View style={[styles.modeIndicator, { backgroundColor: colors.surface }]}>
            <Icon
              name="filter-center-focus"
              size={20}
              color={arMode === 'placed' ? colors.primary : colors.textTertiary}
            />
            <Text
              style={[
                styles.modeText,
                { color: arMode === 'placed' ? colors.primary : colors.textTertiary },
              ]}>
              Placed
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            onPress={toggleScanning}>
            <Icon
              name={isScanning ? 'pause' : 'play-arrow'}
              size={28}
              color={colors.text}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePlaceObject} activeOpacity={0.8}>
            <LinearGradient
              colors={[colors.primary, colors.primaryLight]}
              style={styles.mainActionButton}>
              <Icon name="add-location" size={32} color={colors.textInverse} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.surface }]}
            onPress={handleCapture}>
            <Icon name="camera-alt" size={28} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        <View style={[styles.instructions, { backgroundColor: colors.card }]}>
          <Icon name="touch-app" size={20} color={colors.accent} />
          <Text style={[styles.instructionText, { color: colors.textSecondary }]}>
            Tap to place heritage site in your space
          </Text>
        </View>
      </View>

      {/* Info Modal */}
      {arMode === 'info' && (
        <View style={[styles.infoModal, { backgroundColor: colors.card }]}>
          <View style={styles.infoHeader}>
            <Text style={[styles.infoTitle, { color: colors.text }]}>AR Guide</Text>
            <TouchableOpacity onPress={() => setArMode('scan')}>
              <Icon name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContent}>
            <View style={styles.infoItem}>
              <Icon name="search" size={24} color={colors.primary} />
              <Text style={[styles.infoItemText, { color: colors.textSecondary }]}>
                Scan flat surfaces to detect placement areas
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="add-location" size={24} color={colors.primary} />
              <Text style={[styles.infoItemText, { color: colors.textSecondary }]}>
                Tap the center button to place the heritage site
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="camera-alt" size={24} color={colors.primary} />
              <Text style={[styles.infoItemText, { color: colors.textSecondary }]}>
                Capture photos of your AR experience
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="zoom-out-map" size={24} color={colors.primary} />
              <Text style={[styles.infoItemText, { color: colors.textSecondary }]}>
                Pinch to scale and drag to move the object
              </Text>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    ...Typography.h2,
    marginTop: Spacing.lg,
  },
  cameraSubtext: {
    ...Typography.body,
    marginTop: Spacing.sm,
  },
  scanningBox: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: BorderRadius.md,
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  gridPattern: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 150,
    justifyContent: 'space-evenly',
  },
  gridLine: {
    height: 1,
    width: '100%',
  },
  topControls: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  siteNameBadge: {
    flex: 1,
    marginHorizontal: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  siteNameText: {
    ...Typography.body,
    fontWeight: '600',
    textAlign: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  modeIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  modeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  modeText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  mainActionButton: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  instructions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  instructionText: {
    ...Typography.caption,
    flex: 1,
  },
  infoModal: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  infoTitle: {
    ...Typography.h3,
  },
  infoContent: {
    gap: Spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  infoItemText: {
    ...Typography.body,
    flex: 1,
  },
});
