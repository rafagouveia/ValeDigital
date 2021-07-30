import React, { useEffect, useState } from "react";
import { Container, Content, View } from "native-base";
import { ActivityIndicator, Appbar, DataTable, List, Modal, Snackbar, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { Pressable, StatusBar, ToastAndroid, Vibration } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import api from "../../Services/api";
import DropDownPicker from "react-native-dropdown-picker";

export default function ValesLista({ navigation }) {
  const ONE_SECOND_IN_MS = 100;
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [snack, setSnack] = useState(false);
  const [data, setData] = useState("")
  const vales = useSelector(state => state.vale.payload);
  const loading = useSelector(state => state.vale.loading);
  const home = useSelector(state => state.home.payload);


  useEffect(() => {
    console.warn(vales);
    console.warn(home)
  }, []);


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

  const __toggleSnack = () => {
  };
  const __renderTable = () => (
    <View style={{
      flex: 1,
      backgroundColor: "white",
      marginHorizontal: 10,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
    }}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Nº</DataTable.Title>
          <DataTable.Title>Funcionario</DataTable.Title>
          <DataTable.Title numeric>Produto</DataTable.Title>
          <DataTable.Title numeric>Valor</DataTable.Title>
        </DataTable.Header>

        {vales.map((vale, i) =>
          <Pressable android_ripple={{ color: "red" }} onPress={() => {
            __removerVale(vale);
          }}>
            <DataTable.Row key={i}>
              <DataTable.Cell>{i + 1}</DataTable.Cell>
              <DataTable.Cell>{vale.funcionario.usuario.nome} {vale.funcionario.usuario.sobrenome}</DataTable.Cell>
              <DataTable.Title numeric>{vale.produto.nome}</DataTable.Title>
              <DataTable.Cell numeric>R$ {vale.valor}</DataTable.Cell>
            </DataTable.Row>
          </Pressable>,
        )}

        <DataTable.Pagination
          page={0}
          numberOfPages={3}
          onPageChange={(page) => {
            console.warn(page);
          }}
          label="1-2 de 6"
        />
      </DataTable>
    </View>
  );

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
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', margin: 10, marginVertical: 25 }}>
            <View style={{flex: 0.5}}>
              <Text style={{padding: 2}}>Usuario:</Text>
              <DropDownPicker
                zIndex={3000}
                items={filterDates()}
                placeholder="Escolher Usuario"
                searchablePlaceholder="Procurar Produto"
                searchableError={() => <Text>Não encontrado</Text>}
                searchable={true}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={item => {

                }}
              />
            </View>
            <View style={{flex: 0.5}}>
              <Text style={{padding: 2}}>Data:</Text>
              <DropDownPicker
                zIndex={3000}
                items={filterDates()}
                placeholder="Escolher Data"
                searchablePlaceholder="Procurar Produto"
                searchableError={() => <Text>Não encontrado</Text>}
                searchable={true}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ backgroundColor: "#fafafa" }}
                onChangeItem={item => {

                }}
              />
            </View>
          </View>

          {loading && __renderLoading() || vales.length > 0 && __renderTable()}
          {vales.length < 1 &&
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <FontAwesome name="ticket" size={50} color="black" />
            <Text style={{ fontWeight: "700", paddingTop: 10 }}>Não foi encontrado nenhum vale</Text>
          </View>
          }
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
