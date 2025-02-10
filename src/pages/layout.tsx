import { VenetianMaskIcon } from "lucide-react";
import { Link, Outlet } from "react-router";
import Header from "../components/header";

const Layout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <footer className="bg-slate-900 py-12">
        <div className="container flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 flex items-center gap-2 md:mb-0">
            <VenetianMaskIcon className="h-8 w-8 text-purple-300" />
            <span className="text-xl font-bold text-slate-50">Incognito</span>
          </div>
          <div className="flex gap-6 text-slate-300 underline">
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-purple-500"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="transition-colors hover:text-purple-500"
            >
              Terms
            </Link>
            <a
              href="mailto:me@rehx.name.ng"
              className="transition-colors hover:text-purple-500"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="container mt-8 text-center font-medium text-slate-300">
          <p>
            Built with ❤️ (and encrypted bytes) by{" "}
            <a
              href="http://x.com/rehxofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              R3HX.
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
