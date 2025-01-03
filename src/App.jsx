import { useContext } from 'react';
import './App.css'
import Login from './components/Login'
import Admin from './components/Admin';
import { authcontext } from './store/ContextProvider';
import Members from './components/Members';

function App() {

  const context_value = useContext(authcontext);

  return (
    <>
      { context_value.session.value === null && <Login/> }
      { context_value.session.value === 'admin' && <Admin/>}
      { context_value.session.value === 'member' && <Members/>}
    </>
  )
}

export default App
