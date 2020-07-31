import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { canOpenURL } from 'expo-linking';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Modalize } from 'react-native-modalize';

import { useScannerOptionsModal } from '../../hooks/scannedOptionsModal';

import {
  CameraExpo,
  Container,
  AccessDeniedContainer,
  AccessDeniedText,
  AccessDeniedDescriptionText,
  RequestPermissionButton,
  RequestPermissionButtonText,
} from './styles';
import { BarCodeScannerData } from '../../models/BarCodeScannerData';

interface BarCodeScanned {
  data: string;
  type: number;
}

const Scanner: React.FC = () => {
  const modalRef = useRef<Modalize>(null);

  const { openOptions } = useScannerOptionsModal();

  const [scanned, setScanned] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const handleRequestPermission = useCallback(async () => {
    const permission = await CameraExpo.getPermissionsAsync();

    if (!permission.canAskAgain || permission.granted) {
      setHasCameraPermission(true);
      return;
    }

    const { granted } = await CameraExpo.requestPermissionsAsync();

    setHasCameraPermission(granted);
  }, []);

  const handleOnBarCodeScanned = useCallback(
    async ({ data }: BarCodeScanned) => {
      setScanned(true);

      const canOpen = await canOpenURL(data);

      openOptions(
        {
          data,
          canOpen,
          date: new Date(),
        },
        () => {
          setScanned(false);
        },
      );

      modalRef.current?.open();
    },
    [],
  );

  useEffect(() => {
    handleRequestPermission();
  }, [handleRequestPermission]);

  if (!hasCameraPermission) {
    return (
      <AccessDeniedContainer>
        <Feather name="camera-off" size={78} color="#999" />

        <AccessDeniedText>Precisamos do acesso da camera</AccessDeniedText>

        <AccessDeniedDescriptionText>
          Precisamos do acesso a camera, para que possamos scanear os QRCodes.
        </AccessDeniedDescriptionText>

        <RequestPermissionButton onPress={handleRequestPermission}>
          <RequestPermissionButtonText>
            PERMITIR ACESSO À CAMERA
          </RequestPermissionButtonText>
        </RequestPermissionButton>
      </AccessDeniedContainer>
    );
  }

  return (
    <Container>
      <CameraExpo
        type={CameraExpo.Constants.Type.back}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleOnBarCodeScanned}
        ratio="16:9"
      />
    </Container>
  );
};

export default React.memo(Scanner);
