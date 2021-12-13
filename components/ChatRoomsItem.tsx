import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont();

type chatRoom = {
  title: string;
  description: string;
};

export const ChatRoomsItem: React.FC<chatRoom> = ({item}: chatRoom) => {
  return (
    <TouchableOpacity>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
};
