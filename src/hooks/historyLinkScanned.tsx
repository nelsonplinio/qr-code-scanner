import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { AsyncStorage } from 'react-native';
import { BarCodeScannerData } from '../models/BarCodeScannerData';

interface ContextData {
  saveLink(data: BarCodeScannerData): void;
  historyScannedLinks: BarCodeScannerData[];
  removeLink(link: string): void;
}

const HistoryLinkScannedContext = createContext<ContextData>({} as ContextData);

const HistoryLinkScannedProvider: React.FC = ({ children }) => {
  const [historyScannedLinks, setHistoryScannedLinks] = useState<
    BarCodeScannerData[]
  >([]);

  const saveLink = useCallback(
    async (data: BarCodeScannerData) => {
      const checkContainsThisLink = historyScannedLinks.find(
        saved => saved.data === data.data,
      );

      if (checkContainsThisLink) {
        return;
      }

      setHistoryScannedLinks([...historyScannedLinks, data]);
    },
    [historyScannedLinks],
  );

  const removeLink = useCallback((link: string) => {
    setHistoryScannedLinks(currentValue =>
      currentValue.filter(({ data }) => data !== link),
    );
  }, []);

  useEffect(() => {
    const loadHistory = async () => {
      const historySaved = await AsyncStorage.getItem(
        '@qrcode-scanner/history',
      );

      if (historySaved) {
        setHistoryScannedLinks(JSON.parse(historySaved));
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
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
