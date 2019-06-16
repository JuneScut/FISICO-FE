import React, { Component } from 'react';
import './App.css';
import Loadable from 'react-loadable'; //实现按需加载
import Loading from './components/Loading';
import {BrowserRouter, Route} from 'react-router-dom';

const Login = Loadable({
  loader: () => import('./views/login/login'),
  loading: Loading
});

const Home = Loadable({
  loader: () => import('./views/home/home'),
  loading: Loading
})

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/home" component={Home}/>
      </BrowserRouter>
    );
  }
}

export default App;
