import { spotifyApi } from '../../utils/spotify';

const ytsr = require('ytsr');

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const { q } = req.query;
    try {
      const searchResultYoutube = await ytsr(q, { pages: 1 });
      const spotifytoken = spotifyApi.getAccessToken();

      if (spotifytoken) {
        // Do search using the access token
        const searchResultSpotify = await spotifyApi.searchTracks(q, {
          limit: 20,
          offset: 0,
        });
        console.log('the result', searchResultSpotify);
        res.json({
          result_youtube: searchResultYoutube.items,
          result_spotify: searchResultSpotify.body.tracks.items,
        });
      } else {
        res.json({
          result_youtube: searchResultYoutube.items,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
