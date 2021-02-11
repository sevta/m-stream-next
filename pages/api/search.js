const ytsr = require('ytsr');

export default async function handler(req, res) {
  if (req.method == 'GET') {
    const { q } = req.query;
    const searchResultYoutube = await ytsr(q, { pages: 1 });
    res.json({
      result_youtube: searchResultYoutube.items,
    });
  }
}
