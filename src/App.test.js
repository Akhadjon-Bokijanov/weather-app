import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ReactDOM from 'react-dom'

it('App.js test', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div)
});
