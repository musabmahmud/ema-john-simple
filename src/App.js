import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';

function App() {
  
  return (
    <div>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/shop">
                <Shop></Shop>
            </Route>
            <Route path="/review">
                <h1>This is Review</h1>
            </Route>
            <Route path="/inventory">
                <h1>This is Inventory</h1>
            </Route>
            <Route exact path="/">
              <h1>Home</h1>
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
