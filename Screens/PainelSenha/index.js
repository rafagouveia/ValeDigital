import React, { useState, useEffect, useMemo, useRef } from "react";
import { Content, Container, View } from "native-base";
import {ScrollView} from "react-native"
import { Text, TouchableRipple } from "react-native-paper";
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import IconEntypo from "react-native-vector-icons/Entypo";
import io from "socket.io-client";

const Row = styled(View)`
  flex-direction: row;
`;

const Tecla = (props) => (
  <TouchableRipple onPress={props.onPress}
                   style={{ flex: 1, padding: 20, backgroundColor: "red", alignItems: "center", ...props.style }}>
    <Text style={[{ color: "#fff", fontSize: 30 }, props.textStyle]}> {props.children} </Text>
  </TouchableRipple>
);

const socket = io('http://0.tcp.sa.ngrok.io:10720')
export default function PainelSenha() {

  const [senha, setSenha] = useState("");
  const [wsStatus, setWsStatus] = useState(false);
  const [calleds, setCalleds] = useState([])
  const [senhaAtual, setSenhaAtual] = useState("");

  const [wsState, updateWsState] = useState(false)

  useEffect(() => {

    socket.on('connect', () => {
      setWsStatus(true)
    })
    socket.on('disconnect', () => {
      setWsStatus(false)
    })

    socket.on('numbers', (data) => {
      setSenhaAtual(data)
    })
    socket.on('calleds', (data) => {
        setCalleds(data.reverse())
    })

  }, [])

  const digitSenha = (num) => {
    if (senha.toString().length < 4) {
      const result = senha + num;
      setSenha(result);
    } else {
      setSenha(num);
    }

  };

  const handleSenhaAtual = () => {
   // ws.send("callNumber")
    socket.emit('callNumber', senha)

  };
  return (
    <Container>
      <View style={{ flex: 1, backgroundColor: "red" }}>

        <Text style={{ fontSize: 18, color: "#fff", padding: 20 }}>Numero da vez:</Text>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 100, color: "#fff" }}>{senhaAtual || "N/A"}</Text>

        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end" }}>
          <View style={{ flex: 1 }}>
            <ScrollView horizontal contentContainerStyle={{paddingVertical: 0}}>
              {calleds.map((item, index) =>
			  <View style={{marginLeft: 5}}>
                <Text key={index} style={{ fontSize: 15, color: "#fff"}}>{item}</Text>
				</View>
              )}
            </ScrollView>
            <Row style={{ backgroundColor: "rgba(22,22,22, 0.2)" }}>
              <Tecla style={{ padding: 20 }} textStyle={{ fontSize: 15 }}>{wsStatus && "Online" || "Offline"}</Tecla>
              <Tecla style={{ padding: 20 }} textStyle={{ fontSize: 15 }}
                     onPress={() => digitSenha("2")}>Antigos</Tecla>
              <Tecla style={{ padding: 20 }} textStyle={{ fontSize: 15 }}
                     onPress={() => digitSenha("3")}>Resetar</Tecla>
            </Row>
            <View style={{ backgroundColor: "#131313", alignItems: "flex-end" }}>
              <Text style={{ fontSize: 80, color: "#fff", paddingRight: 8 }}>{senha}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ justifyContent: "flex-end", backgroundColor: "black" }}>
        <Row>
          <Tecla onPress={() => digitSenha("1")}>1</Tecla>
          <Tecla onPress={() => digitSenha("2")}>2</Tecla>
          <Tecla onPress={() => digitSenha("3")}>3</Tecla>
        </Row>
        <Row>
          <Tecla onPress={() => digitSenha("4")}>4</Tecla>
          <Tecla onPress={() => digitSenha("5")}>5</Tecla>
          <Tecla onPress={() => digitSenha("6")}>6</Tecla>
        </Row>
        <Row>
          <Tecla onPress={() => digitSenha("7")}>7</Tecla>
          <Tecla onPress={() => digitSenha("8")}>8</Tecla>
          <Tecla onPress={() => digitSenha("9")}>9</Tecla>
        </Row>
        <Row>
          <Tecla onPress={() => setSenha("")}><Icon size={30} name="backspace" /></Tecla>
          <Tecla onPress={() => digitSenha("0")}>0</Tecla>
          <Tecla onPress={() => handleSenhaAtual(0)}><IconEntypo size={30} name="megaphone" /></Tecla>
        </Row>
      </View>
    </Container>
  );
}
