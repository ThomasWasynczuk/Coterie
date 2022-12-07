import { createContext, useContext, useEffect, useState } from "react";
import { signInWithCustomToken, signOut as fbSignOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signIn(token) {
    return signInWithCustomToken(auth, token)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("USER SUCCESS:", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error:", errorMessage);
        // ...
      });
  }

  function signOut() {
    return fbSignOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error:", error);
      });
  }

  function getUser() {
    return auth.currentUser;
  }
  async function getUserInfo(uid) {
    return await getDoc(doc(db, "users", uid));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        getUserInfo(user.uid).then((e) => {
          setCurrentUser({ ...e.data(), ...user });
          setLoading(false);
        });
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    signIn,
    currentUser,
    getUser,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
