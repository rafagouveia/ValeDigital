import { ADD_FUNCIONARIO, GET_FUNCIONARIO } from "../actions/funcionariosActions";
let initialState = {
  payload: [],
  selectedFuncionario: {
    salario: 0,
    vales: []
  },
  loading: true,
}


export const funcionario = (state = initialState, action) => {
  switch (action.type){
    case "ADD_FUNCIONARIO":
      return {
        ...state,
        payload: action.payload,
        loading: action.loading
      }
    case "GET_FUNCIONARIO":
      return {
        ...state,
        payload: { ...state.payload, ...action.payload },
        loading: action.loading
      }
    case "SELECT_FUNCIONARIO":
      return {
        ...state,
        selectedFuncionario: action.selectedFuncionario,
      }
    default:
      return state
  }
}