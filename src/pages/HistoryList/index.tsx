import { format } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react';
import { Alert, Animated } from 'react-native';
import Header from '../../components/Header';
import LinkCard from '../../components/LinkCard';
import { useHistoryLinkScanned } from '../../hooks/historyLinkScanned';
import { useScannerOptionsModal } from '../../hooks/scannedOptionsModal';
import { BarCodeScannedWithDataFormatted } from '../../models/BarCodeScannedWithDataFormatted';
import { BarCodeScannerData } from '../../models/BarCodeScannerData';
import formatDate from '../../utils/formatDate';
import { Container } from './styles';

const HistoryList: React.FC = () => {
  const [scrollOffset] = useState(new Animated.Value(0));

  const { historyScannedLinks, removeLink } = useHistoryLinkScanned();

  const { openOptions } = useScannerOptionsModal();

  const historyList: BarCodeScannedWithDataFormatted[] = useMemo(
    () =>
      historyScannedLinks.map<BarCodeScannedWithDataFormatted>(
        (linkData, index, completeList) => {
          const formatTime: () => string = () => {
            return format(linkData.date, 'hh:mm');
          };

          if (index === 0) {
            return {
              ...linkData,
              header: formatDate(linkData.date),
              timeFormatted: formatTime(),
            };
          }

          const lastLinkData = completeList[index - 1];

          if (lastLinkData.date.getDate() !== linkData.date.getDate()) {
            return {
              ...linkData,
              header: formatDate(linkData.date),
              timeFormatted: formatTime(),
            };
          }

          return { ...linkData, timeFormatted: formatTime() };
        },
      ),
    [historyScannedLinks],
  );

  const handleItemPressed = useCallback(
    (linkData: BarCodeScannerData) => {
      openOptions(linkData, {
        otherActions: [
          {
            title: 'Remover do historico',
            iconName: 'trash',
            onPress: modal => {
              Alert.alert(
                'Remover link',
                `Deseja remover esté link "${linkData.data}" do histórico?`,
                [
                  {
                    text: 'Cacelar',
                  },
                  {
                    text: 'Remover link',
                    style: 'destructive',
                    onPress: () => {
                      removeLink(linkData);
                      modal?.close();
                    },
                  },
                ],
              );
            },
          },
        ],
      });
    },
    [openOptions, removeLink],
  );

  return (
    <Container>
      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollOffset,
                },
              },
            },
          ],
          { useNativeDriver: true },
        )}
        data={historyList}
        keyExtractor={(linkData: BarCodeScannedWithDataFormatted) =>
          linkData.id || ''
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 120,
        }}
        renderItem={({
          item: linkData,
        }: {
          item: BarCodeScannedWithDataFormatted;
        }) => <LinkCard data={linkData} onPress={handleItemPressed} />}
      />

      <Header title="Histórico" scrollOffset={scrollOffset} />
    </Container>
  );
};

export default React.memo(HistoryList);
