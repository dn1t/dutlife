import {
  CheckBadgeIcon,
  FireIcon,
  PlayCircleIcon,
  UserIcon,
} from '@heroicons/react/20/solid';

export enum EventType {
  JOINED_ENTRY = 0,
  JOINED_DUTLIFE = 1,
  CREATED_PROJECT = 2,
  PROJECT_RANKED = 3,
  PROJECT_STAFF_PICKED = 4,
}

function Timeline({
  events,
}: { events: { type: EventType; date?: string; args: string[] }[] }) {
  return (
    <div>
      <ul className='flex flex-col gap-y-4'>
        {events.map((event) => {
          const date = new Date(event.date ?? 0);

          let label: JSX.Element;
          let icon: JSX.Element;
          switch (event.type) {
            case EventType.JOINED_ENTRY:
              label = (
                <span className='text-zinc-500'>
                  엔트리 계정{' '}
                  <span className='text-black'>{event.args[0]}</span> 생성
                </span>
              );
              icon = (
                <div className='flex items-center justify-center shrink-0 bg-zinc-200/70 w-9 h-9 rounded-full'>
                  <UserIcon className='w-5 h-5 text-zinc-600' />
                </div>
              );
              break;
            case EventType.JOINED_DUTLIFE:
              label = (
                <span className='text-zinc-500'>
                  dut.life 계정{' '}
                  <span className='text-black'>{event.args[0]}</span> 생성
                </span>
              );
              icon = (
                <div className='flex items-center justify-center shrink-0 bg-blue-100/70 w-9 h-9 rounded-full'>
                  <UserIcon className='w-5 h-5 text-blue-600' />
                </div>
              );
              break;
            case EventType.CREATED_PROJECT:
              label = (
                <span className='text-zinc-500'>
                  작품 <span className='text-black'>{event.args[0]}</span> 생성
                </span>
              );
              icon = (
                <div className='flex items-center justify-center shrink-0 bg-emerald-100/70 w-9 h-9 rounded-full'>
                  <PlayCircleIcon className='w-5 h-5 text-emerald-600' />
                </div>
              );
              break;
            case EventType.PROJECT_RANKED:
              label = (
                <span className='text-zinc-500'>
                  작품 <span className='text-black'>{event.args[0]}</span> 인기
                  작품 선정
                </span>
              );
              icon = (
                <div className='flex items-center justify-center shrink-0 bg-orange-100/70 w-9 h-9 rounded-full'>
                  <FireIcon className='w-5 h-5 text-orange-600' />
                </div>
              );
              break;
            case EventType.PROJECT_STAFF_PICKED:
              label = (
                <span className='text-zinc-500'>
                  작품 <span className='text-black'>{event.args[0]}</span>{' '}
                  스태프 선정
                </span>
              );
              icon = (
                <div className='flex items-center justify-center shrink-0 bg-blue-100/70 w-9 h-9 rounded-full'>
                  <CheckBadgeIcon className='w-5 h-5 text-blue-600' />
                </div>
              );
              break;
            default:
              label = '지원하지 않는 활동입니다';
              icon = (
                <div className='flex items-center justify-center shrink-0 bg-blue-100/70 w-9 h-9 rounded-full'>
                  <UserIcon className='w-5 h-5 text-blue-600' />
                </div>
              );
          }

          return (
            <li className='flex gap-x-3'>
              {icon}
              <div className='flex flex-col'>
                <div className='text-zinc-500 text-[15px] leading-4 [font-feature-settings:_"tnum"]'>
                  {date.getFullYear().toString().slice(2)}.
                  {(date.getMonth() + 1).toString().padStart(2, '0')}.
                  {date.getDate().toString().padStart(2, '0')}.{' '}
                  {date.getHours().toString().padStart(2, '0')}:
                  {date.getMinutes().toString().padStart(2, '0')}
                </div>
                <div className='text-lg font-medium leading-5 mt-0.5'>
                  {label}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Timeline;
