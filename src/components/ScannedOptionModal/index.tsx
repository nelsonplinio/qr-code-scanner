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
  IconContainer,
} from './styles';
import { BarCodeScannerData } from '../../models/BarCodeScannerData';
import { useFavority } from '../../hooks/favorityLinks';

export interface Action {
  iconName: string;
  title: string;
  onPress: (modal: Modalize | null) => void;
}

interface ScannedOptionModalProps {
  dataScanned: BarCodeScannerData;
  onClose?: () => void;
  otherActions?: Action[];
}

const ScannedOptionModal: React.ForwardRefRenderFunction<
  Modalize,
  ScannedOptionModalProps
> = ({ dataScanned, onClose, otherActions }, modalRef) => {
  const [linkCopied, setLinkCopied] = useState(false);

  const { saveFavority, removeFavority, isFavorited } = useFavority();

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

  const handleFavority = useCallback(() => {
    saveFavority({
      ...dataScanned,
      date: new Date(),
    });
    modalRef.current?.close();
  }, [modalRef, dataScanned, saveFavority]);

  const handleRemoveFavority = useCallback(() => {
    Alert.alert(
      'Remover Favorito',
      `Deseja realmente remover esté link "${dataScanned.data}" dos favoritos?`,
      [
        {
          text: 'cancelar',
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: () => {
            removeFavority(dataScanned);
            modalRef.current?.close();
          },
        },
      ],
    );
  }, [modalRef, removeFavority, dataScanned]);

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

          {!isFavorited(dataScanned) ? (
            <ActionButton onPress={handleFavority}>
              <Feather name="heart" size={24} color="#666" />
              <ActionButtonText>Favoritar conteudo</ActionButtonText>
            </ActionButton>
          ) : (
            <ActionButton onPress={handleRemoveFavority}>
              <IconContainer>
                <Feather name="heart" size={24} color="#666" />
                <Feather
                  style={{ position: 'absolute', bottom: -2, right: -2 }}
                  name="x"
                  size={18}
                  color="#F95E5A"
                />
              </IconContainer>
              <ActionButtonText>Remover do favorito</ActionButtonText>
            </ActionButton>
          )}

          <ActionButton onPress={handleShareLink}>
            <Feather name="share" size={24} color="#666" />
            <ActionButtonText>Compartilhar conteudo</ActionButtonText>
          </ActionButton>

          {otherActions &&
            otherActions.map(action => (
              <ActionButton
                key={action.title}
                onPress={() => action.onPress(modalRef.current)}
              >
                <Feather name={action.iconName} size={24} color="#666" />
                <ActionButtonText>{action.title}</ActionButtonText>
              </ActionButton>
            ))}
        </ActionsContainer>
      </ModalContainer>
    </Modalize>
  );
};

export default React.forwardRef(ScannedOptionModal);
