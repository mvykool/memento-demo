import React, { useState } from 'react'

/**importing firebase */

import  firebaseApp  from '../firebase/index'
import { getAuth,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      signInWithRedirect,
      GoogleAuthProvider
  } from 'firebase/auth'


const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();


const Login = () => {
  const [isRegistered, setIsRegistered] = useState(false)

async function submitHandler(e) {
  e.preventDefault();
  
  const email = e.target.email.value;
  const password = e.target.pass.value

  if (isRegistered) {
    const userData = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userData);

  }
  else {
    signInWithEmailAndPassword(auth, email, password);
    
  }
}




  return (
    <div className='form'>
      <h1 className='login-title'>{isRegistered ? "Sign In" : "Create Account" }</h1>
      <form onSubmit={submitHandler}>
      <div className="input-container">
        <label className='login-label' htmlFor='email'>Email Address:</label>
        <input className='text-place' placeholder=' Email address' type="text" id="email" required />
      </div>
      <div className="input-container">
        <label className='login-label' htmlFor='pass'>Password: </label>
        <input className='text-place' placeholder=' password' type="password" id="pass" required />
      </div>
      <button type='submit' className="button-container">
      {isRegistered ? "Log in" : "Sign up" }
        </button>
        <button type='button' className="button-container-google" onClick={() => signInWithRedirect(auth, googleProvider)}>
            Continue with Google
        </button>
        <button type='button' className="button-container-question" onClick={(()=> setIsRegistered(!isRegistered))}>
          {isRegistered ? "No account? Register" :  "Do you have an account? Sign in" }
        </button>
    </form>
    </div>
  )
}

export default Login