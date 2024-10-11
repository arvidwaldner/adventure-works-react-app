import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css'; // Om du har en CSS-fil f�r globala stilar

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);