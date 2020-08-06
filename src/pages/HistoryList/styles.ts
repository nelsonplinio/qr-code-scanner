import { FlatList, StatusBar, Animated } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { BarCodeScannedWithDataFormatted } from '../../models/BarCodeScannedWithDataFormatted';

const statusBarHeight = StatusBar.currentHeight || 26;

type ListBarCode = FlatList<BarCodeScannedWithDataFormatted>;
export const Container = styled.View`
  flex: 1;
  margin-top: ${statusBarHeight}px;
  padding: 16px 16px 0;
  background: #24292e;
`;

export const HeaderContainer = styled(Animated.View)`
  margin-bottom: 16px;
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  background: #24292e;
  height: 45px;
`;

export const Title = styled(Animated.Text)`
  font-size: 58px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  background: #24292e;
`;

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
  right: 16px;
`;
