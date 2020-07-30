import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Share from './pages/Share/Share';
import Explore from './pages/Explore/Explore';
import Desk from './pages/Desk/Desk';
import Product from './pages/Product/Product';
import FourOhFour from './pages/FourOhFour/FourOhFour';
import Charts from './pages/Charts/Charts';
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import ScrollToTop from './components/Util/ScrollToTop';

import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop/>
          <Header/>
            <Switch>
              <Route exact path="/explore" component={Explore}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/share" component={Share}/>
              <Route exact path="/charts" component={Charts}/>
              <Route exact path="/product/:id" component={Product}/>
              <Route exact path="/desk/:username/:id" component={Desk}/>
              <PrivateRoute path="/profile" component={Profile} />
              <Route exact path="/" component={Home}/>
              <Route component={FourOhFour}/>
            </Switch>
          <Footer/>
    </Router>
    </div>
  );
}

export default App;
