import SimpleWebRTC from 'simplewebrtc';

const webrtc = new SimpleWebRTC({
  // Configuración de WebRTC
  localVideoEl: 'local-video',
  remoteVideosEl: 'remote-videos',
  autoRequestMedia: true,
  media: {
    audio: true,
    video: false
  }
});

// Función para compartir audio
webrtc.on('connection', (peer) => {
  console.log('Conexión establecida con', peer);
  // Compartir audio con el peer
  webrtc.shareAudio(peer);
});

// Función para recibir audio
webrtc.on('stream', (stream) => {
  console.log('Receiving audio from', stream.peer);
  // Reproducir audio recibido
  document.getElementById('remote-audio').srcObject = stream;
});