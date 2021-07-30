import { combineReducers, createStore} from "redux";
import {funcionario} from "./reducers/funcionariosReducer";
import {vale, produto} from "./reducers/valesReducer"
import {home, selectedData} from "./reducers/homeReducer";


const store = createStore(combineReducers({
  funcionario,
  vale,
  produto,
  home,
  selectedData
}))

export default store;

