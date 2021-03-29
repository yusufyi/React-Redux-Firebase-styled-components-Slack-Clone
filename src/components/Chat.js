import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRoomId, changeSelectVal } from '../features/appSlice';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/Info';
import ChatInput from './ChatInput';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/firebase';
import Message from './Message';

export default function Chat() {
  const roomId = useSelector(selectRoomId);
  const searchValue = useSelector(changeSelectVal);
  const chatRef = useRef(null);
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  );
  const [roomMessages, loading, error] = useCollection(
    roomId &&
      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  );
  useEffect(() => {
    chatRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [loading, roomMessages]);

  console.log(searchValue);
  return (
    <ChatContainer>
      {roomId && (
        <>
          <Header>
            <HeaderLeft>
              <h5>#{roomDetails?.data().name}</h5>
            </HeaderLeft>
            <HeaderRight>
              <InfoIcon /> <h5>Details</h5>
            </HeaderRight>
          </Header>
          {roomMessages && (
            <>
              <ChatMessageContainer>
                {roomMessages.docs
                  .filter((m) =>
                    m.data().message.toLowerCase().includes(searchValue)
                  )
                  .map((doc) => {
                    const { message, photoURL, timestamp } = doc.data();
                    console.log({ timestamp });
                    return (
                      <Message
                        key={doc.id}
                        photoURL={photoURL}
                        message={message}
                        timestamp={timestamp}
                      />
                    );
                  })}
                <ChatBottom ref={chatRef} />
              </ChatMessageContainer>
            </>
          )}
          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            roomId={roomId}
          ></ChatInput>
        </>
      )}
    </ChatContainer>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  height: 40px;
`;

const HeaderLeft = styled.div`
  display: flex;
`;
const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow: scroll;
  margin-top: 30px;
`;

const ChatMessageContainer = styled.div`
  overflow: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;

  height: 80vh;
`;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
