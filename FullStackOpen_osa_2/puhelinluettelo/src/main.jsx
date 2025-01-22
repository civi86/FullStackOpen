import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import './index.css';
import axios from 'axios';

axios.get('http://localhost:3001/persons')
  .then(response => {
    const notes = response.data;
    const root = createRoot(document.getElementById('root'));

    root.render(
      <App persons={notes} />
    );
  })
  .catch(error => {
    console.error('Error:', error);
  });
