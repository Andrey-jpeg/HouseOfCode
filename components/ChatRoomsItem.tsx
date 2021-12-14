import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {chatRoom} from '../screens/ChatroomsScreen';

Ionicons.loadFont();

type iprops = {
  id: string;
  title: string;
  description: string;
};

export const ChatRoomsItem: React.FC<chatRoom> = ({
  id,
  title,
  description,
}: iprops) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Chat room', {chatRoomId: id})}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
          <ListItem.Subtitle>{description}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
};
