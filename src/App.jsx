import React, { useState, useEffect} from "react"
import Home from './components/Home'
import Login from './components/Login'

import firebaseApp from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebaseApp);

function App() {

  const [userGlobal, setUserGlobal] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if (userFirebase) {
      setUserGlobal(userFirebase);
    }else {
      setUserGlobal(null);
    }
  });


  return (
    <>
    {userGlobal ? <Home userEmail={userGlobal.email} /> : <Login/>}
    </>
  )
}

export default App
