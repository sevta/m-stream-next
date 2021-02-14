import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Search({ onSearchResult, isLoading, displayResult }) {
  const [value, setValue] = useState('');
  const [resultYoutube, setYoutubeResult] = useState([]);
  const [resultSpotify, setResultSpotify] = useState([]);
  const [mergeResult, setMergeResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // onSearchResult(merge);
  }, [resultYoutube]);

  useEffect(() => {
    console.log('merge', mergeResult);
    onSearchResult(mergeResult);
  }, [mergeResult]);

  useEffect(() => {
    isLoading(loading);
  }, [loading]);

  function handleInput(e) {
    setValue(e.target.value);
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const resp = await axios.get(
        `http://localhost:3000/api/search?q=${value}`
      );
      console.log(resp.data);
      setMergeResult([]);
      if (resp.data.result_spotify) {
        let result = resp.data.result_spotify;
        let newdata = [];
        result.map((track) => {
          newdata.push({
            id: track.id,
            title: track.name,
            author: track.artists[0].name,
            thumbnail: track.album.images[0].url,
            preview_url: track.preview_url,
            uri: track.uri,
            type: 'spotify',
          });
        });

        setResultSpotify(newdata);
        setMergeResult((prev) => [...prev, ...newdata]);
      }
      if (resp.data.result_youtube) {
        let result = resp.data.result_youtube.filter((v) => v.type == 'video');
        let newdata = [];
        result.map((track) => {
          newdata.push({
            id: track.id,
            title: track.title,
            author: track.author.name,
            thumbnail: track.thumbnails[0].url,
            preview_url: null,
            uri: track.url,
            type: 'youtube',
          });
        });
        setYoutubeResult(newdata);
        setMergeResult((prev) => [...prev, ...newdata]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-full'>
      <div className='w-full'>
        <input
          className='w-full border-2 border-black p-3 rounded '
          type='text'
          name='search'
          onInput={(e) => handleInput(e)}
          placeholder='search...'
          onKeyDown={(e) => e.key == 'Enter' && handleSubmit()}
        />
      </div>
      {mergeResult.length > 0 && displayResult ? (
        <div className='w-full p-3 bg-white divide-y h-60 overflow-y-scroll shadow-lg rounded-md'>
          {mergeResult.map((track, idx) => (
            <div className='flex items-center py-2 cursor-pointer'>
              <div className='w-10 h-10 rounded overflow-hidden'>
                <img
                  src={track.thumbnail}
                  alt='image'
                  className='bg-gray-400 w-full h-full object-cover object-center'
                />
              </div>
              <div className='flex flex-col ml-5 '>
                <div className='font-medium text-sm capitalize'>
                  {track.author}
                </div>
                <div className='text-xs text-gray-500'>{track.title}</div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export async function getServerSideProps() {
  console.log('server side');

  return {
    props: {
      username: 'tesi',
    },
  };
}
