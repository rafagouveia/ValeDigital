import React, { useEffect, useState } from "react";
import { Container, Content, View } from "native-base";
import { ActivityIndicator, Appbar, Avatar, Card, List, Modal, Snackbar, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar, ToastAndroid, Vibration } from "react-native";
import api from "../../Services/api";
export default function PerfilFuncionario({ route, navigation }) {
  const ONE_SECOND_IN_MS = 100;
  const dispatch = useDispatch();
  const [valesFuncionario, setVales] = useState({
    salario: 0,
    vales: []
  });
  const [modal, setModal] = useState(false);
  const [snack, setSnack] = useState(false);
  const [totalGastos, setTotalGastos] = useState("")
  const selectedFuncionario = useSelector(state => state.funcionario.selectedFuncionario)
  const vales = useSelector(state => state.vale.payload);
  const loading = useSelector(state => state.vale.loading);
  const home = useSelector(state => state.home.payload);


  useEffect(() => {

    api.get(`/vales/user/${route.params.funcionario.usuario_id}`).then(response => {
      dispatch({ type: "SELECT_FUNCIONARIO", selectedFuncionario: response.data })
    })
  }, [vales]);


  const Toast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
    Vibration.vibrate(2 * ONE_SECOND_IN_MS);
  };


  const filterDates = () => {
    const items = [];
    if (home) {
      home.datas.map((item, index) => {
        items.push({ id: item.index, value: item.data, label: item.data, valor: item.data });
      });
    }
    return items;
  };

  const sumGastos = (param) => {
    let total = 0;
    if(param.length){
      param.map((i) => {
        total += i.valor
      })
      return total;
    }
    return total;
  }

  const sumReceber = (param) => {
    let salario = selectedFuncionario.salario;
    if(param.length){
      return salario - sumGastos(param);
    }
    return 0;
  }


  const __removerVale = (i) => {

    Toast("Deletando Vale...");
    api.delete("vales/deletar", {
      params: {
        id: i.id,
      },
    })
      .then(() => {
        Toast("Vale Deletado.");

      })
      .catch(error => {
        Toast("Ocorreu um erro ao deletar o vale!");
      });
    dispatch({ type: "ADD_VALE", payload: vales.filter((item) => item.id !== i.id) });
    ///setModal(state => !state)
  };

  const __renderLoading = () => (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator color={"red"} size={50} />
    </View>
  );
  return (
    <>
      <Container style={{ backgroundColor: "#e3e3e3" }}>
        <StatusBar backgroundColor={"#d60000"} />
        <Appbar.Header style={{ backgroundColor: "#d60000", elevation: 0 }}>
          <Appbar.Action icon="arrow-left" onPress={() => navigation.goBack()} />
          <Appbar.Content />
          <Appbar.Action icon="plus" onPress={() => navigation.navigate("AddVale")} />
        </Appbar.Header>
        <Content>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start', margin: 10, marginVertical: 25 }}>
            <View style={{flex: 0.5}}>
              <View
                style={{marginTop: 10, marginBottom: 10, marginLeft: 14, flexDirection: 'row', alignItems: 'center'}}
              >
                <View>
                  <Avatar.Image
                    size={48}
                    source={{uri: route.params.funcionario.link}}
                  />
                </View>
                <View>
                  <Text
                    style={{paddingLeft: 20, color: '#454545', fontSize: 18, fontWeight: '700'}}
                  >
                    {route.params.funcionario.nome} {route.params.funcionario.sobrenome}

                  </Text>
                  <Text style={{paddingLeft: 20, color: '#454545', fontSize: 13, fontWeight: '600'}}>Salario: R$ {selectedFuncionario.salario.toFixed(2).replace('.',',')}</Text>
                </View>

              </View>

            </View>

          </View>

          {/*{loading && __renderLoading() || vales.length > 0 && __renderTable()}*/}
          {/*{vales.length < 1 &&*/}
          {/*<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>*/}
          {/*  <FontAwesome name="ticket" size={50} color="black" />*/}
          {/*  <Text style={{ fontWeight: "700", paddingTop: 10 }}>Não foi encontrado nenhum vale</Text>*/}
          {/*</View>*/}
          {/*}*/}
          <View style={{ flexDirection: "row", marginHorizontal: 5 }}>
            <View style={{ flex: 1, marginHorizontal: 5, marginVertical: 5 }}>
              <Card style={{ borderRadius: 9 }}>
                <Card.Title
                  title={<Text style={{ fontSize: 16 }}>Gastos do Mês</Text>}
                />
                <Card.Content>
                  <Text style={{ fontSize: 25, fontWeight: "700" }}>
                    R$ {sumGastos(selectedFuncionario.vales).toFixed(2).replace('.',',')}
                  </Text>

                  <View style={{ marginTop: 20 }} />
                </Card.Content>
              </Card>
            </View>
            <View style={{ flex: 1, marginHorizontal: 5, marginVertical: 5  }}>
              <Card style={{ borderRadius: 9 }}>
                <Card.Title
                  title={<Text style={{ fontSize: 16 }}>A Receber</Text>}
                />
                <Card.Content>
                  <Text style={{ fontSize: 25, fontWeight: "700" }}>
                    R$ {sumReceber(selectedFuncionario.vales).toFixed(2).replace('.',',')}
                  </Text>

                  <View style={{ marginTop: 20 }} />
                </Card.Content>
              </Card>
            </View>
          </View>
          <List.Section title="Ultimos Vales">
            {selectedFuncionario.vales.map((item, i) =>
                <List.Item
                  key={i}
                  title={item.produto.nome}
                  description={`R$ ${item.valor.toFixed(2).replace('.',',')}`}
                  left={props => <List.Icon {...props} icon="folder" />}
                  right={props => <List.Icon {...props} icon="chevron-right" />}
                />
            )}
          </List.Section>




        </Content>
        <Modal animationType={"slide"} onDismiss={() => setModal(false)} visible={modal}>
          <View style={{}}>
            <View style={{
              margin: 20,
              backgroundColor: "#ffffff",
              borderRadius: 20,
              padding: 35,

            }}>
              <View>
                <List.Item
                  title="Editar Vale"
                  left={props => <List.Icon {...props} icon="folder" />}
                />
                <List.Item
                  title="Pagar Vale"
                  left={props => <List.Icon {...props} icon="folder" />}
                />
                <List.Item
                  title="Deletar Vale"
                  left={props => <List.Icon {...props} icon="folder" />}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Snackbar
          visible={snack}
          onDismiss={() => setSnack(false)}
          action={{
            label: "Fechar",
            onPress: () => {

            },

          }}>
          Vale deletado com sucesso!
        </Snackbar>
      </Container>
    </>
  );
}
