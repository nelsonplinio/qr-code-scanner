import React, { useMemo, useCallback, useState } from 'react';
import { isToday, isYesterday, isSameYear, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Animated, Alert } from 'react-native';
import { useHistoryLinkScanned } from '../../hooks/historyLinkScanned';
import { BarCodeScannedWithDataFormatted } from '../../models/BarCodeScannedWithDataFormatted';

import {
  Container,
  HeaderContainer,
  Title,
  LinkItem,
  LinkItemHeader,
  LinkItemContent,
  LinkItemLinkText,
  LinkItemTime,
} from './styles';
import { BarCodeScannerData } from '../../models/BarCodeScannerData';
import { useScannerOptionsModal } from '../../hooks/scannedOptionsModal';

const HistoryList: React.FC = () => {
  const [scrollOffset] = useState(new Animated.Value(0));

  const { historyScannedLinks, removeLink } = useHistoryLinkScanned();

  const { openOptions } = useScannerOptionsModal();

  const historyList: BarCodeScannedWithDataFormatted[] = useMemo(
    () =>
      historyScannedLinks.map<BarCodeScannedWithDataFormatted>(
        (linkData, index, completeList) => {
          const formatDate: () => string = () => {
            if (isYesterday(linkData.date)) {
              return 'Ontem';
            }

            if (isToday(linkData.date)) {
              return 'Hoje';
            }

            if (isSameYear(linkData.date, new Date())) {
              return format(linkData.date, "dd 'de' MMM", {
                locale: ptBR,
              });
            }

            return format(linkData.date, "dd 'de' MMM',' yyyy");
          };

          const formatTime: () => string = () => {
            return format(linkData.date, 'hh:mm');
          };

          if (index === 0) {
            return {
              ...linkData,
              header: formatDate(),
              timeFormatted: formatTime(),
            };
          }

          const lastLinkData = completeList[index - 1];

          if (lastLinkData.date.getDate() !== linkData.date.getDate()) {
            return {
              ...linkData,
              header: formatDate(),
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
            title: 'Remover',
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
        }) => (
          <LinkItem>
            {linkData.header && (
              <LinkItemHeader>{linkData.header}</LinkItemHeader>
            )}
            <LinkItemContent onPress={() => handleItemPressed(linkData)}>
              <LinkItemLinkText lineBreakMode="tail" numberOfLines={4}>
                {linkData.data}
              </LinkItemLinkText>
              <LinkItemTime>{linkData.timeFormatted}</LinkItemTime>
            </LinkItemContent>
          </LinkItem>
        )}
      />

      <HeaderContainer style={{}}>
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
          Histórico
        </Title>
      </HeaderContainer>
    </Container>
  );
};

export default React.memo(HistoryList);
