import React from 'react';
import { Animated } from 'react-native';
import { HeaderContainer, Title } from './styles';

interface HeaderProps {
  title: string;
  scrollOffset: Animated.AnimatedInterpolation;
}

const Header: React.FC<HeaderProps> = ({ title, scrollOffset }) => {
  return (
    <HeaderContainer>
      <Title
        style={{
          transform: [
            {
              scale: scrollOffset.interpolate({
                inputRange: [0, 100],
                outputRange: [1, 0.5],
                extrapolate: 'clamp',
              }),
            },
            {
              translateY: scrollOffset.interpolate({
                inputRange: [0, 100],
                outputRange: [0, -40],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}
      >
        {title}
      </Title>
    </HeaderContainer>
  );
};

export default Header;
