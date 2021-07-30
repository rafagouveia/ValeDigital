import { ADD_VALE, GET_VALE, GET_PRODUTO,ADD_PRODUTO } from "../actions/valesActions";
let initialState = {
  payload: [],
  loading: true
}


export const vale = (state = initialState, action) => {
  switch (action.type){
    case ADD_VALE:
      return {
        ...state,
        payload: action.payload,
        loading: action.loading
      }
    case GET_VALE:
      return {
        ...state,
        payload: { ...state.payload, ...action.payload },
        loading: action.loading
      }
    default:
      return state
  }
}

export const produto = (state = initialState, action) => {
  switch (action.type){
    case ADD_PRODUTO:
      return {
        ...state,
        payload: action.payload,
        loading: action.loading
      }
    case GET_PRODUTO:
      return {
        ...state,
        payload: { ...state.payload, ...action.payload },
        loading: action.loading
      }
    default:
      return state
  }
}
