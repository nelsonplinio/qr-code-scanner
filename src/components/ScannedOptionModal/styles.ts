import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const ModalContainer = styled.View`
  padding: 16px;
`;

export const ModalTitle = styled.Text`
  font-size: 32px;
  color: #f1f1f1;
`;

export const TextScanned = styled.Text`
  border: solid 1px rgba(100, 100, 100, 0.5);
  border-radius: 10px;
  padding: 16px 8px;
  margin-top: 22px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
`;

export const ActionsContainer = styled.View`
  margin-top: 16px;
`;

export const ActionButton = styled(RectButton)`
  flex-direction: row;
  align-items: baseline;
  padding: 16px 0;
`;

export const IconContainer = styled.View``;

export const ActionButtonText = styled.Text`
  margin-left: 16px;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
  margin-right: auto;
`;
