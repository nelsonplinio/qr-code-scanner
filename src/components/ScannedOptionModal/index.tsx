import React, { useCallback, useMemo, useState } from 'react';
import { openURL } from 'expo-linking';
import { Share, Alert, Dimensions, Clipboard } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Modalize } from 'react-native-modalize';
import {
  ModalContainer,
  ModalTitle,
  TextScanned,
  ActionsContainer,
  ActionButton,
  ActionButtonText,
} from './styles';
import { BarCodeScannerData } from '../../models/BarCodeScannerData';

interface ScannedOptionModalProps {
  dataScanned: BarCodeScannerData;
  onClose?: () => void;
}

const ScannedOptionModal: React.ForwardRefRenderFunction<
  Modalize,
  ScannedOptionModalProps
> = ({ dataScanned, onClose }, modalRef) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const modalHeight = useMemo(() => {
    const { height } = Dimensions.get('screen');

    return height * 0.65;
  }, []);

  const modalSnapPoint = useMemo(() => {
    const { height } = Dimensions.get('screen');

    return height * 0.45;
  }, []);

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
    if (onClose) {
      onClose();
    }
    setLinkCopied(false);
  }, [onClose]);

  return (
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
  );
};

export default React.forwardRef(ScannedOptionModal);
