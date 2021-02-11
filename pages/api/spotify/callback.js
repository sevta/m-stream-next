import { spotifyApi } from '../../../utils/spotify';

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const { code } = req.query;
    try {
      const data = await spotifyApi.authorizationCodeGrant(code);
      const { access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      res.redirect('http://localhost:3000/');
    } catch (error) {
      res.redirect('/#/error/invalid token');
    }
  }
}
