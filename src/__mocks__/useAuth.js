import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [cubeMap, setCubeMap] = useState();

  return (
    <AuthContext.Provider value={{ user, setUser, cubeMap, setCubeMap }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = jest.fn(() => {
  return useContext(AuthContext);
});