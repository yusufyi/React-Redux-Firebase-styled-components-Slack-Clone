import React from 'react';
import styled from 'styled-components';
import SidebarOption from './SidebarOption';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/firebase';

function Sidebar({ displayName }) {
  const [channel, loading, error] = useCollection(db.collection('rooms'));

  return (
    <SidebarContainer>
      <SidebarHeader>
        <h5>{displayName}</h5>
      </SidebarHeader>

      <SidebarOption icon="+" addChannelOption title="Add Channel " />
      <hr></hr>
      <SidebarOption icon="#" title="Channels " />
      {channel?.docs.map((doc) => (
        <SidebarOption
          key={doc.id}
          id={doc.id}
          icon="#"
          selectChannelOption
          title={doc.data().name}
        />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--menu-color);
  flex: 0.3;
  border: 1px solid gray;
  height: 100vh;
  max-width: 260px;
`;

const SidebarHeader = styled.div`
  margin-top: 80px;
  padding-left: 10px;
`;

const SidebarInfo = styled.div``;
