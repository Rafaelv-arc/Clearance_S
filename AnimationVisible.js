import React from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimationVisible = ({ selectedDate }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Animatable.View
        animation="fadeIn" // Escolha a animação desejada
        duration={1000} // Duração da animação em milissegundos
        iterationCount={1} // Número de iterações (1 para executar uma vez)
        style={{ alignItems: 'center' }}
      >
        <Text style={{ fontSize: 20 }}>Selecionado: {selectedDate}</Text>
      </Animatable.View>
    </View>
  );
};

export default AnimationVisible;
