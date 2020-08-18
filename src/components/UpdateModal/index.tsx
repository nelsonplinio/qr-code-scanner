import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import * as Updates from 'expo-updates';
import LottieView from 'lottie-react-native';

import { Container, Title, Description, Button, ButtonText } from './styles';

import downloadAnimation from '../../assets/animations/download-animation.json';

const UpdateModal: React.FC = () => {
  const modalRef = useRef<Modalize>();
  const lottieRef = useRef<LottieView | null>(null);
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);

  const checkUpdates = useCallback(async () => {
    if (__DEV__) {
      return;
    }

    const { isAvailable } = await Updates.checkForUpdateAsync();
    if (!isAvailable) {
      return;
    }

    modalRef.current?.open();
  }, []);

  const handleStartUpdate = useCallback(async () => {
    setUpdating(true);

    lottieRef.current?.play(0, 160);

    await Updates.fetchUpdateAsync();

    lottieRef.current?.play(160, 180);

    setUpdated(true);
  }, []);

  const handleFinishedUpdate = useCallback(() => {
    modalRef.current?.close();
  }, []);

  useEffect(() => {
    checkUpdates();
  }, [checkUpdates]);

  return (
    <Modalize
      ref={modalRef}
      closeOnOverlayTap={false}
      modalHeight={400}
      modalStyle={{ backgroundColor: '#24292e' }}
      tapGestureEnabled={false}
      panGestureEnabled={false}
      onBackButtonPress={() => true}
      onClosed={Updates.reloadAsync}
    >
      <Container>
        <View>
          <Title>Atualização disponivel</Title>

          <Description>
            Uma atualização está disponivel para ser realizada, por favor faça
            essa atualização.
          </Description>
        </View>

        <LottieView
          source={downloadAnimation}
          ref={lottieRef}
          style={{ height: 180, width: 180 }}
          loop={!updated}
        />

        {updated ? (
          <Button enabled onPress={handleFinishedUpdate}>
            <ButtonText>Concluir</ButtonText>
          </Button>
        ) : (
          <Button enabled={!updating} onPress={handleStartUpdate}>
            <ButtonText>Realizar Atualização</ButtonText>
          </Button>
        )}
      </Container>
    </Modalize>
  );
};

export { UpdateModal };
