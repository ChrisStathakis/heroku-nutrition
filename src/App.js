import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { persistStore } from 'redux-persist'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from './helpers/PrivateRoute.js';
import Homepage from './views/Homepage/Homepage';
import LoginRegisterPage from './components/LoginRegisterPage';
import configureStore from "./redux/store.js";
import ProductPage from './views/Product/Product.js';
import RecipesPage from "./views/Recipes/Recipes";
import ProgramPage from "./views/Program/ProgramPage";
import UserPage from "./views/UserPage/UserPage";


const store = configureStore();
persistStore(store)

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter key='1'>
            <Switch key='01'>
                <PrivateRoute key='002' exact path="/" component={Homepage} />
                <Route key='003' exact path='/login/' component={LoginRegisterPage} />
                <PrivateRoute key='003' exact path='/products/' component={ProductPage} />
                <PrivateRoute key='004' exact path='/recipes/' component={RecipesPage} />
                <PrivateRoute key='005' exact path='/plan/' component={ProgramPage} />
                <PrivateRoute key='003' exact path='/user/' component={UserPage} />
            </Switch>
            </BrowserRouter>
        </Provider>
    );
  }
}

export default App;


