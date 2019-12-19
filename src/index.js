import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

var firebaseConfig = {
    apiKey: "AIzaSyC-LrIPvadwS22VLcSKGSVUqwGmOU-s5pg",
    authDomain: "gndr-reveal.firebaseapp.com",
    databaseURL: "https://gndr-reveal.firebaseio.com",
    projectId: "gndr-reveal",
    storageBucket: "gndr-reveal.appspot.com",
    messagingSenderId: "83788529766",
    appId: "1:83788529766:web:0f814e4d10f5810c106da7"
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
