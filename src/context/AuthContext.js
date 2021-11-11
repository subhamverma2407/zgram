import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "@firebase/auth";
import { useEffect, useContext, createContext, useState } from "react";
import { auth } from "../firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fetchedUser) => {
      if (fetchedUser) {
        setUser(fetchedUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithRedirect(auth, provider);
    // getRedirectResult(auth)
    //   .then((response) => {})
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const logOut = () => {
    return signOut(auth);
  };

  const value = {
    user,
    signInWithGoogle,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
