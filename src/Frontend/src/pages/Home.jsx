import Chat from '../components/Chat';
import History from '../components/History';

const Home = () => {
  return (
    <div className='flex h-screen text-white'>
      <History />
      <Chat />
    </div>
  );
};

export default Home;
