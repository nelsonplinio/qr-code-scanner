import { format } from 'date-fns';
import React, { useCallback, useMemo, useState } from 'react';
import { Animated } from 'react-native';
import Header from '../../components/Header';
import LinkCard from '../../components/LinkCard';
import { useScannerOptionsModal } from '../../hooks/scannedOptionsModal';
import { BarCodeScannedWithDataFormatted } from '../../models/BarCodeScannedWithDataFormatted';
import { BarCodeScannerData } from '../../models/BarCodeScannerData';
import formatDate from '../../utils/formatDate';
import { Container } from './styles';
import { useFavority } from '../../hooks/favorityLinks';

const FavorityList: React.FC = () => {
  const [scrollOffset] = useState(new Animated.Value(0));

  const { favorites } = useFavority();

  const { openOptions } = useScannerOptionsModal();

  const favorityList: BarCodeScannedWithDataFormatted[] = useMemo(
    () =>
      favorites.map<BarCodeScannedWithDataFormatted>(
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
    [favorites],
  );

  const handleItemPressed = useCallback(
    (linkData: BarCodeScannerData) => {
      openOptions(linkData);
    },
    [openOptions],
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
        data={favorityList}
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

      <Header title="Favoritos" scrollOffset={scrollOffset} />
    </Container>
  );
};

export default React.memo(FavorityList);
