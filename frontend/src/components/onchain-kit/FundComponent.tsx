import { FundButton } from '@coinbase/onchainkit/fund';
 
export default function FundComponent() {
  
  return <FundButton 
    className='bg-slate-300 font-inter text-black hover:bg-purple-500' 
    text={"Buy Crypto"}
    hideText={false}
    hideIcon={true}
    openIn={"tab"}
    />;
}
