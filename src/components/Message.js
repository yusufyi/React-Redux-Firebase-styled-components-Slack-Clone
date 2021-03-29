import { Avatar } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';

function Message({ message, photoURL, timestamp }) {
  console.log(photoURL);
  return (
    <MessageContainer>
      <Chip avatar={<Avatar alt="Natacha" src={photoURL} />} label={message} />
      <br></br>
      <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
    </MessageContainer>
  );
}

export default Message;

const MessageContainer = styled.div`
  margin: 10px;

  > span {
    font-size: 8px;
    color: gray;
  }
`;
