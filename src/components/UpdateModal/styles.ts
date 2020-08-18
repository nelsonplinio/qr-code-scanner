import styled from 'styled-components/native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';

export const Container = styled.View`
  align-items: center;
  padding: 16px;
  justify-content: space-between;
  flex: 1;
  height: 400px;
`;

export const Title = styled.Text`
  font-size: 32px;
  color: #f1f1f1;
  text-align: center;
`;

export const Description = styled(Title)`
  font-size: 18px;
  margin-top: 16px;
`;

export const Button = styled(RectButton)`
  background: #365df0;
  border-radius: 10px;
  height: 55px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 16px;
  opacity: ${({ enabled = true }) => (enabled ? 1 : 0.8)};
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #f1f1f1;
  font-weight: bold;
  width: 100%;
  text-align: center;
`;
