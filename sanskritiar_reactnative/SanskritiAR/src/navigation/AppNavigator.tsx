import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { getThemeColors } from '../styles/colors';
import {
  LoginScreen,
  SignupScreen,
  HomeScreen,
  HeritageDetailScreen,
  ARViewScreen,
  ExploreScreen,
  ProfileScreen,
} from '../screens';
import { HeritageSite } from '../data/heritageSites';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  MainTabs: undefined;
  HeritageDetail: { site: HeritageSite };
  ARView: { site: HeritageSite };
};

export type TabParamList = {
  Home: undefined;
  Explore: undefined;
  AR: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

// Wrapper for AR View in tabs (no site parameter)
const ARTabScreen: React.FC<any> = ({ navigation, route }) => {
  const dummySite: HeritageSite = {
    id: '0',
    name: 'AR Scanner',
    location: 'Point at any surface',
    description: 'Scan to place heritage sites in your space',
    image: '',
    category: 'monument',
    state: 'All India',
    yearBuilt: '',
    significance: 'Experience heritage in augmented reality',
  };
  
  return <ARViewScreen navigation={navigation} route={{ ...route, params: { site: dummySite } }} />;
};

const MainTabs: React.FC = () => {
  const { isDark } = useTheme();
  const colors = getThemeColors(isDark);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="explore" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="AR"
        component={ARTabScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="view-in-ar" size={size} color={color} />,
          tabBarLabel: 'AR View',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
        {user ? (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="HeritageDetail" component={HeritageDetailScreen} />
            <Stack.Screen name="ARView" component={ARViewScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
