import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');
console.assert(!root, "Root element not found");
if (root) {
    ReactDOM.createRoot(root).render(
        <React.Fragment>
            <App />
        </React.Fragment>
    )
}

