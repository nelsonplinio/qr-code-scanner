import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { parseISO } from 'date-fns';
import { AsyncStorage } from 'react-native';
import { BarCodeScannerData } from '../models/BarCodeScannerData';

interface ContextData {
  saveLink(data: BarCodeScannerData): void;
  historyScannedLinks: BarCodeScannerData[];
  removeLink(data: BarCodeScannerData): void;
}

const HistoryLinkScannedContext = createContext<ContextData>({} as ContextData);

const HistoryLinkScannedProvider: React.FC = ({ children }) => {
  const [historyScannedLinks, setHistoryScannedLinks] = useState<
    BarCodeScannerData[]
  >([]);

  const saveLink = useCallback(async (data: BarCodeScannerData) => {
    const id = String(data.date.getTime());
    setHistoryScannedLinks(currentList => [{ ...data, id }, ...currentList]);
  }, []);

  const removeLink = useCallback((data: BarCodeScannerData) => {
    setHistoryScannedLinks(currentValue =>
      currentValue.filter(({ id }) => id !== data.id),
    );
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      const historySaved = await AsyncStorage.getItem(
        '@qrcode-scanner/history',
      );

      if (historySaved) {
        let history: BarCodeScannerData[] = JSON.parse(historySaved);

        history = history
          .map(linkData => {
            return {
              ...linkData,
              date: parseISO(String(linkData.date)),
            };
          })
          .sort((h1, h2) => {
            return h1.date.getTime() - h2.date.getTime();
          });

        setHistoryScannedLinks(history);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    if (!historyScannedLinks) {
      return;
    }

    AsyncStorage.setItem(
      '@qrcode-scanner/history',
      JSON.stringify(historyScannedLinks),
    );
  }, [historyScannedLinks]);

  return (
    <HistoryLinkScannedContext.Provider
      value={{ saveLink, historyScannedLinks, removeLink }}
    >
      {children}
    </HistoryLinkScannedContext.Provider>
  );
};

const useHistoryLinkScanned: () => ContextData = () => {
  const context = useContext(HistoryLinkScannedContext);

  if (!context) {
    throw new Error('Component need stay inside in provider!');
  }

  return context;
};

export { useHistoryLinkScanned, HistoryLinkScannedProvider };
