import Chat from '../components/Chat';
import History from '../components/History';

const Home = () => {
  return (
    <div className='flex h-full max-h-[1080px]'>
      <History />
      <Chat />
    </div>
  );
};

export default Home;
