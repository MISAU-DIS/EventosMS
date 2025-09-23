import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// (Mais tarde usaremos o getStorage para upload)

const firebaseConfig = {
  apiKey: "AIzaSyDNEcAvAW4MjLS2Xe4QmjL9vGJOwfEI0Nk",
  authDomain: "eventosms-f35a8.firebaseapp.com",
  databaseURL: "https://eventosms-f35a8-default-rtdb.firebaseio.com",
  projectId: "eventosms-f35a8",
  storageBucket: "eventosms-f35a8.firebasestorage.app",
  messagingSenderId: "1031548394131",
  appId: "1:1031548394131:web:094a9472d3a24b9897cb66"
};

// Inicializa o app Firebase uma única vez
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Exporta os serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
