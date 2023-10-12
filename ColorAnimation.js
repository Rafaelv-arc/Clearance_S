import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';

const colors = ['#FF0000', '#FF3300', '#FF6600', '#FF9900']; // Cores para a animação

const ColorAnimation = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 para frente, -1 para trás

  useEffect(() => {
    const interval = setInterval(() => {
      // Alterna para a próxima cor da matriz
      setCurrentColorIndex((prevIndex) => {
        if (prevIndex === colors.length - 1 && direction === 1) {
          // Quando atingir a última cor no sentido normal (claro para escuro)
          setDirection(-1); // Mudar para o sentido reverso (escuro para claro)
        } else if (prevIndex === 0 && direction === -1) {
          // Quando atingir a primeira cor no sentido reverso (escuro para claro)
          setDirection(1); // Mudar para o sentido normal (claro para escuro)
        }
        return prevIndex + direction;
      });
    }, 1000); // Altera a cada 1 segundo

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [direction]);

  const currentColor = colors[currentColorIndex];

  return (
    <View style={{ flex: 1 }}>
      <Animatable.View
        style={{ flex: 1, backgroundColor: currentColor }}
        animation="fadeIn"
        duration={1000}
      />
    </View>
  );
};

export default ColorAnimation;
