export const SpotifyWebApi = require('spotify-web-api-node');

const scopes = ['user-read-private', 'user-read-email'];

export const spotifyApi = new SpotifyWebApi({
  clientId: 'cb168bf117a6402d976ab1cc13e21d64',
  clientSecret: '0c4e260fbfbd43889548e804f9b94337',
  redirectUri: 'http://localhost:3000/api/spotify/callback',
});
