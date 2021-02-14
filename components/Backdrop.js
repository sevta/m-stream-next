import { useStoreState } from 'easy-peasy';

export default function Backdrop() {
  const { data } = useStoreState((state) => state.track);

  return (
    <div className='fixed w-full h-screen top-0 left-0'>
      <img
        className='w-full h-full object-cover object-center'
        src={data?.thumbnail}
        alt=''
      />
    </div>
  );
}
