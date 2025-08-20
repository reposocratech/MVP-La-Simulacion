import { createContext, useEffect, useState } from "react";
import { fetchData } from "../helpers/axiosHelper";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    let tokenLS = localStorage.getItem("token")
    if(tokenLS){
      const fetching = async()=>{
        try {
          const res = await fetchData("/users/userById", "get", null, tokenLS);
          setUser(res.data.user);
          setToken(tokenLS)
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      fetching();
    }else{
      setLoading(false);
    }
  },[]);

  const login = async(userLogin)=> {
    try {
      let res = await fetchData('/users/login', "post", userLogin);
      
      let tokenBack = res.data.token;

      const responseUser = await fetchData("/users/userById", "get", null, tokenBack);
      localStorage.setItem("token", tokenBack);
      setToken(tokenBack);
      setUser(responseUser.data.user);

    } catch (error) {
      throw error;
    }

  };

  const logout = () =>{
    localStorage.removeItem("token");
    setUser();
    setToken();
  };

  return (
    <>
      <AuthContext.Provider value={{
        user,
        setUser,
        token,
        setToken,
        login,
        logout,
        loading
      }}>
        {children}
      </AuthContext.Provider>
    </>
  )
}
