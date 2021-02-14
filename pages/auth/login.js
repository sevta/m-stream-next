import { useSession, signIn, signOut } from 'next-auth/client';
import { useEffect } from 'react';

export default function Login() {
  const [session, loading] = useSession();

  useEffect(() => {
    console.log('session', session);
  }, [session]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (session?.user?.provider !== 'spotify' && session == null) {
    return (
      <div className='flex flex-1 items-center justify-center flex-col'>
        <button
          className='py-3 px-6 rounded-full bg-gray-300 text-black font-medium'
          onClick={() => signIn('github')}>
          login with github
        </button>
        <button
          className='py-3 px-6 rounded-full bg-gray-300 text-black font-medium mt-4'
          onClick={signIn}>
          login with google
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <div>Welcome</div>
        <button onClick={signOut}>logout</button>
      </div>
    );
  }
}
