import { Container } from "@mui/material";
import LoginForm from "./components/molecules/LoginForm";
import { useAppState } from "./provider/AppContext";
import RegisterForm from "./components/molecules/RegisterForm";
import WalletTable from "./components/molecules/WalletTable";
import TopUpModal from "./components/molecules/TopUpModal";
import TransferWalletModal from "./components/molecules/TransferForm";

const App = () => {
  const { registerForm, userLogin } = useAppState();
  return (
    <Container>
      {!userLogin && <>{registerForm ? <RegisterForm /> : <LoginForm />}</>}
      {userLogin !== 0 && <WalletTable />}
      <TopUpModal/>
      <TransferWalletModal/>
    </Container>
  );
};

export default App;
