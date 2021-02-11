// const SpotifyWebApi = require('spotify-web-api-node');

import { spotifyApi } from '../../../utils/spotify';

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const scopes = ['user-read-private', 'user-read-email'];
    const authorizeURL = spotifyApi.createAuthorizeURL(scopes);

    res.json({
      authorizeURL: authorizeURL + '&show_dialog=true',
    });
  }
}
