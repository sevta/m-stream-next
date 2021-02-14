import { useStoreActions } from 'easy-peasy';

export default function MusicCard({
  id,
  title,
  author,
  thumbnail,
  previewUrl,
  type,
  cardType,
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

  if (cardType == 'list') {
    return (
      <div
        className='flex items-center py-2 cursor-pointer'
        onClick={handleTrackPlay}>
        <div className='w-14 h-14 rounded overflow-hidden'>
          <img
            src={thumbnail}
            alt='image'
            className='bg-gray-400 w-full h-full object-cover object-center'
          />
        </div>
        <div className='flex flex-col ml-5 '>
          <div className='font-medium text-base capitalize'>{author}</div>
          <div className='text-sm text-gray-500'>{title}</div>
          <div
            className={`text-xs p-1 flex ${
              type == 'youtube' && 'text-red-500 '
            } ${type == 'spotify' && 'text-green-500 '}`}>
            {type}
          </div>
        </div>
        <div className='flex items-center justify-end flex-1'>3:03</div>
      </div>
    );
  } else {
    return (
      <div
        className=' cursor-pointer  rounded-md overflow-hidden'
        onClick={handleTrackPlay}>
        <div className='overflow-hidden w-full h-52'>
          <img
            className='w-full h-full object-center object-cover'
            src={thumbnail}
            alt=''
          />
        </div>
        <div className='p-3 '>
          <div className='font-medium'>{title}</div>
          <div className='text-sm text-gray-500 mt-2'>{author}</div>
        </div>
      </div>
    );
  }
}
