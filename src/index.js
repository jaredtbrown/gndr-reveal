import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_CONFIG_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#361830'
        },
        secondary: {
            main: '#B551A1'
        }
    }
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
