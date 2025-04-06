import FundsModal from '@/components/transfer/FundsModal';
import { useGeneralData } from '@/context/GeneralDataContext';
import { QuickActionsProps } from '@/types/base';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const QuickAction: React.FC<QuickActionsProps> = ({item}) => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [whichModal, setWhichModal] = useState('');
  const router = useRouter();
  const {updateGeneralData} = useGeneralData();

  const handleModalToggle = () => {
    if (item.text === 'Transfer') {
      setWhichModal('Transfer');
    }
    setIsWalletModalOpen(prev => !prev);
  }

  const handleNavigation = () => {
    if (item.text === 'Fund Wallet') {
      updateGeneralData('/connect-bank');
      router.push('/connect-bank');
    }
  }

  return (
    <>
    <button onClick={item.text === 'Fund Wallet' ? handleNavigation : handleModalToggle} key={item.id} className='flex flex-col items-center gap-1 text-sm text-neutral-800 hover:text-primary group font-semibold'>
      <span className='p-2 bg-blue-200 group-hover:bg-blue-100 rounded-full group-hover:ring-2 ring-primary ring-offset-1 transition-all duration-300 ease-in-out'>
        {<item.icon className='' />}
      </span>
      <span>{item.text}</span>
    </button>
    {isWalletModalOpen && <FundsModal handleModalToggle={handleModalToggle} whichModal={whichModal} />}
    </>
  );
};

export default QuickAction;
