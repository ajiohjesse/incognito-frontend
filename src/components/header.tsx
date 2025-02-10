import { VenetianMaskIcon } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between bg-white">
      <div className="container">
        <Link to="/" className="flex w-max items-center gap-1">
          <VenetianMaskIcon className="size-8 text-indigo-500" />
          <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
            Incognito
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
