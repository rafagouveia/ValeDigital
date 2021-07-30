import React, { useRef, useState } from "react";
import { Appbar, Button, Caption, Checkbox, Text, TextInput } from "react-native-paper";
import { Container, Content, View } from "native-base";
import styled from "styled-components";
import { Alert, ToastAndroid, Platform } from "react-native";
import { useSelector } from "react-redux";
import TextInputMassk from "react-native-text-input-mask";
import { TextInputMask } from 'react-native-masked-text'

import api from "../../Services/api";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment"

const InputText = styled(TextInput)`
  margin: 10px;
  border-color: red;
`;

export default function AddVale({navigation}) {
  const [selectedFuncionario, setSelectedFuncionario] = useState({
    valor: 1,
    id: 1,
    value: 1,
    label: "",
  });
  const [selectedProduct, setSelectedProdcut] = useState({
    valor: 1,
    id: 1,
    value: 2,
    label: "",
  });
  let valorRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const funcionarios = useSelector(state => state.funcionario.payload);
  const produtos = useSelector(state => state.produto.payload);
  const [form, setForm] = useState({
    estabelecimento_id: 1,
    funcionario_id: 1,
    data: '',
    value: 1,
    descricao: "Esse produto foi inserido apenas para testes.",
    status: 0,
    produto_id: 1,
    valor: 0,
    type: "add",
  });

  const filterFuncionarios = () => {
    const items = [];
    if (funcionarios) {
      funcionarios.map((item, index) => {
        items.push({ value: item.id, label: item.nome, id: item.id });
      });
    }
    return items;
  };

  const filterProdutos = () => {
    const items = [];
    if (produtos) {
      produtos.map((item, index) => {
        items.push({ id: item.id, value: item.id, label: item.nome, valor: item.valor });
      });
    }
    return items;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || form.data;
    setShow(Platform.OS === 'ios');
    setForm(state => ({...state, data: moment(selectedDate).format('DD/MM/YY')}))
    console.warn('A data é')
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


  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <Container>
      <Appbar.Header style={{ backgroundColor: "#d60000", elevation: 0 }}>
        <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />

        <Appbar.Content title="Cadastrar Vale" />
      </Appbar.Header>
      <Content>
        <View style={{ margin: 20 }}>
          <View style={{ margin: 50, flex: 1 }}>

            <Text style={{ textAlign: "center" }}>Valor do Vale</Text>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <View>
                <Text style={{ fontSize: 25, fontWeight: "700", textAlign: "center" }}>R$ </Text>

              </View>
              <View>

                <TextInput
                  style={{ borderWidth: 0, textAlign: "center", fontSize: 30, color: "white"}}
                  keyboardType={"numeric"}
                  autoFocus={true}
                  render={props =>
                    <TextInputMask
                      type={'money'}
                      {...props}
                      options={{
                        precision: 2,
                        separator: ',',
                        delimiter: '.',
                        unit: '',
                        suffixUnit: ''
                      }}
                      value={`${form.valor}`}
                      onChangeText={text => {
                        setForm(state => ({ ...state, valor: text }));
                      }}
                    />
                    // <TextInputMask
                    //   refInput={ref => {
                    //     valorRef = ref;
                    //   }}
                    //   {...props}
                    //   mask="[9999]{.}[09]"
                    //   onChangeText={(formatted, extracted) => {
                    //     setForm(state => ({ ...state, valor: extracted }));
                    //   }}
                    // />
                  }

                />
              </View>
            </View>

          </View>

          <View style={{ margin: 10 }}>
            {show &&
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                locale={'pt-BR'}
                display="spinner"
                onChange={onChange}
              />
            }
            <DropDownPicker
              zIndex={5000}
              items={filterFuncionarios()}
              searchablePlaceholder="Procurar Funcinario"
              searchableError={() => <Text>Não encontrado</Text>}
              searchable={true}
              defaultValue={selectedFuncionario.value}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={item => {
                setForm(state => ({ ...state, funcionario_id: item.id }));
                setSelectedFuncionario(item);
              }}
            />
          </View>
          <InputText
            label="Descrição"
            value={form.descricao}
            mode={"outlined"}
            multiline
            onChangeText={text => setForm(state => ({ ...state, descricao: text }))}
          />

          <View style={{ margin: 10, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between' }}>
            <View>
              <Text>Data: </Text>
            </View>
            <View>
              <Button mode={'outlined'} style={{borderRadius: 10,borderColor: '#373737', borderWidth: 1, width: 150}} color={'#6c17ff'} onPress={() => setShow(true)}> {form.data}</Button>
            </View>
          </View>

          <View style={{ margin: 10 }}>
            <DropDownPicker
              zIndex={3000}
              items={filterProdutos()}
              searchablePlaceholder="Procurar Produto"
              searchableError={() => <Text>Não encontrado</Text>}
              searchable={true}
              defaultValue={selectedProduct.value}
              containerStyle={{ height: 40 }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              onChangeItem={item => {
                setForm(state => ({ ...state, produto_id: item.id, value: item.value, valor: item.valor }));
                setSelectedProdcut(item);
                console.warn(valorRef.focus());
              }}
            />
          </View>

          <View style={{ margin: 5, marginVertical: 20 }}>
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
                           label="Pago" />
          </View>
          <View style={{ zIndex: 100, marginHorizontal: 5 }}>
            <Button style={{ borderRadius: 20, paddingVertical: 2 }} disabled={loading}
                    color={"#f61616"}
                    icon="plus"
                    mode="contained"
                    onPress={() => __addVale()}>
              Cadastrar Vale
            </Button>
          </View>

        </View>
      </Content>
    </Container>
  );
}
