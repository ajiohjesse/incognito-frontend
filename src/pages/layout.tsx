import { VenetianMaskIcon } from 'lucide-react';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <>
      <header className=" h-20 flex items-center justify-between sticky top-0 z-50 bg-white ">
        <div className="flex items-center gap-2 container">
          <VenetianMaskIcon className="h-10 w-10 text-indigo-500 animate-bounce" />
          <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            Incognito
          </span>
        </div>
      </header>

      <Outlet />

      <footer className="bg-slate-900 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <VenetianMaskIcon className="h-8 w-8 text-purple-300" />
            <span className="text-xl font-bold text-slate-50">Incognito</span>
          </div>
          <div className="flex gap-6 underline text-slate-300">
            <a href="#" className="hover:text-purple-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-500 transition-colors">
              Terms
            </a>
            <a
              href="mailto:me@rehx.name.ng"
              className="hover:text-purple-500 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="container font-medium text-center mt-8 text-slate-300">
          <p>Built with ❤️ (and encrypted bytes) by R3HX.</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
