import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route , Link , Switch , BrowserRouter as Router} from "react-router-dom"
import user from "./user"
import visit from "./visit"
import notFound from "./notFound"
const Routing = ()=>{
  return(
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/user">user</Link></li>
        <li><Link to="/visit">visit</Link></li>
      </ul>
    </div>
    <Switch>
        <Route path="/" component={App} exact />
        <Route exact path="/visit" component={visit} />
        <Route  exact  component={notFound} />
     </Switch>
  </Router>
  )
}
 


ReactDOM.render(
  <React.StrictMode>
    <Routing/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
