import React from 'react';
import * as Animatable from 'react-native-animatable';

const AnimationVisible = () => {
  return (
    <>
      <Animatable.View
        animation="fadeIn" // Escolha a animação desejada
        duration={1000} // Duração da animação em milissegundos
        style={{ alignItems: 'center' }}
      >
      </Animatable.View>
    </>
  );
};

export default AnimationVisible;
