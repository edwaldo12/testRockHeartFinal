import { createContext, useContext, useState, FunctionComponent } from "react";
import {
  AppContextAttributes,
  IStateProviderProps,
} from "../interfaces/AppContext/AppContextAttributes";
import { UserAttributes } from "../interfaces/User/UserInterface";

const AppContext = createContext<AppContextAttributes | undefined>(undefined);

const StateProvider: FunctionComponent<IStateProviderProps> = ({
  children,
}) => {
  const [userLogin, setUserLogin] = useState<number>(0);
  const [registerForm, setShowRegisterForm] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showTransferModal, setShowTransferModal] = useState<boolean>(false);
  const [users, setUsers] = useState<UserAttributes | undefined>();
  const [renderTable, setRenderTable] = useState<boolean>(false);

  const contextValue: AppContextAttributes = {
    userLogin,
    setUserLogin,
    registerForm,
    setShowRegisterForm,
    showModal,
    setShowModal,
    showTransferModal,
    setShowTransferModal,
    users,
    setUsers,
    renderTable,
    setRenderTable,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppState = (): AppContextAttributes => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within the StateProvider");
  }
  return context;
};

export default StateProvider;
