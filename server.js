const express = require('express');
const app = express();
const SimpleWebRTC = require('simplewebrtc');

const webrtc = new SimpleWebRTC({
  // Configuración de WebRTC
  media: {
    audio: true,
    video: false
  }
});

app.use(express.static('public'));

webrtc.on('connection', (peer) => {
  console.log('Conexión establecida con', peer);
});

webrtc.on('stream', (stream) => {
  console.log('Receiving audio from', stream.peer);
  // Reproducir audio recibido
  document.getElementById('remote-audio').srcObject = stream;
});

app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});