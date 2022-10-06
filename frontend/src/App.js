import './App.css';
import ForexTable from './components/forex/ForexDisplay';
import SignupForm from './components/signup/SignupForm';
import LoginForm from './components/login/LoginForm';
import TransferForm from './components/transfer/LoginForm';
function App() {
  return (
    <div>
      <ForexTable/>
      {/* <SignupForm/> */}
      <LoginForm/>
      <TransferForm/>
    </div>
  );
}

export default App;
