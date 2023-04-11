export interface IState {
  toggleTheme: object;
  loginData: object;
}

export type ActionType =
  | "setTheme"
  | "setLoginData";

export interface IAction {
  type: ActionType;
  payload?: any;
}

export const appReducer = (state: IState, action: IAction) => {
  const { payload } = action;

  switch (action.type) {

    case "setTheme": {
      return {
        ...state,
        toggleTheme: {
          theme: payload.theme
        }
      };
    }

    case "setLoginData": {
      return {
        ...state,
        loginData: {
          isLogin: payload.isLogin,
          role: payload.role
        }
      };
    }

    default: {
      return state;
    }
  }
};
