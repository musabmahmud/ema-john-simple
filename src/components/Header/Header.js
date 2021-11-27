import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const logOut = () =>{
        setLoggedInUser({
            isSignIn: false,
        })
    }
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav className="nav">
                <Link to="./">Home</Link>
                <Link to="./shop">Shop</Link>
                <Link to="./review">Order Review</Link>
                <Link to="./inventory">Manage Inventory</Link>
                {
                    loggedInUser.isSignIn ? (
                        <Link to="./"><span onClick={() => logOut()}>Log Out</span></Link>
                    ) : (<Link to="./login">Log In</Link>)
                }
            </nav>
        </div>
    );
};

export default Header;