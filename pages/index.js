import { useState } from 'react';
import MusicCard from '../components/MusicCard';
import Search from '../components/Search';
import { dynamicSort } from '../helper';

const Homepage = () => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [displayType, setDisplayType] = useState('list');

  return (
    <div className='w-full px-5 pt-3 pb-16'>
      <Search
        onSearchResult={(data) => setResult(data)}
        isLoading={(loading) => setIsLoading(loading)}
        displayResult={false}
      />
      {isLoading ? (
        <div>loading...</div>
      ) : (
        <div className='searchWrapper'>
          {result.length > 0 && (
            <React.Fragment>
              <div onClick={() => setResult([])}>clear</div>
              {displayType}
              <select
                value={displayType}
                onChange={(e) => setDisplayType(e.target.value)}>
                <option value='grid'>grid</option>
                <option value='list'>list</option>
              </select>
              <div
                className={`w-full grid ${
                  displayType == 'list' ? 'grid-cols-1' : 'grid-cols-5 gap-5'
                } mt-5`}>
                {result.sort(dynamicSort('author')).map((track, index) => (
                  <MusicCard
                    key={index}
                    id={track.id}
                    title={track.title}
                    thumbnail={track.thumbnail}
                    author={track.author}
                    previewUrl={track.preview_url}
                    type={track.type}
                    cardType={displayType}
                  />
                ))}
              </div>
            </React.Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  console.log('server side props!');

  return {
    props: {
      username: 'tesi',
    },
  };
}

export default Homepage;
