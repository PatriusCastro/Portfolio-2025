import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import Logo from "../../public/assets/main-logo.png";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 sticky top-0 z-10">
      <Image
        src={Logo}
        alt="Logo"
        width={40}
        height={40}
        className="bg-slate-900 rounded-lg dark:bg-slate-800 p-1 hover:scale-105 transition-transform duration-200 cursor-pointer"
      />
      <ThemeToggle />
    </nav>
  );
}