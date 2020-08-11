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
