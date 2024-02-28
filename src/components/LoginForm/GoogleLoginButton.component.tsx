import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';

import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

interface User {
  displayName?: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}

const GoogleLoginButton = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDFLUPrfBBkFSaZYdAANokV8FrZjbX67Jg",
      authDomain: "pgs-personalgolfscore.firebaseapp.com",
      projectId: "pgs-personalgolfscore",
      storageBucket: "pgs-personalgolfscore.appspot.com",
      messagingSenderId: "26033768355",
      appId: "1:26033768355:web:bd6a43dc19affbfdc0bc16",
      measurementId: "G-2GPMKQTCWM"
    };

    const auth = getAuth();
    // const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    //   setUser(firebaseUser);
    // });

    //return unsubscribe;
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      //setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <img src={user.photoURL} alt="Profile picture" />
          {/* <button onClick={() => signOut(getAuth())}>Sign out</button> */}
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      )}
    </div>
  );
};

export default GoogleLoginButton;