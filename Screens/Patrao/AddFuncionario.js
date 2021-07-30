import React, { useRef, useState } from "react";
import { Appbar, Button, Caption, Checkbox, Text, TextInput } from "react-native-paper";
import { Container, Content, View } from "native-base";
import styled from "styled-components";
import { Alert, ToastAndroid, Platform } from "react-native";
import { useSelector } from "react-redux";
import TextInputMask from "react-native-text-input-mask";
import api from "../../Services/api";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const InputText = styled(TextInput)`
  margin: 10px;
  border-color: red;
`;

export default function AddFuncionario({navigation}) {


  let valorRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    estabelecimento_id: 1,
    funcionario_id: 1,
    data: "",
    value: 1,
    descricao: "",
    status: 0,
    produto_id: 1,
    valor: 0,
    type: "add",
  });


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.data;
    setShow(Platform.OS === "ios");
    setForm(state => ({ ...state, data: moment(selectedDate).format("DD/MM/YY") }));
    console.warn("A data é");
  };

  const __addVale = () => {
    setLoading(true);
    api.post("/vales/add", form)
      .then(response => {
        ToastAndroid.showWithGravity(
          "Produto Adicionado com Sucesso",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .catch(error => {
        Alert.alert("Erro ao cadastear produto");
      }).finally(() => {
      setLoading(false);
    });
  };


  return (
    <Container>
      <Appbar.Header style={{ backgroundColor: "#d60000", elevation: 0 }}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />

        <Appbar.Content title="Cadastrar Usuário" />
      </Appbar.Header>
      <Content>
        <View style={{ margin: 20 }}>
          <View style={{ margin: 10, alignItems: "center" }}>
            <Caption style={{ fontSize: 13, fontWeight: '700', fontStyle: "italic" }}>Cadastrar um novo usuário </Caption>
          </View>


          <InputText
            label="Nome"
            value={form.descricao}
            mode={"outlined"}
            render={props =>
              <TextInputMask
                refInput={ref => {
                  valorRef = ref;
                }}
                {...props}
                mask="[AAA][------------------------]"
                onChangeText={(formatted, extracted) => {
                  setForm(state => ({ ...state, descricao: formatted}));
                }}
              />
            }

          />
          <InputText
            label="Sobrenome"
            value={form.descricao}
            mode={"outlined"}
            render={props =>
              <TextInputMask
                refInput={ref => {
                  valorRef = ref;
                }}
                {...props}
                mask="[AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA]"
                onChangeText={(formatted, extracted) => {
                  setForm(state => ({ ...state, descricao: formatted}));
                }}
              />
            }

          />
          <InputText
            label="E-mail"
            value={form.descricao}
            mode={"outlined"}
            render={props =>
              <TextInputMask
                refInput={ref => {
                  valorRef = ref;
                }}
                {...props}
                mask="[AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA]"
                onChangeText={(formatted, extracted) => {
                  setForm(state => ({ ...state, descricao: formatted}));
                }}
              />
            }

          />
          <InputText
            label="Telefone"
            value={form.descricao}
            mode={"outlined"}
            render={props =>
              <TextInputMask
                refInput={ref => {
                  valorRef = ref;
                }}
                {...props}
                mask="[AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA]"
                onChangeText={(formatted, extracted) => {
                  setForm(state => ({ ...state, descricao: formatted}));
                }}
              />
            }

          />
          <InputText
            label="CPF"
            value={form.descricao}
            mode={"outlined"}
            render={props =>
              <TextInputMask
                refInput={ref => {
                  valorRef = ref;
                }}
                {...props}
                mask="[AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA]"
                onChangeText={(formatted, extracted) => {
                  setForm(state => ({ ...state, descricao: formatted}));
                }}
              />
            }

          />

          <InputText
            label="Nascimento"
            value={form.descricao}
            mode={"outlined"}
            render={props =>
              <TextInputMask
                refInput={ref => {
                  valorRef = ref;
                }}
                {...props}
                mask="[AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA]"
                onChangeText={(formatted, extracted) => {
                  setForm(state => ({ ...state, descricao: formatted}));
                }}
              />
            }

          />
          <View style={{ margin: 5 }}>
            <Checkbox.Item status={form.status ? "checked" : "unchecked"}
                           onPress={() => {
                             setForm(state => ({
                               ...state, status: !state.status,
                             }));
                           }}
                           borderless={true}
                           color={"#ff0000"}
                           uncheckedColor={"#bcbcbc"}
                           style={{
                             borderRadius: 50,
                             elevation: 1,
                             rippleRadius: 20,
                             overflow: "hidden",
                             backgroundColor: "#d7d7d7",
                           }}
                           labelStyle={{ color: "white", fontWeight: "700" }}
                           label="Ativar" />
          </View>
          <View style={{ margin: 5, marginBottom: 20 }}>
            <Checkbox.Item status={form.status ? "checked" : "unchecked"}
                           onPress={() => {
                             setForm(state => ({
                               ...state, status: !state.status,
                             }));
                           }}
                           borderless={true}
                           color={"#ff0000"}
                           uncheckedColor={"#bcbcbc"}
                           style={{
                             borderRadius: 50,
                             elevation: 1,
                             rippleRadius: 20,
                             overflow: "hidden",
                             backgroundColor: "#d7d7d7",
                           }}
                           labelStyle={{ color: "white", fontWeight: "700" }}
                           label="Funcionario" />
          </View>
          <View style={{ zIndex: 100, marginHorizontal: 5 }}>
            <Button style={{ borderRadius: 20, paddingVertical: 2 }} disabled={loading}
                    color={"#f61616"}
                    icon="plus"
                    mode="contained"
                    onPress={() => __addVale()}>
              Cadastrar Funcionario
            </Button>
          </View>

        </View>
      </Content>
    </Container>
  );
}
