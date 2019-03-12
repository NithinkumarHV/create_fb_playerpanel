import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyB9b_SZ_jerV0mu9axN5QCGLd454XdipdI",
  authDomain: "reactplayerpanel.firebaseapp.com",
  databaseURL: "https://reactplayerpanel.firebaseio.com",
  projectId: "reactplayerpanel",
  storageBucket: "reactplayerpanel.appspot.com",
  messagingSenderId: "97723268579"
};

//react-redux firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

//Init firebase instance
firebase.initializeApp(firebaseConfig);

//Init firestore
const firestore = firebase.firestore();
const settings = {};
firestore.settings(settings);

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});
// Check for settings in localStorage
if (localStorage.getItem("settings") == null) {
  // Default settings
  const defaultSettings = {
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false,
    allowRegistration: true
  };

  // Set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
