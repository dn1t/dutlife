import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';
import { trpc } from '../utils/trpc';
import { FADE_DOWN_ANIMATION_VARIANTS } from '../utils/constants';

function getCategory(code: string) {
  switch (code) {
    case 'free':
      return '엔트리 이야기';
    case 'qna':
      return '묻고 답하기';
    case 'tips':
      return '노하우 & 팁';
    case 'suggestion':
      return '제안 및 건의';
    case 'report':
      return '(구) 제안 및 건의';
    case 'notice':
      return '공지사항';
    default:
      return code;
  }
}

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? undefined;
  const controls = useAnimationControls();

  const searchQuery = trpc.search.useQuery({ query, display: 6 });

  useEffect(() => {
    if (!searchQuery.data) return;

    controls.start('show');
  }, [searchQuery.data]);

  return (
    <motion.div className='max-w-3xl mx-auto flex flex-col items-start'>
      <motion.h2
        className='mb-4 text-lg text-black/70 text-center font-medium font-display leading-8'
        layoutId='subtitle'
      >
        "{query}"에 대한 검색 결과
      </motion.h2>
      <motion.div
        className='flex flex-col w-full gap-y-7 pb-10'
        initial='hidden'
        animate={controls}
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.section variants={FADE_DOWN_ANIMATION_VARIANTS}>
          {searchQuery.data?.users && searchQuery.data.users.length > 0 && (
            <>
              <h2 className='text-2xl font-bold mb-2'>유저</h2>
              <ul className='flex flex-col gap-y-3'>
                {searchQuery.data.users.map((user) => (
                  <li key={user.id}>
                    <Link
                      to={`/user/${user.username}`}
                      state={{ userInfo: user }}
                      className='flex flex-col w-full h-max rounded-xl shadow'
                    >
                      <div className='rounded-xl overflow-hidden'>
                        <motion.div
                          className='w-full h-28 bg-center bg-[auto_105%] bg-[#16d8a3] brightness-75'
                          style={{
                            backgroundImage: `url(${user.coverImage})`,
                          }}
                          layoutId={`user_${user.username}_coverImage`}
                        />
                        <div className='flex flex-col w-full h-max bg-zinc-50 px-6 pb-3 shadow'>
                          <div className='relative mb-6'>
                            <motion.img
                              src={
                                user.profileImage ??
                                'https://playentry.org/img/DefaultCardUserThmb.svg'
                              }
                              alt={`${user.nickname}의 프로필 사진`}
                              className='w-[72px] h-[72px] rounded-full absolute -top-12 outline outline-4 outline-zinc-50 object-cover'
                              layoutId={`user_${user.username}_profileImage`}
                            />
                          </div>
                          <div className='relative px-6'>
                            <motion.div
                              className='flex justify-end gap-x-2 absolute -top-6 right-0'
                              layoutId={`user_${user.username}_badges`}
                            >
                              {user.badges.map((badge) => (
                                <div
                                  className='w-[30px] aspect-[68/116]'
                                  key={badge.image}
                                >
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
                            className='w-0'
                            layoutId={`user_${user.username}_tags`}
                          />
                          <motion.h3
                            className='flex items-baseline mt-1.5'
                            layoutId={`user_${user.username}_name`}
                          >
                            <span className='text-2xl font-bold'>
                              {user.nickname}
                            </span>
                            <span className='text-xl text-zinc-500 font-medium ml-1.5'>
                              @{user.username}
                            </span>
                          </motion.h3>
                          <motion.div
                            className='flex gap-x-2'
                            layoutId={`user_${user.username}_follows`}
                          >
                            <span>
                              <span className='text-zinc-500'>
                                팔로잉&nbsp;
                              </span>
                              <span className='text-blue-500 font-medium'>
                                {user.followings}
                              </span>
                            </span>
                            <span>
                              <span className='text-zinc-500'>
                                팔로워&nbsp;
                              </span>
                              <span className='text-blue-500 font-medium'>
                                {user.followers}
                              </span>
                            </span>
                          </motion.div>
                          <motion.div
                            className='mt-1'
                            layoutId={`user_${user.username}_description`}
                          >
                            {user.description}
                          </motion.div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.section>
        <motion.section variants={FADE_DOWN_ANIMATION_VARIANTS}>
          {searchQuery.data?.projects?.list &&
            searchQuery.data.projects.list.length > 0 && (
              <>
                <h2 className='text-2xl font-bold mb-2'>작품</h2>
                <ul className='grid grid-cols-3 gap-3'>
                  {searchQuery.data.projects.list.map((project) => (
                    <li key={project.id}>
                      <Link
                        to={`/project/${project.id}`}
                        className='flex flex-col w-full h-max rounded-xl shadow'
                      >
                        <div className='rounded-xl overflow-hidden'>
                          <div
                            className='w-full aspect-video bg-center bg-cover'
                            style={{
                              backgroundImage: `url(${
                                project.thumb ??
                                'https://playentry.org/img/DefaultCardThmb.svg'
                              })`,
                            }}
                          />
                          <div className='flex flex-col w-full h-max bg-zinc-50 px-3 pb-1.5 shadow'>
                            <div className='flex items-center gap-x-1.5 mt-2 pt-1.5 pb-2'>
                              <img
                                src={
                                  project.user.profileImage ??
                                  'https://playentry.org/img/DefaultCardUserThmb.svg'
                                }
                                alt={`${project.user.nickname}의 프로필 사진`}
                                className='w-6 h-6 rounded-full object-cover'
                              />
                              <span className='font-semibold leading-3 mt-px'>
                                {project.user.nickname}
                              </span>
                            </div>
                            <div className='relative px-6'>
                              <div className='flex justify-end gap-x-2 absolute -top-6 right-0'>
                                {/* {project.badges.map((badge) => (
                                  <div className='w-[30px] aspect-[68/116]'>
                                    <img
                                      src={badge.image}
                                      alt={badge.label}
                                      key={badge.image}
                                    />
                                  </div>
                                ))} */}
                              </div>
                            </div>
                            <h3 className='flex items-baseline px-0.5'>
                              <span className='text-lg font-bold line-clamp-1'>
                                {project.name}
                              </span>
                            </h3>
                            <div className='flex justify-between gap-x-2 mt-2 px-1 pt-2.5 border-t border-t-zinc-200/70'>
                              <span className='flex items-center justify-center w-full gap-x-1'>
                                <span className='text-zinc-500'>
                                  <div className='flex items-center justify-center w-4 h-4'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='19'
                                      height='12'
                                      viewBox='0 0 19 12'
                                    >
                                      <title>조회</title>
                                      <path
                                        fill='#979797'
                                        fillRule='evenodd'
                                        stroke='#979797'
                                        d='M9.444.5c3.74 0 6.688 1.849 8.966 5.497-2.277 3.652-5.22 5.503-8.854 5.503-3.74 0-6.688-1.849-8.966-5.497C2.867 2.351 5.81.5 9.444.5zM9.5.833c-1.365 0-2.602.58-3.497 1.523-.886.932-1.436 2.22-1.436 3.644s.55 2.712 1.436 3.644c.895.942 2.132 1.523 3.497 1.523 1.365 0 2.602-.58 3.497-1.523.886-.932 1.436-2.22 1.436-3.644s-.55-2.712-1.436-3.644C12.102 1.414 10.865.833 9.5.833zm0 3.334c.471 0 .897.203 1.205.527.317.335.512.797.512 1.306 0 .51-.195.971-.512 1.306-.308.324-.734.527-1.205.527-.471 0-.897-.203-1.205-.527-.317-.335-.512-.797-.512-1.306 0-.51.195-.971.512-1.306.308-.324.734-.527 1.205-.527z'
                                      />
                                    </svg>
                                  </div>
                                </span>
                                <span className='text-zinc-500 text-sm font-medium'>
                                  {project.views}
                                </span>
                              </span>
                              <span className='flex items-center justify-center w-full gap-x-1'>
                                <span className='text-zinc-500'>
                                  <div className='flex items-center justify-center w-4 h-4'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='14'
                                      height='12'
                                      viewBox='0 0 14 12'
                                    >
                                      <title>좋아요</title>
                                      <path
                                        fill='#979797'
                                        fillRule='evenodd'
                                        stroke='#979797'
                                        d='M10.105.5c-.825 0-1.616.329-2.198.914l-1.05 1.053-1.05-1.053C5.2.805 4.405.5 3.61.5c-.795 0-1.59.305-2.198.914C.804 2.024.5 2.822.5 3.62c0 .8.304 1.598.911 2.208l.696.697 4.75 4.766 4.75-4.766.696-.697c.583-.586.911-1.38.911-2.208 0-.828-.328-1.622-.911-2.207C11.72.829 10.929.5 10.105.5z'
                                      />
                                    </svg>
                                  </div>
                                </span>
                                <span className='text-zinc-500 text-sm font-medium'>
                                  {project.likes}
                                </span>
                              </span>
                              <span className='flex items-center justify-center w-full gap-x-1'>
                                <span className='text-zinc-500'>
                                  <div className='flex items-center justify-center w-4 h-4'>
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      width='11'
                                      height='12'
                                      viewBox='0 0 11 12'
                                    >
                                      <title>댓글</title>
                                      <path
                                        fill='#979797'
                                        fillRule='evenodd'
                                        stroke='#979797'
                                        d='M5.5.5c-1.379 0-2.626.58-3.53 1.514C1.061 2.955.5 4.255.5 5.691c0 1.448.57 2.758 1.494 3.7l.007 1.607 1.139-.73c.702.391 1.506.613 2.36.613 1.379 0 2.626-.58 3.53-1.514.909-.94 1.47-2.241 1.47-3.676 0-1.436-.561-2.736-1.47-3.677C8.126 1.08 6.879.5 5.5.5z'
                                      />
                                    </svg>
                                  </div>
                                </span>
                                <span className='text-zinc-500 text-sm font-medium'>
                                  {project.comments}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/project/search?q=${query}`}
                  className='flex justify-center w-1/4 text-lg text-blue-600 font-semibold mx-auto mt-6 py-1.5 bg-blue-50 shadow shadow-blue-100 rounded-xl'
                >
                  더보기
                </Link>
              </>
            )}
        </motion.section>
        <motion.section variants={FADE_DOWN_ANIMATION_VARIANTS}>
          {searchQuery.data?.discuss?.list &&
            searchQuery.data.discuss.list.length > 0 && (
              <>
                <h2 className='text-2xl font-bold mb-2'>커뮤니티</h2>
                <ul className='grid gap-3'>
                  {searchQuery.data.discuss.list.map((discuss) => (
                    <li key={discuss.id}>
                      <Link
                        to={`/discuss/${discuss.id}`}
                        className='flex flex-col w-full h-max rounded-xl shadow'
                      >
                        <div className='rounded-xl overflow-hidden'>
                          <div className='flex flex-col w-full h-max bg-zinc-50 px-3.5 pb-1 shadow'>
                            <h3 className='flex items-baseline'>
                              <div className='flex flex-col my-0.5 pt-3'>
                                <span className='text-blue-500 text-[15px] font-semibold leading-4 tracking-tighter'>
                                  {getCategory(discuss.category)}
                                </span>
                                <span className='text-lg font-bold line-clamp-1'>
                                  {discuss.title}
                                </span>
                              </div>
                            </h3>
                            <div className='flex justify-between gap-x-2 mb-0.5'>
                              <span className='flex gap-x-2 text-sm text-center font-medium'>
                                <span className='text-zinc-500'>
                                  {new Date(discuss.created).toLocaleDateString(
                                    'ko-kr',
                                  )}
                                </span>
                                <span className='text-zinc-500'>
                                  {discuss.user.nickname}
                                </span>
                              </span>
                              <div className='flex gap-x-3 ml-auto'>
                                <span className='flex items-center gap-x-1'>
                                  <span className='text-zinc-500'>
                                    <div className='flex items-center justify-center w-4 h-4'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='19'
                                        height='12'
                                        viewBox='0 0 19 12'
                                      >
                                        <title>조회</title>
                                        <path
                                          fill='#979797'
                                          fillRule='evenodd'
                                          stroke='#979797'
                                          d='M9.444.5c3.74 0 6.688 1.849 8.966 5.497-2.277 3.652-5.22 5.503-8.854 5.503-3.74 0-6.688-1.849-8.966-5.497C2.867 2.351 5.81.5 9.444.5zM9.5.833c-1.365 0-2.602.58-3.497 1.523-.886.932-1.436 2.22-1.436 3.644s.55 2.712 1.436 3.644c.895.942 2.132 1.523 3.497 1.523 1.365 0 2.602-.58 3.497-1.523.886-.932 1.436-2.22 1.436-3.644s-.55-2.712-1.436-3.644C12.102 1.414 10.865.833 9.5.833zm0 3.334c.471 0 .897.203 1.205.527.317.335.512.797.512 1.306 0 .51-.195.971-.512 1.306-.308.324-.734.527-1.205.527-.471 0-.897-.203-1.205-.527-.317-.335-.512-.797-.512-1.306 0-.51.195-.971.512-1.306.308-.324.734-.527 1.205-.527z'
                                        />
                                      </svg>
                                    </div>
                                  </span>
                                  <span className='text-zinc-500 text-sm font-medium'>
                                    {discuss.views}
                                  </span>
                                </span>
                                <span className='flex items-center gap-x-1'>
                                  <span className='text-zinc-500'>
                                    <div className='flex items-center justify-center w-4 h-4'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='14'
                                        height='12'
                                        viewBox='0 0 14 12'
                                      >
                                        <title>좋아요</title>
                                        <path
                                          fill='#979797'
                                          fillRule='evenodd'
                                          stroke='#979797'
                                          d='M10.105.5c-.825 0-1.616.329-2.198.914l-1.05 1.053-1.05-1.053C5.2.805 4.405.5 3.61.5c-.795 0-1.59.305-2.198.914C.804 2.024.5 2.822.5 3.62c0 .8.304 1.598.911 2.208l.696.697 4.75 4.766 4.75-4.766.696-.697c.583-.586.911-1.38.911-2.208 0-.828-.328-1.622-.911-2.207C11.72.829 10.929.5 10.105.5z'
                                        />
                                      </svg>
                                    </div>
                                  </span>
                                  <span className='text-zinc-500 text-sm font-medium'>
                                    {discuss.likes}
                                  </span>
                                </span>
                                <span className='flex items-center gap-x-1'>
                                  <span className='text-zinc-500'>
                                    <div className='flex items-center justify-center w-4 h-4'>
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        width='11'
                                        height='12'
                                        viewBox='0 0 11 12'
                                      >
                                        <title>댓글</title>
                                        <path
                                          fill='#979797'
                                          fillRule='evenodd'
                                          stroke='#979797'
                                          d='M5.5.5c-1.379 0-2.626.58-3.53 1.514C1.061 2.955.5 4.255.5 5.691c0 1.448.57 2.758 1.494 3.7l.007 1.607 1.139-.73c.702.391 1.506.613 2.36.613 1.379 0 2.626-.58 3.53-1.514.909-.94 1.47-2.241 1.47-3.676 0-1.436-.561-2.736-1.47-3.677C8.126 1.08 6.879.5 5.5.5z'
                                        />
                                      </svg>
                                    </div>
                                  </span>
                                  <span className='text-zinc-500 text-sm font-medium'>
                                    {discuss.comments}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/discuss/search?q=${query}`}
                  className='flex justify-center w-1/4 text-lg text-blue-600 font-semibold mx-auto mt-6 py-1.5 bg-blue-50 shadow shadow-blue-100 rounded-xl'
                >
                  더보기
                </Link>
              </>
            )}
        </motion.section>
      </motion.div>
    </motion.div>
  );
}

export default Search;
