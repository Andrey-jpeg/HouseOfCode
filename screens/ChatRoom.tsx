import React, {Component, useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GiftedChat,
  IMessage,
  Actions,
  ActionsProps,
} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import {Alert} from 'react-native';
import firebase from '@react-native-firebase/app';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export const ChatRoom: React.FC = ({route}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const currentChatRoom: string = route.params.chatRoomId;
  const [photo, setPhoto] = useState<any>(null);

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
            image: doc.data()?.image && doc.data()?.image,
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
      if (photo) {
        const uploadUri = photo.assets[0].uri;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        uploadPhoto(uploadUri, fileName);
        messages[0].image =
          'https://firebasestorage.googleapis.com/v0/b/houseofcode-cba8f.appspot.com/o/01E9723D-62BC-4548-A32B-27E2ADCEFE03.jpg?alt=media&token=bce0730a-cdd4-4bc7-8244-0df85902792c';
      }
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
      const {_id, createdAt, text, image, user} = messages[0];
      firestore()
        .collection('chatRooms')
        .doc(currentChatRoom)
        .collection('messages')
        .add({
          _id,
          createdAt,
          text,
          image,
          user,
        });
    },
    [currentChatRoom, photo],
  );

  const uploadPhoto = async (uploadUri: string, fileName: string) => {
    storage().ref(fileName).putFile(uploadUri);

    storage()
      .ref('/' + uploadUri)
      .getDownloadURL()
      .then(downloadUrl => {
        console.log('file available at!' + downloadUrl);
      });

    /* try {
      await storage().ref(fileName).putFile(uploadUri);
    } catch (error) {
      console.log(error);
    } */
  };

  const handleChoosePhoto = useCallback(async () => {
    const result = await launchImageLibrary();
    setPhoto(result);
  }, []);

  const handleOpenCamera = useCallback(async () => {
    const options = {
      noData: true,
    };
    const result = await launchCamera(options);
    setPhoto(result);
  }, []);

  function renderActions(props: Readonly<ActionsProps>) {
    Ionicons.loadFont();

    return (
      <>
        <Actions
          {...props}
          options={{
            ['Attach a Photo']: () => handleChoosePhoto(),
          }}
          icon={() => <Ionicons name="attach" size={28} />}
        />
        <Actions
          {...props}
          options={{
            ['Take new photo']: () => handleOpenCamera(),
          }}
          icon={() => <Ionicons name="camera" size={28} />}
        />
      </>
    );
  }
  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
      renderActions={renderActions}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth()?.currentUser?.uid,
        name: auth()?.currentUser?.displayName,
        avatar: auth()?.currentUser?.photoURL,
      }}
    />
  );
};
