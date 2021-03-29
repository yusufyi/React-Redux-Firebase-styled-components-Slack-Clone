import React from 'react';
import { db } from '../firebase/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import { concatSeries } from 'async';
import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ channelName, roomId, chatRef }) {
  const [user] = useAuthState(auth);

  const [input, SetInput] = React.useState('');
  const sendMessage = (e) => {
    e.preventDefault();
    console.log('ChatMEssage RoomID: ' + roomId);
    if (!roomId) {
      return false;
    }

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      user: user?.displayName,
      photoURL: user?.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    SetInput('');
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => SetInput(e.target.value)}
          placeholder={`Channel Name #  ${channelName}`}
        ></input>
        <Button hidden type="submit" onClick={sendMessage}>
          {' '}
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    width: 60%;
    bottom: 30px;
    position: fixed;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`;
