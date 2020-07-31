import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Camera, CameraProps } from 'expo-camera';
import { RectButton } from 'react-native-gesture-handler';

const { width } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
`;

export const CameraExpo = styled(Camera)<CameraProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const AccessDeniedContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #24292e;
  padding: 22px;
`;

export const AccessDeniedText = styled.Text`
  color: #999;
  width: 100%;
  text-align: center;
  margin-top: 22px;
  font-size: 24px;
  font-weight: bold;
  margin: 28px 0 16px;
  flex-direction: column;
`;

export const AccessDeniedDescriptionText = styled(AccessDeniedText)`
  font-size: 18px;
  margin-top: 6px;
  opacity: 0.7;
`;

export const RequestPermissionButton = styled(RectButton)`
  background: #365df0;
  border-radius: 10px;
  height: 55px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 16px;
  margin-top: 16px;
`;

export const RequestPermissionButtonText = styled.Text`
  width: 100%;
  height: 100%;

  text-align: center;
  color: #fff;
  font-weight: bold;
`;

export const ScannerContainer = styled.View`
  flex: 1;
`;

export const ScannerDarkBackground = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.8);
`;

export const ScannerMiddleLightBox = styled.View`
  height: ${width * 0.65}px;
  width: ${width * 0.65}px;
`;

export const ScannerMiddleContainer = styled.View`
  flex-direction: row;
`;
