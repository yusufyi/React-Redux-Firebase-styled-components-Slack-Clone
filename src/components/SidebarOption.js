import React from 'react';
import styled from 'styled-components';
import { db } from '../firebase/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';

const SidebarOption = ({
  id,
  title,
  icon,
  addChannelOption,
  selectChannelOption,
}) => {
  const dispatch = useDispatch();

  const [channel, loading, error] = useCollection(db.collection('rooms'));
  const addChannel = () => {
    const channelName = prompt('Please enter the channel name');
    if (channelName) {
      db.collection('rooms').add({
        name: channelName,
      });
    }
  };
  const selectChannel = () => {
    console.log(id);
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 3px;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  > span {
    padding-left: 5px;
  }
  :hover {
    opacity: 0.9;
    background-color: #34385b;
  }
`;
