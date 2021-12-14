import React, {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

export const ChatRoom: React.FC = ({route}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const currentChatRoom = route.params.chatRoomId;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('chatRooms')
      .doc(currentChatRoom)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot(snapshot =>
        setMessages(
          snapshot.docs.map(doc => ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })),
        ),
      );
    return unsubscribe;
  }, [currentChatRoom]);

  const onSend = useCallback(
    (messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
      const {_id, createdAt, text, user} = messages[0];
      firestore()
        .collection('chatRooms')
        .doc(currentChatRoom)
        .collection('messages')
        .add({
          _id,
          createdAt,
          text,
          user,
        });
    },
    [currentChatRoom],
  );

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth()?.currentUser?.email,
        name: auth()?.currentUser?.displayName,
        avatar: auth()?.currentUser?.photoURL,
      }}
    />
  );
};
