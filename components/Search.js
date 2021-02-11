import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Search({ onSearchResult, isLoading }) {
  const [value, setValue] = useState('');
  const [resultYoutube, setYoutubeResult] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSearchResult(resultYoutube);
  }, [resultYoutube]);

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
      setYoutubeResult(resp.data.result_youtube);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
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
  );
}
