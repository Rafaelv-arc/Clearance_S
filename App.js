import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./Componentes/Home";
import { ScrollView } from "react-native-web";
import AnimatedBackgroundScreen from "./style/AnimatedBackgroundScreen";
import * as Animatable from "react-native-animatable";

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [eventText, setEventText] = useState("");
  const [lastPress, setLastPress] = useState(0);
  const [homeScreenVisible, setHomeScreenVisible] = useState(false);

  useEffect(() => {
    // Carrega os eventos do AsyncStorage quando o componente é montado
    loadEvents();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addEvent = async () => {
    if (selectedDate && eventText.trim() !== "") {
      // Salva o evento no AsyncStorage
      await saveEvent(selectedDate, eventText);
      // Atualiza o estado de eventos
      setEvents({
        ...events,
        [selectedDate]: [...(events[selectedDate] || []), eventText],
      });
      setEventText("");
      toggleModal();
      setHomeScreenVisible(false);
    }
  };

  const loadEvents = async () => {
    // Carrega eventos do AsyncStorage
    const savedEvents = await AsyncStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  };

  const saveEvent = async (date, event) => {
    // Obtém eventos existentes do AsyncStorage
    const savedEvents = await AsyncStorage.getItem("events");
    let eventsData = savedEvents ? JSON.parse(savedEvents) : {};

    // Adiciona o novo evento
    eventsData = {
      ...eventsData,
      [date]: [...(eventsData[date] || []), event],
    };

    // Salva os eventos atualizados de volta no AsyncStorage
    await AsyncStorage.setItem("events", JSON.stringify(eventsData));
  };

  const onDayDoublePress = (day) => {
    const currentTime = new Date().getTime();
    const delta = currentTime - lastPress;

    if (delta < 300) {
      // Se o tempo entre dois cliques for menor que 300ms (um duplo clique), abra o modal
      setSelectedDate(day.dateString);
      toggleModal();
    }

    setLastPress(currentTime);
  };

  const showEvents = () => {
    toggleModal();
  };

  return (
    <>
      <AnimatedBackgroundScreen />
      <ScrollView style={{ flex: 1 }}>
        <Calendar
          style={{ backgroundColor: "lightred" }}
          onDayPress={(day) => {
            onDayDoublePress(day), setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "blue",
            },
          }}
        />
        {events[selectedDate] && (
          <Animatable.View animation="fadeIn" duration={1000} delay={100}>
            <Button title="Adicionar Mais Pessoas" onPress={showEvents} />
          </Animatable.View>
        )}

        <Modal isVisible={isModalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 0,
              backgroundColor: "white",
            }}
          >
            <Text style={{ color: "red", margin: "10px", fontSize: 18 }}>
              Adicionando Folga em {selectedDate}
            </Text>
            <TextInput
              style={{ padding: "5px", margin: "14px" }}
              placeholder="Nome do evento"
              onChangeText={(text) => setEventText(text)}
              value={eventText}
            />
            <Button title="Adicionar" onPress={addEvent} />
            <Button
              title="Fechar"
              onPress={() => {
                toggleModal();
                setSelectedDate(null);
                setEventText("");
              }}
            />
          </View>
        </Modal>

        {events[selectedDate] && (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "15px",
              fontFamily: "",
            }}
          >
            <Text>Folga em {selectedDate}:</Text>
            {events[selectedDate].map((event, index) => (
              <Text key={index}>{event}</Text>
            ))}
          </View>
        )}
        <Animatable.View animation="bounceIn" duration={1000} delay={100}>
          <Button
            title="Mostrar Ultimas Folgas Adicionadas"
            onPress={() => setHomeScreenVisible(true)}
          />
        </Animatable.View>
        {homeScreenVisible && <HomeScreen events={events} />}
      </ScrollView>
    </>
  );
};

export default App;
