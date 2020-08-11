import { FlatList, StatusBar, Animated } from 'react-native';
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
