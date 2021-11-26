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

function App() {
  
  return (
    <div>
        <Header></Header>
        <Router>
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
            <Route path="/product/:productKey">
                <ProductDetails></ProductDetails>
            </Route>
            <Route path="*">
              <h3>Page Not Found</h3>
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;
