import axios from 'axios';
import { useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

export default function Sidebar() {
  const { data } = useStoreState((state) => state.spotify);

  useEffect(() => {
    console.log('data from sidebar', data);
  }, [data]);

  async function loginWithSpotify() {
    try {
      const resp = await axios.get(`http://localhost:3000/api/spotify/login`);
      window.location = resp.data.authorizeURL;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='sidebar px-10 py-3 h-screen border-r'>
      <div>sidebar</div>
      {!data.id && (
        <div className='mt-10'>
          <button
            className='px-3 py-2 text-white text-sm bg-green-500 rounded-full font-medium'
            onClick={loginWithSpotify}>
            Connect spotify
          </button>
        </div>
      )}
    </div>
  );
}
