import { io } from 'socket.io-client'

const ws = io.connect('http://0.tcp.sa.ngrok.io:16096')

  export { ws }