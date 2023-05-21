import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import Nav from '../components/common/Nav';

interface SearchResult {
  title: string;
  href: string;
  description: string;
}

function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const query = searchParams.get('q');

  const searchQuery = trpc.search.useQuery({ query });

  useEffect(() => {
    if (!searchQuery.data) return;

    console.log(searchQuery.data);

    // 'https://playentry.org/img/DefaultCardUserThmb.svg'

    setResults([
      { title: 'test1', href: 'https://example.com', description: 'wasans!!' },
    ]);
  }, [searchQuery.data]);

  return (
    <div>
      <Nav query={query ?? undefined} />
      <div className='max-w-3xl mx-auto flex flex-col items-start'>
        <motion.h2
          className='mb-4 text-lg text-black/70 text-center font-medium font-display leading-8'
          layoutId='subtitle'
        >
          "{query}"에 대한 검색 결과 ({results.length}건)
        </motion.h2>
        <div className='w-full'>
          {searchQuery.data?.users && searchQuery.data.users.length > 0 && (
            <section>
              <h2 className='text-2xl font-bold mb-2'>유저</h2>
              <ul>
                {searchQuery.data.users.map((user) => (
                  <li>
                    <Link
                      to={`/user/${user.id}`}
                      className='flex flex-col w-full h-max rounded-xl shadow'
                    >
                      <div className='rounded-xl overflow-hidden'>
                        <div
                          className='w-full h-28 bg-center bg-[auto_105%] bg-[#16d8a3] brightness-50'
                          style={{
                            backgroundImage: `url(${user.coverImage})`,
                          }}
                        />
                        <div className='flex flex-col w-full h-max bg-zinc-50 px-6 pb-3 shadow'>
                          <div className='relative mb-6'>
                            <img
                              src={user.profileImage}
                              alt={`${user.nickname}의 프로필 사진`}
                              className='w-[72px] h-[72px] rounded-full absolute -top-12 outline outline-4 outline-zinc-50'
                            />
                          </div>
                          <h3 className='flex items-baseline mt-1 px-1'>
                            <span className='text-2xl font-bold'>
                              {user.nickname}
                            </span>
                            <span className='text-xl text-zinc-500 font-medium ml-1.5'>
                              {user.username}
                            </span>
                          </h3>
                          <div>{user.description}</div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
