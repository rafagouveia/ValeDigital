import React, { useState, useEffect } from "react";
import { Container, Content } from "native-base";
import { Image, StatusBar, View } from "react-native";
import { Appbar, Avatar, Button, Card, Text, TextInput, Modal } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import DropDown from "react-native-paper-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, CalendarList, LocaleConfig } from "react-native-calendars";
import moment from "moment";

LocaleConfig.locales["pt"] = {
  monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
  monthNamesShort: ["Jan.", "Fev.", "Mar", "Abr", "Mai", "Jun", "Jul.", "Ago", "Set.", "Otu.", "Nov.", "Dez."],
  dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sab."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "pt";
export default function HomePatrao({ navigation }) {


  const selectedData = useSelector(state => state.selectedData.payload);
  const home = useSelector(state => state.home.payload);
  const [dropdown, setDropdown] = useState(false);
  const [data, setData] = useState("");
  const dispatch = useDispatch()
  const filterDates = () => {
    const items = [];
    if (home) {
      home.datas.map((item, index) => {
        items.push({ id: item.index, value: item.data, label: item.data, valor: item.data });
      });
    }
    return items;
  };

  const formatData = (data) => {
    return moment(data, "DD-MM-YY").format("YYYY-MM-DD");

  };

  const minDate = () => {
    if (home.datas.length) {
      return formatData(home.datas[0].data);
    }
  };
  const maxDate = () => {

    if (home.datas.length) {
      return formatData(home.datas[home.datas.length - 1].data);

    }
  };


  const markDates = () => {
    let items = {};
    if (home) {
      home.datas.map(({ data: data1 }, index) => {
        items[formatData(data1)] = { selected: true, marked: true, selectedColor: "red" };
      });
      return items;
    }
  };

  return (
    <Container style={{ backgroundColor: "#d60000" }}>
      <StatusBar backgroundColor={"#d60000"} />
      <Appbar.Header style={{ backgroundColor: "#d60000", elevation: 0 }}>
        <Appbar.Content />
        <Appbar.Action icon="account-plus" onPress={() => navigation.navigate('AddFuncionario')} />
        <Appbar.Action icon="plus" onPress={() => navigation.navigate("AddVale")} />
      </Appbar.Header>

      <Content style={{ backgroundColor: "#efefef" }}>
        <View style={{ flex: 1, backgroundColor: "#d60000", height: 220 }} />

        <View style={{ flex: 1, justifyContent: "center", marginTop: -210 }}>
          <View style={{ marginVertical: 0, alignItems: "center" }}>
            <Image
              style={{ borderRadius: 50, width: 120, height: 120 }}
              source={{
                uri:
                  "https://cdn.neemo.com.br/uploads/settings_webdelivery/logo/1410/Nova_logo_red.jpg",
              }}
            />
          </View>
          <View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              {/*<View style={{ flex: 1, marginRight: 5 }}>*/}
              {/*  <Text*/}
              {/*    style={{ fontSize: 16, paddingVertical: 10, color: "white" }}*/}
              {/*  >*/}
              {/*    Detalhes*/}
              {/*  </Text>*/}
              {/*</View>*/}
              <View style={{ flex: 1, marginRight: 5 }}>
                <Text
                  style={{ fontSize: 16, paddingVertical: 10, color: "white" }}
                >
                  Data: {selectedData.data}
                </Text>
                <DropDown
                  label={"Datas"}
                  mode={"outlined"}
                  value={data}
                  setValue={setData}
                  list={filterDates()}
                  showDropDown={() => setDropdown(true)}
                  onDismiss={() => {
                    setDropdown(false);
                  }}
                  inputProps={{
                    right: <TextInput.Icon name={"menu-down"} />,
                  }}
                />

              </View>

            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Card style={{ borderRadius: 9 }}>
                  <Card.Title
                    title={<Text style={{ fontSize: 16 }}>Detalhes do Dia</Text>}
                  />
                  <Card.Content>
                    <Text style={{ fontSize: 25, fontWeight: "700" }}>
                      R$ {home.vales.dia.valor.toFixed(2)}
                    </Text>
                    <Text style={{ fontSize: 12, fontWeight: "700" }}>
                      {home.vales.dia.quantidade} vales
                    </Text>
                    <View style={{ marginTop: 20 }} />
                  </Card.Content>
                </Card>
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={{ flex: 0.5, marginLeft: 10 }}>
                <Card style={{ borderRadius: 9 }}>
                  <Card.Title
                    title={<Text style={{ fontSize: 16 }}>Diário</Text>}
                  />
                  <Card.Content>
                    <Text style={{ fontSize: 15, fontWeight: "700" }}>
                      {home.vales.mes.quantidade}
                    </Text>
                    <Text style={{ fontSize: 7, fontWeight: "700" }}>
                       vales
                    </Text>
                  </Card.Content>
                </Card>
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Card style={{ borderRadius: 9 }}>
                  <Card.Title
                    title={<Text style={{ fontSize: 16 }}>Mensal</Text>}
                  />
                  <Card.Content>
                    <Text style={{ fontSize: 15, fontWeight: "700" }}>
                      R$ {home.vales.mes.valor.toFixed(2)}
                    </Text>
                    <Text style={{ fontSize: 7, fontWeight: "700" }}>
                       {home.vales.mes.quantidade} vales
                    </Text>
                  </Card.Content>
                </Card>
              </View>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <Card style={{ borderRadius: 9 }}>
                  <Card.Title
                    title={<Text style={{ fontSize: 16 }}>Anual</Text>}
                  />
                  <Card.Content>
                    <Text style={{ fontSize: 15, fontWeight: "700" }}>
                      R$ {home.vales.ano.valor.toFixed(2)}

                    </Text>
                    <Text style={{ fontSize: 7, fontWeight: "700" }}>
                      {home.vales.ano.quantidade} vales
                    </Text>
                  </Card.Content>
                </Card>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 10, marginVertical: 20 }}>


            <Button
              color={"#ea0404"}
              icon="plus"
              mode="outlined"
              onPress={() => navigation.navigate("VerVales")}
            >
              <Text>Ver Vales</Text>
            </Button><Button
            color={"#ea0404"}
            icon="plus"
            mode="outlined"
            onPress={() => navigation.navigate("VerFuncionarios")}
          >
            <Text>Ver Funcionarios</Text>
          </Button>

          </View>
        </View>
      </Content>
      <Modal visible={dropdown} onDismiss={() => {
        setDropdown(false);
      }}>
        <Calendar
          style={{
            borderWidth: 1,
            borderRadius: 20,
            margin: 20,
            elevation: 1,
            overflow: "hidden",
            height: 360,
          }}
          minDate={minDate()}
          maxDate={maxDate()}
          // Initially visible
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            dispatch({type: "SET_DATA", payload: {data: day.dateString}})
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log("selected day", day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"MM yyyy"}
          markedDates={markDates()}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false

          // Replace default arrows with custom ones (direction can be 'left' or 'right')

          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false

          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false

          // Show week numbers to the left. Default = false

          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Disable left arrow. Default = false
          // Disable right arrow. Default = false

          // Replace default month and year title with custom one. the function receive a date as parameter.

          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
        />
      </Modal>
    </Container>
  );
}
