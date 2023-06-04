import {
  BoltIcon,
  ChartBarIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/solid';
import { Form } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactComponent as DaisyIcon } from '../assets/daisy-mask.svg';

const MotionForm = motion(Form);

function Index() {
  return (
    <motion.div className='flex flex-col items-start' layoutId='container'>
      <div className='w-full pb-10'>
        <section className='max-w-3xl w-full mx-auto py-40'>
          <div className='flex flex-col items-center w-full'>
            <motion.h2
              className='text-2xl text-black/70 font-bold font-display text-center leading-7'
              layoutId='subtitle'
            >
              엔트리 라이프를
              <br />
              200% 즐기는 방법
            </motion.h2>
            <motion.h1
              className='text-7xl font-bold font-display leading-none'
              layoutId='logo'
            >
              dut.life
            </motion.h1>
            <MotionForm
              className='max-w-2xl w-full mx-auto px-4 lg:px-6 mt-6'
              action='/search'
              layoutId='searchForm'
            >
              <input
                className='bg-gray-100 text-lg font-normal outline-none px-5 py-3 rounded-2xl flex w-full'
                name='q'
                placeholder='유저, 작품, 커뮤니티, 스티커, 또는 스크립트 검색'
              />
            </MotionForm>
          </div>
        </section>
        <section className='max-w-5xl lg:max-w-2xl mx-auto'>
          <div className='grid grid-cols-4 lg:grid-cols-2 xs:grid-cols-1 gap-4 px-4 lg:px-6'>
            <motion.div className='bg-emerald-50 rounded-3xl' layoutId='card-1'>
              <div className='flex items-center justify-between p-[30px]'>
                <h3 className='text-lg sm:text-[17px] font-semibold leading-5'>
                  한 눈에 보는
                  <br />
                  유저 프로필과 통계
                </h3>
                <ChartBarIcon className='w-7 h-7 fill-emerald-600' />
              </div>
            </motion.div>
            <motion.div className='bg-blue-50 rounded-3xl' layoutId='card-2'>
              <div className='flex items-center justify-between p-[30px]'>
                <h3 className='text-lg sm:text-[17px] font-semibold leading-5'>
                  실시간으로 보는
                  <br />
                  엔트리 커뮤니티
                </h3>
                <ChatBubbleLeftIcon className='w-7 h-7 fill-blue-600' />
              </div>
            </motion.div>
            <motion.div className='bg-violet-50 rounded-3xl' layoutId='card-3'>
              <div className='flex items-center justify-between p-[30px]'>
                <h3 className='text-lg sm:text-[17px] font-semibold leading-5'>
                  훨씬 빠른
                  <br />
                  작품 실행
                </h3>
                <BoltIcon className='w-7 h-7 fill-violet-600' />
              </div>
            </motion.div>
            <motion.div className='bg-rose-50 rounded-3xl' layoutId='card-4'>
              <div className='flex items-center justify-between p-[30px]'>
                <h3 className='text-lg sm:text-[17px] font-semibold leading-5'>
                  엔트리가 편리해지는
                  <br />
                  확장 프로그램
                </h3>
                <DaisyIcon className='w-7 h-7 fill-rose-600' />
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default Index;
