import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { AsyncStorage } from 'react-native';
import { parseISO } from 'date-fns';
import { BarCodeScannerData } from '../models/BarCodeScannerData';

interface FavorityContextData {
  favorites: BarCodeScannerData[];
  saveFavority: (data: BarCodeScannerData) => void;
  removeFavority: (data: BarCodeScannerData) => void;
  isFavorited: (data: BarCodeScannerData) => boolean;
}

const FavorityContext = createContext<FavorityContextData>(
  {} as FavorityContextData,
);

const AsyncStorageKey = '@scanner:favority';
const FavorityProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<BarCodeScannerData[]>([]);

  const saveFavority = useCallback(async (data: BarCodeScannerData) => {
    setFavorites(currentValue => {
      const checkIfContains = currentValue.find(
        ({ data: link }) => data.data === link,
      );

      if (checkIfContains) {
        return currentValue;
      }

      return [
        {
          ...data,
          id: String(Date.now),
        },
        ...currentValue,
      ];
    });
  }, []);

  const removeFavority = useCallback((data: BarCodeScannerData) => {
    setFavorites(currentValue =>
      currentValue.filter(({ data: link }) => data.data !== link),
    );
  }, []);

  const isFavorited = useCallback(
    (data: BarCodeScannerData) => {
      const found = favorites.find(({ data: link }) => data.data === link);
      return !!found;
    },
    [favorites],
  );

  useEffect(() => {
    const loadFavority = async () => {
      const saved = await AsyncStorage.getItem(AsyncStorageKey);

      if (saved) {
        const list = JSON.parse(saved);

        setFavorites(
          list.map((item: BarCodeScannerData) => ({
            ...item,
            date: parseISO(String(item.date)),
          })),
        );
      }
    };

    loadFavority();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(AsyncStorageKey, JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavorityContext.Provider
      value={{
        favorites,
        saveFavority,
        removeFavority,
        isFavorited,
      }}
    >
      {children}
    </FavorityContext.Provider>
  );
};

const useFavority: () => FavorityContextData = () => {
  const context = useContext(FavorityContext);

  if (!context) {
    throw new Error('Component need stay inside in provider!');
  }

  return context;
};

export { useFavority, FavorityProvider };
