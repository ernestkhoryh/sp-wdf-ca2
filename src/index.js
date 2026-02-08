import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { store } from "./app/store";
import { Provider } from "react-redux";

const domElement = document.getElementById('root');
const root = ReactDOM.createRoot(domElement);
root.render(
<React.StrictMode>
<Provider store={store}>
    <App />
</Provider>
</React.StrictMode>
);
