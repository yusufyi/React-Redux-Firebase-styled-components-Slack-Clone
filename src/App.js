import React from 'react';
import styled from 'styled-components';
// import { Counter } from './features/Counter';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Loading from './components/Loading';
function App() {
  const [user, loading] = useAuthState(auth);

  console.log(user?.displayName);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />

            <AppBody>
              <Sidebar displayName={user?.displayName} />

              <Switch>
                <Route path="/">
                  <Chat></Chat>
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

const AppBody = styled.div`
  display: flex;
`;

export default App;
