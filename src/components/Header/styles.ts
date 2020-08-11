import styled from 'styled-components/native';
import { Animated } from 'react-native';

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
