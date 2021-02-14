import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';

export default function Layout({ children }) {
  const [session, loading] = useSession();

  useEffect(() => {
    console.log('session', session);
  }, [session]);

  return (
    <div className='wrapper w-full h-screen relative bg-gray-100'>
      <div className='flex'>
        <Sidebar />
        <div className='flex-1 overflow-y-scroll relative flex flex-col'>
          {children}
        </div>
      </div>
      <Player />
    </div>
  );
}
