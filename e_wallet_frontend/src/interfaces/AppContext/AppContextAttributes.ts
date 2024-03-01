import { ReactNode } from "react";
import { UserAttributes } from "../User/UserInterface";

export interface AppContextAttributes {
  userLogin?: number;
  setUserLogin: React.Dispatch<React.SetStateAction<number>>;
  registerForm: boolean;
  setShowRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showTransferModal: boolean;
  setShowTransferModal: React.Dispatch<React.SetStateAction<boolean>>;
  users: UserAttributes | undefined | any;
  setUsers(users: UserAttributes): void;
  renderTable: boolean;
  setRenderTable: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IStateProviderProps {
  children: ReactNode;
}
