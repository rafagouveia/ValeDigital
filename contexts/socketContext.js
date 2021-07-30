import React, { createContext } from "react";
import {io} from "socket.io-client"


const MainContext = createContext({})

class PainelSenha {
  constructor() {
    this.socket = io('http://0.tcp.sa.ngrok.io:16096')
  }
}

export const MainContextProvider = ({children}) => {
  const PainelWS = new PainelSenha();
  return(
    <MainContext.Provider value={{PainelWS}}>{children}</MainContext.Provider>
  )
}

export default MainContext;