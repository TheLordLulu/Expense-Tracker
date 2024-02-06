import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './components/Orb/Orb';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income';
import Expenses from './components/Expenses/Expenses';
import SignInSide from './components/Login/SignInSide';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useGlobalContext } from './context/globalContext';
import SignUp from './components/Signup/SignUp';

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Update the user in the global context
      global.updateUser(user);
    });

    return () => unsubscribe();
  }, [global]);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <div>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          {global.user ? (
            <Router>
              <Navigation active={active} setActive={setActive} />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/income" element={<Income />} />
                <Route path="/expenses" element={<Expenses />} />
              </Routes>
            </Router>
          ) : (
            <Router>
              <Routes>
                <Route path="/sign-in" element={<SignInSide />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Routes>
            </Router>
          )}
        </MainLayout>
      </AppStyled>
    </div>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;

