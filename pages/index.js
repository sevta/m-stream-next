import { useEffect, useState } from 'react';
import MusicCard from '../components/MusicCard';
import Search from '../components/Search';

export default function Homepage() {
  const [youtube, setYoutube] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(youtube.filter((track) => track.type === 'video'));
  }, [youtube]);

  return (
    <div className='w-full px-5 py-3'>
      <Search
        onSearchResult={(data) => setYoutube(data)}
        isLoading={(loading) => setIsLoading(loading)}
      />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className='searchWrapper'>
          {youtube.length > 0 && (
            <React.Fragment>
              <div onClick={() => setYoutube([])}>clear</div>
              <div className='w-full grid grid-cols-6 gap-6 mt-5'>
                {youtube
                  .filter((v) => v.type == 'video')
                  .map((track, index) => (
                    <MusicCard
                      key={index}
                      id={track.id}
                      title={track.title}
                      thumbnail={track.thumbnails[0].url}
                      author={track.author.name}
                    />
                  ))}
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
}
