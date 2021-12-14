import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, FlatList, RefreshControl} from 'react-native';
import {ChatRoomsItem} from '../components/ChatRoomsItem';
import firestore from '@react-native-firebase/firestore';

export type chatRoom = {
  id: string;
  title: string;
  description: string;
};

export const ChatRoomsScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [chatRooms, setChatRooms] = useState<chatRoom[]>([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    query();
    setRefreshing(false);
  }, []);

  function query() {
    setChatRooms([]);
    firestore()
      .collection('chatRooms')
      .orderBy('latestMessage', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const chatRoom: chatRoom = {
            id: documentSnapshot.id,
            title: documentSnapshot.data().title,
            description: documentSnapshot.data().description,
          };
          setChatRooms(prevState => [...prevState, chatRoom]);
        });
      });
  }

  useEffect(() => {
    query();
    setLoading(false);
  }, []);

  // if i don't use renderItem middleware i can't pass navigation as prop to the chatRoomsItem component
  const renderItem = ({item}: chatRoom) => (
    <ChatRoomsItem
      id={item.id}
      title={item.title}
      description={item.description}
    />
  );

  return loading ? (
    <View>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <View>
      <FlatList
        style={{height: '100%'}}
        data={chatRooms}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};
