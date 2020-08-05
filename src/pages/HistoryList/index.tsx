import React from 'react';
import { View, Text } from 'react-native';
import { useHistoryLinkScanned } from '../../hooks/historyLinkScanned';

const HistoryList: React.FC = () => {
  const { historyScannedLinks } = useHistoryLinkScanned();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{historyScannedLinks.length}</Text>
    </View>
  );
};

export default React.memo(HistoryList);
