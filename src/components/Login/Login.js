import './Login.css';
import { useContext, useState } from 'react';
import { initializeApp } from 'firebase/app'; 
import { } from 'firebase/auth';
import FirebaseConfig from './Firebase.config';
import { getAuth, signInWithPopup,createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,signOut} from "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const app = initializeApp(FirebaseConfig);


function Login() {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const provider = new GoogleAuthProvider();

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignIn: false,
    userName : '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  })
  
  const handleGoogle = () =>{
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        const {displayName,email,photoURL} = user;
        
        const signedInUser = {
          isSignIn: true,
          userName: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }
  const handleBlur = (e) =>{
      let isEmailValid = false;
      let isPassValid = false;
      let isNameValid = false;
      
      if(e.target.name === 'email') {
        const eRegrex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isEmailValid = eRegrex.test(String(e.target.value).toLowerCase());
      }
      if(e.target.name === 'password') {
        const eRegrex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        isPassValid = eRegrex.test(String(e.target.value).toLowerCase());
      }
      if(e.target.name === 'userName'){
        const nameRegrex = /^[A-Za-z\s]+$/;
        isNameValid = nameRegrex.test(e.target.value);
      }
      if(isNameValid || isEmailValid || isPassValid){
        const userInfo = {...user};
        userInfo[e.target.name] = e.target.value;
        setUser(userInfo);
        console.log(user);
      }
  }
  const signInCheck = (e) =>{
    if(user.email && user.password){
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          newUserInfo.isSignIn = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          console.log(error.message, error.code);
          const newUserInfo = {...user};
          newUserInfo.error = 'Password Or Email Invalid';
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    };
    e.preventDefault();
  }

  const signUpCheck = (e) =>{
    if(user.email && user.password){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setNewUser(!newUser);
          // ...
        })
        .catch((error) => {
          console.log(error.message);
          const newUserInfo = {...user};
          newUserInfo.error = 'User Already Exists';
          newUserInfo.success = false;
          newUserInfo.isSignIn = false;
          setUser(newUserInfo);
        });
    }
    e.preventDefault();
  }

  const handleSignOut = (e) => {
    const auth = getAuth();
      signOut(auth).then(() => {
        const signedOutUser = {
          isSignIn: false,
          userName: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
        setLoggedInUser(signedOutUser);
      }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
    });
    e.preventDefault();
  }

  return (
    <div className="login">
          <h1>{loggedInUser.email}</h1>
          {
            newUser ? 
            <div>
              <form className="form" onSubmit={signUpCheck}>
                <input className="form_control" type="text" name="userName" placeholder="Enter your Name" onBlur={handleBlur} required/><br/><br/>
                <input className="form_control" type="text" name="email" placeholder="Enter your Email" onBlur={handleBlur} required/><br/><br/>

                <input className="form_control" type="password" name="password" placeholder="Enter your Password" onBlur={handleBlur} required/><br/><br/>
                
                <button className="gl_btn">Sign Up</button>
              </form>
              <button className="gl_btn" style={{background: 'yellow', marginTop:'5px'}} onClick={() => setNewUser(!newUser)}>Already Have Account?</button>
            </div>
            :
            <div>
              <form onSubmit={signInCheck}>
                <input className="form_control" type="text" name="email" placeholder="Enter your Email" onBlur={handleBlur} required/><br/><br/>
                <input className="form_control" type="password" name="password" placeholder="Enter your Password" onBlur={handleBlur} required/><br/><br/>
                <button className="gl_btn">Logged In</button>
              </form>
              <button className="gl_btn" style={{background: 'yellow', marginTop:'5px'}} onClick={() => setNewUser(!newUser)}>Create New</button>
            </div>
          }
          {user.success && <p style={{color: 'green', textDecoration: 'capitalize'}}>User {newUser ? 'Created' : 'logged in'} Successfully</p>}
          {user.error && <p style={{color: 'red'}}>{user.error}</p>}
          <button className="gl_btn" onClick={() => handleGoogle()} style={{marginTop:'5px'}}>Signin With Google</button>
        </div>
  );
} 

export default Login;
