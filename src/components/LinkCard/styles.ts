import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const LinkItem = styled.View``;

export const LinkItemHeader = styled.Text`
  font-size: 28px;
  margin-bottom: 8px;
  font-weight: bold;
  color: #cfd7f5;
`;

export const LinkItemContent = styled(RectButton)`
  background: #292d3e;

  margin-bottom: 16px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const LinkItemLinkText = styled.Text`
  color: #bfc7d5;
  font-size: 18px;
  margin: 36px 16px;
`;

export const LinkItemTime = styled.Text`
  color: #bfc7d5;
  opacity: 0.5;
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

export const FavorityIcon = styled(MaterialCommunityIcons)`
  position: absolute;
  right: 8px;
  top: 8px;
  opacity: 0.8;
`;
