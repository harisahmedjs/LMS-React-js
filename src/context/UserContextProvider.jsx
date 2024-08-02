import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getData } from "../config/firebase/FirebaseMethods";
import { CircularProgress } from "@mui/material";

const Usercontext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          const userDocs = await getData("student", authUser.uid);
          if (userDocs && userDocs.length > 0) {
            if (userDocs[0].type === 'student') {
              navigate('/student');
            }
            setUser(authUser);
          } else {
            console.error("User data not found");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <Usercontext.Provider value={{ user, initializing }}>
      {initializing ? (
        <div className="d-flex align-items-center justify-content-center vh-100">
          <CircularProgress />
        </div>
      ) : (
        children
      )}
    </Usercontext.Provider>
  );
};

export default UserContextProvider;
export { Usercontext };
