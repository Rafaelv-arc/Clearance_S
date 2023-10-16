import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
  const [events, setEvents] = useState({});

  useEffect(() => {
    // Carrega os eventos do AsyncStorage quando o componente é montado
    loadEvents();
  }, []);

  const loadEvents = async () => {
    // Carrega eventos do AsyncStorage
    const savedEvents = await AsyncStorage.getItem('events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  };

  return (
   <Animatable.View animation="fadeIn" duration={1000} delay={100}>
    <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', marginTop: '10px', width: '100%'}}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: '10px'}}>Ultimas Folgas Adicionadas</Text>
      <FlatList
        data={Object.entries(events)}
        keyExtractor={(item) => item[0]}
        renderItem={({ item }) => (
          <View>
            <Text>Data: {item[0]}</Text>
            <Text>Folga: {item[1].join(', ')}</Text>
          </View>
        )}
      />
    </View>
  </Animatable.View>
  );
};

export default HomeScreen;
