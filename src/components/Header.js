import { Avatar } from '@material-ui/core';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase/firebase';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import { useDispatch } from 'react-redux';

import { searchValue } from '../features/appSlice';

function Header() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  const ChangeSearchValue = (e) => {
    dispatch(
      searchValue({
        searchVal: e.target.value.toLowerCase(),
      })
    );
  };

  return (
    <HeaderContainer>
      {/* Header Left */}
      <HeaderLeft>
        <HeaderAvatar alt={user?.displayName} src={user?.photoURL} />
      </HeaderLeft>

      {/* Heafer Search */}
      <HeaderSearch>
        <SearchSharpIcon />
        <input placeholder="Search Message" onChange={ChangeSearchValue} />
      </HeaderSearch>
      {/* Header Right */}
      <HeaderRight>
        <HeaderLogout fontSize="large" onClick={() => auth.signOut()} />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  background-color: #2b2e4a;
  color: white;
  border: 1px solid gray;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px;
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  flex: 0.4;
  opacity: 1;
  background-color: #34385b;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  margin: 10px;
  color: gray;
  border: 1px gray solid;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: none;
    color: white;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px;
  justify-content: flex-end;
`;
const HeaderLogout = styled(ExitToAppIcon)`
  cursor: pointer;
  padding-right: 20px;
  :hover {
    color: red;
  }
`;
