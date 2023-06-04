import { useEffect, useMemo } from 'react';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
  ArrowTopRightOnSquareIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid';
import { trpc } from '../utils/trpc';
import { FADE_DOWN_ANIMATION_VARIANTS } from '../utils/constants';
import Card from '../components/user/Card';
import Timeline, { EventType } from '../components/user/Timeline';

function getRole(code: string) {
  switch (code) {
    case 'student':
      return '학생';
    case 'member':
      return '일반';
    case 'teacher':
      return '선생님';
    case 'admin':
      return '운영자';
    default:
      return code;
  }
}

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const MAX_PROJECT_RANK = 12;
const VIEW_WEIGHT = 0.02;
const LIKE_WEIGHT = 1;
const COMMENT_WEIGHT = 1.1;
const REMAKE_WEIGHT = 5;

function User() {
  const { state } = useLocation();
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const controls = useAnimationControls();

  const userInfoQuery = trpc.userInfo.useQuery({ username });
  const user:
    | {
        username: string;
        id: string;
        nickname: string;
        description: string;
        profileImage?: string | undefined;
        coverImage?: string | undefined;
        role: string;
        joined: string;
        followers: number;
        followings: number;
        badges: {
          image: string;
          label: string;
        }[];
        privateProjects: number;
        projects: {
          id: string;
          name: string;
          thumb?: string;
          category: string;
          updated: string;
          staffPicked: string;
          ranked: string;
          views: number;
          likes: number;
          comments: number;
          remakes: number;
        }[];
      }
    | undefined = userInfoQuery.data ?? state?.userInfo;
  const joinedDate = user ? new Date(user.joined) : new Date();
  const projectRank = useMemo(() => {
    if (!userInfoQuery.data) return [];

    const data = userInfoQuery.data.projects
      .map((p) => ({
        name: p.name,
        amount: Math.ceil(
          p.views * VIEW_WEIGHT +
            p.likes * LIKE_WEIGHT +
            p.comments * COMMENT_WEIGHT +
            p.remakes * REMAKE_WEIGHT,
        ),
      }))
      .sort((a, b) => b.amount - a.amount);

    const tmp: { name: string; amount: number }[] = [];

    if (data.length > MAX_PROJECT_RANK) {
      const etc = data
        .slice(MAX_PROJECT_RANK - 1)
        .reduce((prev, curr) => prev + curr.amount, 0);
      const etcItem = { name: '기타', amount: etc };

      tmp.push(
        ...data
          .slice(0, MAX_PROJECT_RANK - 1)
          .map((p) => ({ name: p.name, amount: p.amount })),
        etcItem,
      );
    } else tmp.push(...data.map((p) => ({ name: p.name, amount: p.amount })));

    return tmp;
  }, [userInfoQuery.data]);
  const projectRankSum = useMemo(
    () => projectRank.reduce((prev, curr) => prev + curr.amount, 0),
    [projectRank],
  );

  useEffect(() => {
    if (!userInfoQuery.data) return;
    if (state?.userInfo) {
      window.history.replaceState({}, document.title);
      return;
    }

    controls.start('show');
  }, [userInfoQuery.data, state]);

  return (
    <motion.div className='flex flex-col items-start' layoutId='container'>
      <motion.div
        className='flex flex-col w-full gap-y-7 pb-10'
        initial={state?.userInfo ? 'show' : 'hidden'}
        animate={controls}
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.section
          className='flex flex-col w-full h-max'
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <motion.div
            className='w-full h-44 bg-center bg-[auto_105%] bg-[#16d8a3] brightness-75'
            style={{
              backgroundImage: `url(${user?.coverImage})`,
            }}
            layoutId={`user_${username}_coverImage`}
          />
          <div className='flex flex-col w-full max-w-4xl h-max mx-auto pb-3'>
            <div className='relative mb-6'>
              <motion.img
                src={
                  user?.profileImage ??
                  'https://playentry.org/img/DefaultCardUserThmb.svg'
                }
                alt={`${user?.nickname}의 프로필 사진`}
                className='w-24 h-24 rounded-full absolute -top-16 outline outline-4 outline-zinc-50 object-cover'
                height={96}
                width={96}
                layoutId={`user_${username}_profileImage`}
              />
            </div>
            <div className='relative px-6'>
              <motion.div
                className='flex justify-end gap-x-2 absolute -top-6 right-0'
                layoutId={`user_${username}_badges`}
              >
                {user?.badges.map((badge) => (
                  <div className='w-[36px] aspect-[68/116]' key={badge.image}>
                    <img
                      src={badge.image}
                      alt={badge.label}
                      key={badge.image}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div
              className='flex gap-1.5 mt-4'
              layoutId={`user_${username}_tags`}
            >
              <div
                className={`flex ${
                  user
                    ? user.role === 'member'
                      ? 'bg-blue-100/60 text-blue-600'
                      : user.role === 'teacher'
                      ? 'bg-emerald-100/60 text-emerald-600'
                      : user.role === 'admin'
                      ? 'bg-violet-100/60 text-violet-600'
                      : 'bg-amber-100/60 text-amber-600'
                    : ''
                } text-[15px] font-medium px-3 py-px w-max rounded-full`}
              >
                {user && getRole(user.role)}
              </div>
              <div className='flex bg-zinc-100/70 text-zinc-600 text-[15px] font-medium px-3 py-px w-max rounded-full'>
                dut.life 비회원
              </div>
            </motion.div>
            <motion.h3
              className='flex items-baseline mt-1'
              layoutId={`user_${username}_name`}
            >
              <span className='text-3xl font-bold'>{user?.nickname}</span>
              <span className='text-2xl text-zinc-500 font-medium ml-2'>
                @{user?.username}
              </span>
              <a
                href={`https://playentry.org/profile/${user?.id}`}
                target='_blank'
                rel='noreferrer'
                className='flex self-stretch items-center bg-blue-50 text-blue-600 font-medium mt-p ml-auto px-3 rounded-lg shadow shadow-blue-100'
              >
                <ArrowTopRightOnSquareIcon className='w-5 h-5 mr-1' />
                <span className='whitespace-nowrap'>마이페이지</span>
              </a>
            </motion.h3>
            <motion.div
              className='flex gap-x-2'
              layoutId={`user_${username}_follows`}
            >
              <span>
                <span className='text-zinc-500 text-[17px]'>팔로잉&nbsp;</span>
                <span className='text-blue-500 text-[17px] font-medium'>
                  {user?.followings}
                </span>
              </span>
              <span>
                <span className='text-zinc-500 text-[17px]'>팔로워&nbsp;</span>
                <span className='text-blue-500 text-[17px] font-medium'>
                  {user?.followers}
                </span>
              </span>
            </motion.div>
            <motion.div
              className='text-lg mt-1'
              layoutId={`user_${username}_description`}
            >
              {user?.description}
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          className='flex flex-col w-full max-w-4xl h-max mx-auto'
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <h2 className='flex items-center text-2xl font-bold mb-2'>정보</h2>
          <div className='grid grid-cols-5 gap-3'>
            <Card
              label='전체 작품'
              amount={user ? user.projects.length + user.privateProjects : 0}
            />
            <Card
              label='인기 작품'
              amount={
                user?.projects.filter((project) => project.ranked).length ?? 0
              }
            />
            <Card
              label='스태프 선정 작품'
              amount={
                user?.projects.filter((project) => project.staffPicked)
                  .length ?? 0
              }
            />
            <Card label='비공개 작품' amount={user?.privateProjects ?? 0} />
            <Card label='dut.life 순위' amount={'-'} />
            <Card
              label='총 조회수'
              amount={
                user?.projects.reduce(
                  (prev, curr) => (prev += curr.views),
                  0,
                ) ?? 0
              }
            />
            <Card
              label='총 좋아요 수'
              amount={
                user?.projects.reduce(
                  (prev, curr) => (prev += curr.likes),
                  0,
                ) ?? 0
              }
            />
            <Card
              label='총 댓글 수'
              amount={
                user?.projects.reduce(
                  (prev, curr) => (prev += curr.comments),
                  0,
                ) ?? 0
              }
            />
            <Card
              label='총 리메이크 수'
              amount={
                user?.projects.reduce(
                  (prev, curr) => (prev += curr.remakes),
                  0,
                ) ?? 0
              }
            />
            <Card label='가입' amount={joinedDate.getFullYear().toString()} />
          </div>
        </motion.section>
        <div className='flex w-full max-w-4xl mx-auto'>
          <motion.section
            className='flex flex-col w-full mx-auto'
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <h2 className='flex items-center text-2xl font-bold mb-2'>
              인기도
              <div className='group'>
                <InformationCircleIcon className='h-5 w-5 text-zinc-400 ml-0.5' />
                <div className='relative invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100 transition-all duration-300'>
                  <div className='absolute w-max bg-white border border-zinc-100 shadow text-sm font-normal px-2 py-1 rounded-r-lg rounded-b-lg left-6 -top-3 max-w-[15rem]'>
                    인기도는 조회수, 좋아요, 댓글, 리메이크에 각각{' '}
                    <span className='[font-feature-settings:_"tnum",_"zero"]'>
                      0.02
                    </span>
                    ,{' '}
                    <span className='[font-feature-settings:_"tnum",_"zero"]'>
                      1
                    </span>
                    ,{' '}
                    <span className='[font-feature-settings:_"tnum",_"zero"]'>
                      1.1
                    </span>
                    ,{' '}
                    <span className='[font-feature-settings:_"tnum",_"zero"]'>
                      5
                    </span>
                    의 가중치를 곱해 더한 값입니다.
                  </div>
                </div>
              </div>
            </h2>
            <Doughnut
              data={{
                labels: projectRank.map((p) => p.name),
                datasets: [
                  {
                    data: projectRank.map((p) => p.amount),
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      font: { family: 'Pretendard Variable', size: 12 },
                    },
                  },
                  datalabels: {
                    font: { family: 'Pretendard Variable', size: 14 },
                  },
                  tooltip: {
                    titleFont: {
                      family: 'Pretendard Variable',
                      size: 13,
                      weight: '500',
                    },
                    bodyFont: { family: 'Pretendard Variable', size: 12 },
                    callbacks: {
                      label: (item) =>
                        `${item.parsed} (${(
                          (item.parsed / projectRankSum) *
                          100
                        ).toFixed(2)}%)`,
                    },
                  },
                },
              }}
            />
          </motion.section>
          <motion.section
            className='flex flex-col w-full mx-auto'
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <h2 className='text-2xl font-bold mb-2'>활동</h2>
            <div className='bg-zinc-50 rounded-2xl shadow basis-0 [flex-grow:_1] py-3'>
              <Scrollbars
                renderThumbVertical={(props) => (
                  <div
                    {...props}
                    className='bg-zinc-300 rounded-full relative right-2.5'
                    style={{ width: 8 }}
                  />
                )}
              >
                <div className='px-5 py-3'>
                  <Timeline
                    events={
                      userInfoQuery.data
                        ? [
                            {
                              type: EventType.JOINED_ENTRY,
                              date: userInfoQuery.data.joined,
                              args: [userInfoQuery.data.username],
                            },
                            ...userInfoQuery.data.projects.map((p) => ({
                              type: EventType.CREATED_PROJECT,
                              date: p.created,
                              args: [p.name],
                            })),
                            ...userInfoQuery.data.projects
                              .filter((p) => p.ranked)
                              .map((p) => ({
                                type: EventType.PROJECT_RANKED,
                                date: p.ranked,
                                args: [p.name],
                              })),
                            ...userInfoQuery.data.projects
                              .filter((p) => p.staffPicked)
                              .map((p) => ({
                                type: EventType.PROJECT_STAFF_PICKED,
                                date: p.staffPicked,
                                args: [p.name],
                              })),
                          ].sort(
                            (a, b) =>
                              new Date(b.date ?? 0).valueOf() -
                              new Date(a.date ?? 0).valueOf(),
                          )
                        : []
                    }
                  />
                </div>
              </Scrollbars>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default User;
