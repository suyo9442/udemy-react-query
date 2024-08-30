import { createContext, useContext, useState } from "react";

import {
  clearStoredLoginData,
  getStoredLoginData,
  setStoredLoginData,
} from "./local-storage";
import { LoginData } from "./types";

type AuthContextValue = {
  userId: number | null;
  userToken: string | null;
  setLoginData: (loginData: LoginData) => void;
  clearLoginData: () => void;
};

// 전역에서 사용할 수 있는 context 정보 생성
const AuthContext = createContext<AuthContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginData = () => {
	// 컨텍스트 정보 가져옴
  const authValue = useContext(AuthContext);
	
	// 없다면? 컨텍스트 Provider의 외부에 있는 것.
  if (!authValue) {
    throw new Error(
      "Error! AuthContext called from outside the AuthContextProvider"
    );
  }

  return authValue;
};

export const AuthContextProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [loginData, setLoginDataRaw] = useState<LoginData | null>(() =>
    getStoredLoginData()
  );

  // can't destructure since loginData might be null
  const userId = loginData?.userId;
  const userToken = loginData?.userToken;

  const setLoginData = ({ userId, userToken }: LoginData) => {
    setLoginDataRaw({ userId, userToken });
    setStoredLoginData({ userId, userToken });
  };

  const clearLoginData = () => {
    setLoginDataRaw(null);
    clearStoredLoginData();
  };

  return (
    <AuthContext.Provider
      value={{ userId, userToken, clearLoginData, setLoginData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
