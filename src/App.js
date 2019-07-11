import React, { Component } from 'react';
import './App.css';
import Loadable from 'react-loadable'; //实现按需加载
import Loading from './components/Loading';
import {BrowserRouter, Route} from 'react-router-dom';
// import BasicLayout from './layouts/BasicLayout';

const Login = Loadable({
  loader: () => import('./views/login/login'),
  loading: Loading
});

const Main = Loadable({
  loader: () => import('./layouts/BasicLayout'),
  loading: Loading
})

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path="/" component={Login}/>
          <Route exact path="/console" component={Main}/>
      </BrowserRouter>
    );
  }
}

export default App;
