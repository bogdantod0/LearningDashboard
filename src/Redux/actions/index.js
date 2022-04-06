import React from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider, provider2 } from "../../firebase";
import { SET_USER } from "./actionType";

export const setUser = (payload) => ({
  type: SET_USER,
  user: payload,
});

export const signInGoogleApi = () => {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("USER RESULT:", user);
        // ...
        dispatch(setUser(user));
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
};
export const signInFacebookApi = () => {
  return (dispatch) => {
    signInWithPopup(auth, provider2)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        dispatch(setUser(user));
        console.log("USER:", user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };
};

export const signInAPI = (email, password) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log("USER RESULT:", user);
        dispatch(setUser(user));
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
};
export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setUser(user));
        console.log("AUTH:", auth);
      }
    });
  };
}

export const registerUser = (email, passwd) => {
  createUserWithEmailAndPassword(auth, email, passwd)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("USER", user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export const signOutGoogleApi = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};
