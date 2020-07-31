import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { Feather } from '@expo/vector-icons';
import { openURL, canOpenURL } from 'expo-linking';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera as ExpoCamera } from 'expo-camera';
import { Share, Alert, Dimensions, Clipboard } from 'react-native';
import { Modalize } from 'react-native-modalize';

import {
  CameraExpo,
  Container,
  ModalContainer,
  ModalTitle,
  TextScanned,
  ActionsContainer,
  ActionButton,
  ActionButtonText,
  AccessDeniedContainer,
  AccessDeniedText,
  AccessDeniedDescriptionText,
  RequestPermissionButton,
  RequestPermissionButtonText,
} from './styles';

interface BarCodeScanned {
  data: string;
  type: number;
}

interface LinkScanned {
  data: string;
  canOpen: boolean;
  date: Date;
}

const Scanner: React.FC = () => {
  const modalRef = useRef<Modalize>(null);
  const [dataScanned, setDataScanned] = useState<LinkScanned>(
    {} as LinkScanned,
  );
  const [scanned, setScanned] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const modalHeight = useMemo(() => {
    const { height } = Dimensions.get('screen');

    return height * 0.65;
  }, []);

  const modalSnapPoint = useMemo(() => {
    const { height } = Dimensions.get('screen');

    return height * 0.45;
  }, []);

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

      setDataScanned({
        data,
        canOpen,
        date: new Date(),
      });

      modalRef.current?.open();
    },
    [],
  );

  const handleShareLink = useCallback(async () => {
    try {
      await Share.share({
        message: dataScanned.data,
      });
    } catch (error) {
      Alert.alert('Não foi possivel compartilhar esse link');
    }
  }, [dataScanned]);

  const handleOpenLink = useCallback(() => {
    openURL(dataScanned.data);
  }, [dataScanned]);

  const handleClipboardLink = useCallback(() => {
    Clipboard.setString(dataScanned.data);
    setLinkCopied(true);
  }, [dataScanned]);

  const handleModalClosed = useCallback(() => {
    setScanned(false);
    setLinkCopied(false);
  }, []);

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

      <Modalize
        ref={modalRef}
        modalHeight={modalHeight}
        snapPoint={modalSnapPoint}
        onClosed={handleModalClosed}
        modalStyle={{
          backgroundColor: '#24292e',
        }}
      >
        <ModalContainer>
          <ModalTitle>Contaudo scaneado</ModalTitle>

          <TextScanned>{dataScanned.data}</TextScanned>

          <ActionsContainer>
            {dataScanned.canOpen && (
              <ActionButton onPress={handleOpenLink}>
                <Feather name="external-link" size={24} color="#666" />
                <ActionButtonText>Abrir conteudo</ActionButtonText>
              </ActionButton>
            )}

            <ActionButton onPress={handleClipboardLink}>
              <Feather name="copy" size={24} color="#666" />
              <ActionButtonText>
                Copiar conteudo
                {linkCopied && <ActionButtonText> (Copiado)</ActionButtonText>}
              </ActionButtonText>
            </ActionButton>

            <ActionButton onPress={handleShareLink}>
              <Feather name="share" size={24} color="#666" />
              <ActionButtonText>Compartilhar conteudo</ActionButtonText>
            </ActionButton>

            <ActionButton>
              <Feather name="save" size={24} color="#666" />
              <ActionButtonText>Salvar conteudo</ActionButtonText>
            </ActionButton>
          </ActionsContainer>
        </ModalContainer>
      </Modalize>
    </Container>
  );
};

export default React.memo(Scanner);
