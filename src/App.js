// Importar bibliotecas necesarias
import SimpleWebRTC from 'simplewebrtc';
import React, { useState, useEffect } from 'react';

// Configuración de SimpleWebRTC
const config = {
  // Opciones de audio
  audio: {
    // Fuente de audio (opciones: 'user', 'environment', 'default')
    source: 'user',
    // Grabar audio en estéreo (opciones: true, false)
    stereo: true,
  },
  // Opciones de conexión peer-to-peer
  peerConnection: {
    // Tipo de conexión (opciones: 'offer', 'answer')
    type: 'offer',
  },
};

// Estado inicial de la aplicación
const initialState = {
  // Estado de la conexión peer-to-peer
  peerConnection: null,
  // Estado de la fuente de audio
  audioSource: 'user',
  // Estado de la grabación de audio en estéreo
  stereo: true,
  // Enlace de invitación
  inviteLink: '',
};

// Función principal de la aplicación
function App() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Crear conexión peer-to-peer
    const peerConnection = new SimpleWebRTC(config);
    setState({ ...state, peerConnection });
  }, []);

  // Función para crear oferta de conexión
  const handleCreateOffer = () => {
    state.peerConnection.createOffer()
      .then(offer => {
        // Enviar oferta al otro peer
        const inviteUrl = `https://example.com/invite?offer=${offer.sdp}`;
        setState({ ...state, inviteLink: inviteUrl });
      })
      .catch(error => console.error('Error al crear oferta:', error));
  };

  // Función para recibir respuesta del otro peer
  const handleSetRemoteDescription = (description) => {
    state.peerConnection.setRemoteDescription(description)
      .then(() => {
        console.log('Descripción remota establecida');
      })
      .catch(error => console.error('Error al establecer descripción remota:', error));
  };

  // Renderizar componente
  return (
    <div>
      <h1>Peer 1</h1>
      <button onClick={handleCreateOffer}>Crear oferta</button>
      <a href={state.inviteLink}>Enviar enlace de invitación</a>

      <h1>Peer 2</h1>
      <input type="text" placeholder="Ingrese el enlace de invitación" />
      <button onClick={() => handleSetRemoteDescription({ type: 'answer', sdp: 'SDP del otro peer' })}>
        Conectar
      </button>
    </div>
  );
}

export default App;