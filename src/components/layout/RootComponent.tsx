import {
  Link,
  useLocation,
  useOutlet,
  useSearchParams,
} from 'react-router-dom';
import Nav from '../common/Nav';

function RootComponent() {
  const outlet = useOutlet();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const query = searchParams.get('q') ?? undefined;

  return (
    <div className='flex flex-col min-h-screen'>
      <Nav query={query} mainPage={pathname === '/'} />
      <div className='flex-1'>{outlet}</div>
      <footer className='flex flex-col items-center justify-center bg-zinc-100 py-8'>
        <div className='flex max-w-5xl w-full'>
          <div className='w-full mr-auto mt-2'>
            <Link
              to='/'
              className='block text-2xl text-zinc-500 font-bold font-display leading-none'
            >
              dut.life
            </Link>
            <div className='text-zinc-400 text-xs font-medium leading-3'>
              © 2023
            </div>
          </div>
          <div className='w-full'>
            <h3 className='text-zinc-400'>서비스</h3>
            <ul className='text-zinc-500 leading-6 mt-1'>
              <li>
                <Link to='/'>검색</Link>
              </li>
              <li>
                <Link to='/community'>실시간 커뮤니티</Link>
              </li>
              <li>
                <Link to='/dutscript'>작품 실행</Link>
              </li>
              <li>
                <Link to='/daisy'>Daisy</Link>
              </li>
            </ul>
          </div>
          <div className='w-full'>
            <h3 className='text-zinc-400'>문의</h3>
            <ul className='text-zinc-500 leading-6 mt-1'>
              <li>
                <a href='mailto:tica@dut.life'>tica@dut.life</a>
              </li>
              <li>
                <a href='mailto:me@tica.fun'>me@tica.fun</a>
              </li>
            </ul>
          </div>
          <div className='w-full'>
            <h3 className='text-zinc-400'>외부 링크</h3>
            <ul className='text-zinc-500 leading-6 mt-1'>
              <li>
                <a
                  href='https://github.com/thoratica/dutlife'
                  target='_blank'
                  rel='noreferrer'
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href='https://playentry.org/profile/647214e1fad7ba001a0fe67e'
                  target='_blank'
                  rel='noreferrer'
                >
                  엔트리
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RootComponent;
