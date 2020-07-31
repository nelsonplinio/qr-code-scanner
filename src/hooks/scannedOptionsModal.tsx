import React, {
  createContext,
  useRef,
  useContext,
  useState,
  useCallback,
} from 'react';
import { Modalize } from 'react-native-modalize';
import ScannedOptionModal from '../components/ScannedOptionModal';
import { BarCodeScannerData } from '../models/BarCodeScannerData';

interface ModalContextData {
  openOptions: (data: BarCodeScannerData, onClosed?: () => void) => void;
  closeOptions: () => void;
}

interface ScannerData {
  data: BarCodeScannerData;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ScannerOptionsModalProvider: React.FC = ({ children }) => {
  const modalRef = useRef<Modalize>(null);

  const [scannerData, setScannerData] = useState<ScannerData>({
    data: {},
  } as ScannerData);

  const openOptions = useCallback((data: BarCodeScannerData, onClose) => {
    setScannerData({ data, onClose });
    modalRef.current?.open();
  }, []);

  const closeOptions = useCallback(() => {
    modalRef.current?.close();
  }, []);

  return (
    <ModalContext.Provider value={{ openOptions, closeOptions }}>
      {children}
      <ScannedOptionModal
        ref={modalRef}
        dataScanned={scannerData.data}
        onClose={scannerData.onClose}
      />
    </ModalContext.Provider>
  );
};

const useScannerOptionsModal: () => ModalContextData = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('Component need stay inside in provider!');
  }

  return context;
};

export { ScannerOptionsModalProvider, useScannerOptionsModal };
