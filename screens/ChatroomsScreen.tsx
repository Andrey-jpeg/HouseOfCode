import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChatRoomsItem} from '../components/ChatRoomsItem';
import {signOut} from '../services/Firebase';

type chatRoom = {
  title: string;
  description: string;
};

const chatRooms: chatRoom[] = [
  {
    title: 'Chatroom 1',
    description: 'This is my first chatroom :)',
  },
  {
    title: 'Chatroom 2',
    description: 'This is my 2nd chatroom :)',
  },
  {
    title: 'Chatroom 3',
    description: 'This is my 3rd chatroom :)',
  },
];

export const ChatRoomsScreen: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView>
      <FlatList
        data={chatRooms}
        renderItem={ChatRoomsItem}
        keyExtractor={(item, index) => index}
        bounces={false}
      />
      <TouchableOpacity onPress={() => signOut()}>
        <Text> Sign me out! </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
