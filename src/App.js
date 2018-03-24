import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import PostsIndex from "./components/posts_index";
import PostsNew from "./components/posts_new";
import PostsShow from "./components/posts_show";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <div className="App">
          <Provider store={createStoreWithMiddleware(reducers)}>
          <BrowserRouter>
           <div>
            <Switch>
              <Route path="/posts/new" component={PostsNew} />
              <Route path="/posts/:id" component={PostsShow} />
              <Route path="/" component={PostsIndex} />
            </Switch>
          </div>
          </BrowserRouter>
          </Provider>
      </div>
    );
  }
}

export default App;
