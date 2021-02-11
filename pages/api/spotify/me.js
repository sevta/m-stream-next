import { spotifyApi } from '../../../utils/spotify';

export default async function handler(req, res) {
  if (req.method == 'GET') {
    try {
      let data = await spotifyApi.getMe();
      res.json(data);
    } catch (error) {
      res.json(error);
    }
  }
}
