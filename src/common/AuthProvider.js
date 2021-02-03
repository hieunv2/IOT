import React, {useState, createContext, useContext, useMemo} from 'react';
import auth from '@react-native-firebase/auth';

//-------------------------------------
export let AuthContext;

export const createAuthContext = (userData) => {
  AuthContext = createContext({user: userData});
};

export const useAuth = () => {
  const authValue = useContext(AuthContext);
  return authValue;
};

const AuthProvider = (props) => {
  const authValues = useContext(AuthContext);
  const [user, setUser] = useState(authValues.user);

  const updateUser = (data) => {
    setUser(data);
  };

  const clear = async () => {
    try {
      console.log('clear storage');
      auth()
        .signOut()
        .then(() => console.log('User signed out!'));
      setUser(null);
    } catch (e) {}
  };

  const value = useMemo(
    () => ({
      user,
      updateUser,
      clear,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );

  return <AuthContext.Provider value={value} {...props} />;
};

export default AuthProvider;
