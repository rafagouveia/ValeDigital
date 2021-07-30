import React, {useEffect, useState, useLayoutEffect} from "react"
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import AddVale from "./Vales/Add";
import HomePatrao from "./Patrao/Home"
import PerfilPatrao from "./Perfil/Patrao";
const Tab = createMaterialBottomTabNavigator();
import {Container} from "native-base"
import api from "../Services/api";
import {useDispatch, useSelector} from "react-redux";
import { View } from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
import * as Animatable from "react-native-animatable"
import Spinner from "react-native-spinkit"
import { home } from "../Redux/reducers/homeReducer";
import PainelSenha from "./PainelSenha";


let actionHome = (data) => {
  return { type: 'SET_HOME', payload: data, loading: false};
}
export default function TabHome(){
  const dispatch = useDispatch();
  const funcionario = useSelector(state => state.funcionario)
  const produto = useSelector(state => state.produto)
  const selectedData = useSelector(state => state.selectedData.payload.data);
  const [home, setHome] = useState({
    datas: [],
    vales: {
      dia: {
        valor: 0,
        quantidade: 0
      },
      mes: {
        valor: 0,
        quantidade: 0
      },
      ano: {
        valor: 0,
        quantidade: 0
      }
    }
  })



  useEffect(() => {

  }, [])

  useLayoutEffect(() => {
    getHome(selectedData)
  }, [selectedData])

  useEffect(() => {
    dispatch(actionHome(home))
  }, [home])

  const getHome = (data) => {
    api.get(`home`, {
      params: {
        data: data
      }
    })
      .then(response => {
        setHome(response.data)
        console.log('A data é' + data)
      })

    api.get('funcionarios')
      .then(response => {
        dispatch({type: "ADD_FUNCIONARIO", payload: response.data, loading: false})
      })
    api.get('vales')
      .then(response => {
        dispatch({type: "ADD_VALE", payload: response.data, loading: false})
      })
    api.get('produtos')
      .then(response => {
        dispatch({type: "ADD_PRODUTO", payload: response.data, loading: false})
      })
  }
  const __renderLoading = () => (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <Spinner type={'9CubeGrid'} color={"red"} size={50} />
      </View>
      <View style={{margin: 20}}>
        <Animatable.Text animation="pulse"
                         easing="ease-out"
                         iterationCount="infinite"
                         style={{ textAlign: 'center', fontWeight: '700' }}
        >
          Estamos preparando todos os dados...
        </Animatable.Text>
      </View>
    </View>
  )
  const __renderTabs = () => (
    <Tab.Navigator activeColor={"#f0edf6"} barStyle={{ backgroundColor: '#d60000' }}>
      <Tab.Screen name="Inicio" options={{tabBarIcon: 'home'}} component={HomePatrao} />
      <Tab.Screen name="Senha" options={{tabBarIcon: 'dialpad'}} component={PainelSenha} />
      <Tab.Screen name="Perfil" options={{tabBarIcon: 'account'}} component={PerfilPatrao} />
    </Tab.Navigator>
  )
  return(
    <Container>
      {funcionario.loading && produto.loading && __renderLoading()}
      {!funcionario.loading && !produto.loading && __renderTabs()}
    </Container>
  )
}
