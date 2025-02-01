import { VenetianMaskIcon } from 'lucide-react';

const Header = () => {
  return (
    <header className=" h-16 flex items-center justify-between sticky top-0 z-50 bg-white ">
      <div className="flex items-center gap-1 container">
        <VenetianMaskIcon className="size-8 text-indigo-500" />
        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Incognito
        </span>
      </div>
    </header>
  );
};

export default Header;
