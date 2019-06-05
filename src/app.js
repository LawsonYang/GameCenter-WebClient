import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import LoginPage from './pages/loginPage';
import HelloPage from './pages/helloPage';
import PaiFen from './games/paifen';
import CMD from './games/cmd'
import "antd/dist/antd.css";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/hello" component={HelloPage} />
          <Route path="/paifen" component={PaiFen} />
          <Route path="/cmd" component={CMD} />

        </div>
      </Router>
      // <HelloPage/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

// 热替换HMR，需要加入这段代码才会进行生效
if (module.hot)
  module.hot.accept();