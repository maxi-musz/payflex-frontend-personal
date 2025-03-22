import { QuickActionsProps } from '@/types/base';

const QuickAction: React.FC<QuickActionsProps> = ({item}) => {
  return (
    <button key={item.id} className='flex flex-col items-center gap-1 text-sm text-neutral-800 hover:text-primary group font-semibold'>
      <span className='p-2 bg-blue-200 group-hover:bg-blue-100 rounded-full group-hover:ring-2 ring-primary ring-offset-1 transition-all duration-300 ease-in-out'>
        {<item.icon className='' />}
      </span>
      <span>{item.text}</span>
    </button>
  );
};

export default QuickAction;
