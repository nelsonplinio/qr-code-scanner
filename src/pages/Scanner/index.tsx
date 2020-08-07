import React, { useEffect, useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import { Feather } from '@expo/vector-icons';
import { canOpenURL } from 'expo-linking';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useScannerOptionsModal } from '../../hooks/scannedOptionsModal';
import { useHistoryLinkScanned } from '../../hooks/historyLinkScanned';

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
  const { saveLink } = useHistoryLinkScanned();
  const { openOptions } = useScannerOptionsModal();

  const isFocused = useIsFocused();

  const [scanned, setScanned] = useState(false);

  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const handleRequestPermission = useCallback(async () => {
    if (Platform.OS === 'web') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      setHasCameraPermission(status === 'granted');

      return;
    }
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

      const barCodeData = {
        data,
        canOpen,
        date: new Date(),
      };

      saveLink(barCodeData);

      openOptions(barCodeData, () => {
        setScanned(false);
      });
    },
    [openOptions, saveLink],
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
      {isFocused && (
        <CameraExpo
          type={CameraExpo.Constants.Type.back}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={
            scanned
              ? undefined
              : data =>
                  handleOnBarCodeScanned({
                    data: data.data,
                    type: Number(data.type),
                  })
          }
          ratio="16:9"
        />
      )}

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
