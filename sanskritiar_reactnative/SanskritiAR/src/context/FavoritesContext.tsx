import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeritageSite } from '../data/heritageSites';

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (siteId: string) => boolean;
  toggleFavorite: (siteId: string) => Promise<void>;
  getFavoriteSites: (allSites: HeritageSite[]) => HeritageSite[];
  clearFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = '@sanskritiar_favorites';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const isFavorite = (siteId: string): boolean => {
    return favorites.includes(siteId);
  };

  const toggleFavorite = async (siteId: string): Promise<void> => {
    const newFavorites = isFavorite(siteId)
      ? favorites.filter(id => id !== siteId)
      : [...favorites, siteId];
    await saveFavorites(newFavorites);
  };

  const getFavoriteSites = (allSites: HeritageSite[]): HeritageSite[] => {
    return allSites.filter(site => favorites.includes(site.id));
  };

  const clearFavorites = async (): Promise<void> => {
    await saveFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        getFavoriteSites,
        clearFavorites,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
