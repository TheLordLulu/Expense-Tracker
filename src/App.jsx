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
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useGlobalContext } from './context/globalContext';
import TransactionHistory from './History/TransactionHistory';
import Loader from './components/Loader/FullPageLoader'; // Import Loader component

function App() {
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(true); // State to track loading status
  const global = useGlobalContext();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Update the user in the global context
      global.updateUser(user);
      setLoading(false); // Set loading to false once data is fetched
    });
  
    return () => unsubscribe();
  }, [global]);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <TransactionHistory />;
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
      {/* Conditionally render Loader component while loading */}
      {loading ? (
        <Loader bg={bg} />
      ) : (
        <AppStyled bg={bg} className="App">
          {orbMemo}
          <MainLayout>
            {global.user ? (
              <>
                <Navigation active={active} setActive={setActive} />
                <main>{displayData()}</main>
              </>
            ) : (
              <SignInSide />
            )}
          </MainLayout>
        </AppStyled>
      )}
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

