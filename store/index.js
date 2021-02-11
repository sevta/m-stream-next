import { action, createStore } from 'easy-peasy';

export const store = createStore({
  user: {
    data: {
      username: 'blah',
    },
    setUser: action((state, payload) => {
      state.data.username = payload;
    }),
  },
  track: {
    data: {
      id: '',
      title: '',
      author: '',
      thumbnail: '',
    },
    setTrack: action((state, payload) => {
      state.data = { ...payload };
    }),
  },
  spotify: {
    data: {
      id: '',
      displayName: '',
    },
    setUser: action((state, payload) => {
      state.data = { ...payload };
    }),
  },
});
