import React, {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import {Alert} from 'react-native';
import firebase from '@react-native-firebase/app';

export const ChatRoom: React.FC = ({route}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const currentChatRoom: string = route.params.chatRoomId;

  const updatePermissions = useCallback(() => {
    firestore()
      .collection('chatRooms')
      .doc(currentChatRoom)
      .update({
        allowNotifications: firebase.firestore.FieldValue.arrayUnion(
          auth().currentUser?.uid,
        ),
      });
  }, [currentChatRoom]);

  const handleNotification = useCallback(async () => {
    const notificationForRoom = await firestore()
      .collection('chatRooms')
      .doc(currentChatRoom)
      .get();

    let userHasNotifications = [];

    try {
      userHasNotifications =
        notificationForRoom?._data?.allowNotifications.find(
          user => user === auth().currentUser?.uid,
        );
    } catch (error) {
      console.log(error);
    }

    if (userHasNotifications === auth().currentUser?.uid) {
      PushNotification.localNotification({
        channelId: 'test-channel',
        title: 'You recieved a new message!',
        message: 'demo://app/chatroom/' + currentChatRoom,
      });
    } else {
      Alert.alert(
        'Notifications?',
        'Do you wish to recieve notifications for this room?',
        [
          {
            text: 'No thank you',
            style: 'cancel',
          },
          {text: 'OK', onPress: () => updatePermissions()},
        ],
      );
    }
  }, [currentChatRoom, updatePermissions]);

  useEffect(() => {
    const subscribe = firestore()
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
    return subscribe;
  }, [currentChatRoom]);

  useEffect(() => {
    const subscribeToNotification = firestore()
      .collection('chatRooms')
      .doc(currentChatRoom)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot(() => handleNotification());
    return subscribeToNotification;
  }, [currentChatRoom, handleNotification]);

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
        _id: auth()?.currentUser?.uid,
        name: auth()?.currentUser?.displayName,
        avatar: auth()?.currentUser?.photoURL,
      }}
    />
  );
};
