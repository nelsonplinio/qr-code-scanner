import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Feather } from '@expo/vector-icons';
import { canOpenURL } from 'expo-linking';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Dimensions } from 'react-native';
import { useScannerOptionsModal } from '../../hooks/scannedOptionsModal';

import {
  CameraExpo,
  Container,
  AccessDeniedContainer,
  AccessDeniedText,
  AccessDeniedDescriptionText,
  RequestPermissionButton,
  RequestPermissionButtonText,
  ScannerContainer,
  ScannerDarkBackground,
  ScannerMiddleContainer,
  ScannerMiddleLightBox,
} from './styles';

interface BarCodeScanned {
  data: string;
  type: number;
}

const Scanner: React.FC = () => {
  const { openOptions } = useScannerOptionsModal();

  const [scanned, setScanned] = useState(false);

  const scanIconSize = useMemo(() => {
    const { width } = Dimensions.get('screen');

    return width * 0.65;
  }, []);

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
    },
    [openOptions],
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
      <ScannerContainer>
        <ScannerDarkBackground />
        <ScannerMiddleContainer>
          <ScannerDarkBackground />
          <ScannerMiddleLightBox />
          <ScannerDarkBackground />
        </ScannerMiddleContainer>
        <ScannerDarkBackground />
      </ScannerContainer>
    </Container>
  );
};

export default React.memo(Scanner);
