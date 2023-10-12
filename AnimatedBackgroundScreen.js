import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatedBackgroundScreen = () => {
  return (
    <>
      <Animatable.View
        style={styles.background} // Estilo para o plano de fundo
        animation="fadeIn" // Tipo de animação (por exemplo, 'rotate', 'fadeIn', etc.)
        duration={50000} // Duração da animação em milissegundos
        iterationCount="infinite" // Repetir indefinidamente
        easing="linear" // Tipo de interpolação (linear para uma rotação suave)
      ></Animatable.View>
      </>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    zIndex: -1, // Certifique-se de que o plano de fundo esteja atrás do conteúdo
  },
});

export default AnimatedBackgroundScreen;
