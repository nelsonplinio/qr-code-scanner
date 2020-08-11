import React, { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useFavority } from '../../hooks/favorityLinks';

const FavorityList: React.FC = () => {
  const { favorites } = useFavority();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{favorites.length}</Text>
    </View>
  );
};

export default React.memo(FavorityList);
