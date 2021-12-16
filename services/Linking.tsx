const config = {
  screens: {
    'Chat rooms': {
      path: 'chatrooms',
    },
    'Chat room': {
      path: 'chatroom/:chatRoomId',
      parse: {
        chatRoomId: (chatRoomId: string) => `${chatRoomId}`,
      },
    },
  },
};

const linking = {
  prefixes: ['demo://app'],
  config,
};

export default linking;
