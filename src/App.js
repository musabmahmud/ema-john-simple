import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Review from "./components/Review/Review";
import Shop from './components/Shop/Shop';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  
  return (
      <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <h1>Home</h1>
            </Route>
            <Route path="/shop">
                <Shop></Shop>
            </Route>
            <Route path="/review">
                <Review></Review>
            </Route>
            <Route path="/inventory">
                <h1>This is Inventory</h1>
            </Route>
            <Route path="/login">
                <Login></Login>
            </Route>
            <PrivateRoute path="/shipment">
                <Shipment></Shipment>
            </PrivateRoute>
            <Route path="/product/:productKey">
                <ProductDetails></ProductDetails>
            </Route>
            <Route path="*">
              <h3>Page Not Found</h3>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
  );
}

export default App;
