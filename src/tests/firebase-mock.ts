import { Auth } from "firebase/auth";
const auth = {} as Auth;

export { auth };

export default {
  apiKey: "mock-api-key",
  authDomain: "mock-auth-domain",
  projectId: "mock-project-id",

  storageBucket: "mock-storage-bucket",
  messagingSenderId: "mock-messaging-sender-id",
  appId: "mock-app-id",
  measurementId: "mock-measurement-id",
  databaseURL: "https://mock-database-url.firebaseio.com",
};
