/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useReducer } from "react"
import { useNavigate } from "react-router-dom";
import { appReducer } from "../reducer/appReducer";
import { IAppContextProps } from "./AppContext.types";

export const AppContext = createContext<any>({});

const AppContextProvider: React.FC<IAppContextProps> = (props) => {
  const navigate = useNavigate();

  const initialState = {
    toggleTheme: {
      theme: "light"
    },
    loginData: {
      isLogin: false
    }
  }

  const [appState, appDispatch] = useReducer(appReducer, initialState);

  const toastObject = {
    position: "top-right",
    duration: 2000,
    icon: "👏",
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    }
  }

  return (
    <AppContext.Provider value={{ appState, appDispatch, navigate, toastObject }}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider;
