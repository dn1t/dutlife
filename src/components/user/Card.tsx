import { formatNumber } from '../../utils/formatNumber';

function Card({
  label,
  amount,
  changes,
}: {
  label: string;
  amount: number | string;
  changes?: 'increase' | 'decrease';
}) {
  return (
    <div className='flex flex-col items-start justify-between bg-zinc-50 aspect-[3/2] px-5 py-4 rounded-2xl shadow'>
      <span className='text-zinc-600 text-lg font-medium leading-5 mb-1'>
        {label}
      </span>
      <span className='flex items-end text-zinc-600 text-[42px] font-semibold leading-8'>
        {typeof amount === 'number' ? formatNumber(amount) : amount}
      </span>
    </div>
  );
}

export default Card;
