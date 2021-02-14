import { useStoreState } from 'easy-peasy';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const { data } = useStoreState((state) => state.spotify);
  const [session, loading] = useSession();

  useEffect(() => {
    console.log('data from sidebar', session);
  }, [session]);

  return (
    <div className='sidebar px-10 py-3 h-screen border-r'>
      <div>sidebar</div>
      <Link href='auth/login'>Login</Link>
      {!data.id && (
        <div className='mt-10'>
          {session?.user?.provider == 'spotify' ? (
            <button onClick={signOut}>logout</button>
          ) : (
            <button
              className='px-3 py-2 text-white text-sm bg-green-500 rounded-full font-medium'
              onClick={() => signIn('spotify')}>
              Connect spotify
            </button>
          )}
        </div>
      )}
    </div>
  );
}
