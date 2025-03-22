import ButtonNeutral from '@/components/button/ButtonNeutral';
import { QuickActionsProps } from '@/types/base';

const QuickAction: React.FC<QuickActionsProps> = ({item}) => {
  return (
    <ButtonNeutral
      key={item.id}
      btnText1={item.text}
      icon1={<item.icon className='size-10 bg-blue-200 group-hover:bg-blue-100 rounded-full p-2 group-hover:ring-2 ring-primary ring-offset-1 transition-all duration-300 ease-in-out' />}
      classes='flex flex-col items-center gap-1 text-sm text-neutral-800 hover:text-primary group font-semibold'
    />
  );
};

export default QuickAction;
