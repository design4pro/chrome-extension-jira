import React from 'react';
import { render } from 'react-dom';
import App from './app/app';
import * as serviceWorker from './serviceWorker';

const Element = document.createElement('div');
Element.setAttribute('id', 'dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf');
document.body.appendChild(Element);
render(<App />, document.getElementById('dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
