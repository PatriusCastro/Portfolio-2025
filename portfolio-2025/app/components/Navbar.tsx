import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import Logo from "../../public/assets/main-logo.png";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 sticky top-0 z-10">
      <h1 className="font-bold cursor-pointer">patrius.</h1>
      <ThemeToggle />
    </nav>
  );
}