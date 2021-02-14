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

  if (!session) {
    return (
      <div>
        <div>Login</div>
        <button
          className='py-3 px-6 rounded-full bg-green-500 text-white'
          onClick={signIn}>
          login with spotify
        </button>
      </div>
    );
  }

  return (
    <div>
      <div>Welcome</div>
      <button onClick={signOut}>logout</button>
    </div>
  );
}
