import React, {
  createContext,
  useRef,
  useContext,
  useState,
  useCallback,
} from 'react';
import { Modalize } from 'react-native-modalize';
import ScannedOptionModal, { Action } from '../components/ScannedOptionModal';
import { BarCodeScannerData } from '../models/BarCodeScannerData';

interface OpenMethodOptions {
  onClosed?: () => void;
  otherActions?: Action[];
}

interface ModalContextData {
  openOptions: (data: BarCodeScannerData, options?: OpenMethodOptions) => void;
  closeOptions: () => void;
  dataScanned: BarCodeScannerData;
}

interface ScannerData {
  data: BarCodeScannerData;
  onClosed?: () => void;
  otherActions?: Action[];
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ScannerOptionsModalProvider: React.FC = ({ children }) => {
  const modalRef = useRef<Modalize>(null);

  const [scannedData, setScannedData] = useState<ScannerData>({
    data: {},
  } as ScannerData);

  const openOptions = useCallback(
    (data: BarCodeScannerData, options: OpenMethodOptions = {}) => {
      setScannedData({ data, ...options });
      modalRef.current?.open();
    },
    [],
  );

  const closeOptions = useCallback(() => {
    modalRef.current?.close();
  }, []);

  return (
    <ModalContext.Provider
      value={{ openOptions, closeOptions, dataScanned: scannedData.data }}
    >
      {children}
      <ScannedOptionModal
        ref={modalRef}
        dataScanned={scannedData.data}
        onClose={scannedData.onClosed}
        otherActions={scannedData.otherActions}
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
