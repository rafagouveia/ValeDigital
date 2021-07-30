let initialState = {
  payload: {
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
    },
  },
  loading: true
}


export const home = (state = initialState, action) => {
  switch (action.type){
    case "GET_HOME":
      return {
        payload: { ...state.payload, ...action.payload },
        loading: action.loading
      }
    case "SET_HOME":
      return {
        payload: { ...state.payload, ...action.payload }
      }
    default:
      return state
  }
}


export const selectedData = (state = {
  payload: {
    data: ""
  }
}, action) => {
  switch (action.type){
    case "SET_DATA":
      return {
        payload: action.payload
      }
    default:
      return state
  }
}