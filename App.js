import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Auth/Login";
import AddVale from "./Screens/Vales/Add";
import TabHome from "./Screens/Tab";
import ValesLista from "./Screens/Vales/Lista";
import {DefaultTheme,Provider as PaperProvider, withTheme } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./Redux/store";
import PerfilFuncionario from "./Screens/Perfil/Funcionario";
import HomePatrao from "./Screens/Patrao/Home";
import ListaFuncionarios from "./Screens/Patrao/ListaFuncionario";
import AddFuncionario from "./Screens/Patrao/AddFuncionario";
import PainelSenha from "./Screens/PainelSenha";
import {MainContextProvider} from "./contexts/socketContext";
const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 5,
  fonts: 'medium',
  colors: {
    ...DefaultTheme.colors,
    primary: '#de0707',
    accent: '#f1c40f',
  },
  dark: true,
};


const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider theme={theme}>
          <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Login" component={PainelSenha} />
            <Stack.Screen name="Home" component={TabHome} />
            <Stack.Screen name="AddVale" component={AddVale} />
            <Stack.Screen name="VerVales" component={ValesLista} />
            <Stack.Screen name="VerFuncionarios" component={ListaFuncionarios} />
            <Stack.Screen name="AddFuncionario" component={AddFuncionario} />
            <Stack.Screen name="PerfilFuncionario" component={PerfilFuncionario} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default withTheme(App);
