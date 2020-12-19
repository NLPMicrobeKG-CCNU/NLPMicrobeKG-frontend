import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Visualization from './pages/visualization/index';
import Explore from './pages/explore microbes/index';
import Home from './pages/home/index';
import Contact from './pages/contact us/index';
import { BrowserRouter , Route} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
  <React.StrictMode>
    <Route path="/home" component={Home} />
    <Route path ="/visualization" component={Visualization} />
    <Route path ="/explore" component={Explore} />
    <Route path ="/contact" component={Contact} />
  </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

