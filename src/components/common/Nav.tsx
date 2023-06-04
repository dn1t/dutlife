import { Form, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useScrollListener } from '../../utils/useScrollListener';
import { useState } from 'react';

const MotionLink = motion(Link);
const MotionForm = motion(Form);

function Nav({
  mainPage = false,
  query,
}: { mainPage?: boolean; query?: string }) {
  const [onTop, setOnTop] = useState(true);

  useScrollListener(() => {
    if (window.scrollY < 5) {
      setOnTop(true);
    } else if (window.scrollY >= 5) {
      setOnTop(false);
    }
  }, [onTop]);

  return (
    <nav
      className={`w-full h-[72px] bg-white/70 backdrop-blur-xl sticky top-0 z-[997] ${
        !onTop ? 'shadow' : ''
      }`}
    >
      <section className='max-w-5xl h-full mx-auto flex items-center'>
        {!mainPage && (
          <MotionLink
            to='/'
            className='block text-2xl font-bold font-display leading-none'
            layoutId='logo'
          >
            dut.life
          </MotionLink>
        )}
        {!mainPage && (
          <MotionForm
            className='max-w-2xl w-full ml-12'
            action='/search'
            layoutId='searchForm'
          >
            <input
              className='bg-gray-200/40 text-md font-normal outline-none px-4 py-2.5 rounded-xl flex w-full'
              name='q'
              placeholder='유저, 작품, 또는 커뮤니티 글 검색'
              defaultValue={query}
            />
          </MotionForm>
        )}
      </section>
    </nav>
  );
}

export default Nav;
