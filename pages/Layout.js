import Player from '../components/Player';

export default function Layout({ children }) {
  return (
    <div className='wrapper w-full min-h-screen relative bg-gray-100'>
      <div>{children}</div>
      <Player />
    </div>
  );
}
