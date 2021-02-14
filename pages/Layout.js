import { useSession } from 'next-auth/client';
import { useEffect } from 'react';
import Backdrop from '../components/Backdrop';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';

export default function Layout({ children }) {
  const [session, loading] = useSession();

  useEffect(() => {
    console.log('session', session);
  }, [session]);

  return (
    <React.Fragment>
      <Backdrop />
      <div className='layoutWrapper w-full min-h-screen sm:h-screen relative sm:overflow-hidden '>
        <div className='flex sm:flex-row flex-col z-10'>
          <Sidebar />
          <div className='flex-1 h-screen overflow-y-scroll relative flex flex-col'>
            {children}
          </div>
        </div>
        <Player />
        <style jsx>
          {`
            @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
              .layoutWrapper {
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(15px);
                background-color: rgba(255, 255, 255, 0.8);
              }
            }
          `}
        </style>
      </div>
    </React.Fragment>
  );
}
