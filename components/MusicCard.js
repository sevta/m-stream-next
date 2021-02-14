import { useStoreActions } from 'easy-peasy';

export default function MusicCard({
  id,
  title,
  author,
  thumbnail,
  previewUrl,
  type,
}) {
  const addTrackToStore = useStoreActions((actions) => actions.track.setTrack);

  function handleTrackPlay() {
    addTrackToStore({
      id,
      title,
      author,
      thumbnail,
      previewUrl,
      type,
    });
  }

  return (
    <div
      className='bg-white cursor-pointer shadow rounded-md overflow-hidden'
      onClick={handleTrackPlay}>
      <div className='overflow-hidden'>
        <img src={thumbnail} alt='' />
      </div>
      <div className='p-3 '>
        <div className='font-medium'>{title}</div>
        <div className='text-sm text-gray-500 mt-2'>{author}</div>
      </div>
    </div>
  );
}
