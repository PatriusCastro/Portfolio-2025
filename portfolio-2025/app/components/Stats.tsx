import { LaptopMinimalCheck, FolderGit2, Star} from "lucide-react";


export default function Stats() {
  return (
    <section className="py-6 px-12 border-y-1 border-slate-300 dark:border-slate-700 mask-x-from-90% to-100%">
        <div className="flex flex-col sm:flex-row justify-center gap-y-6 sm:justify-between w-full">
            <div className="flex justify-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white cursor-pointer"><LaptopMinimalCheck/><p>1 Year Experience</p></div>
            <div className="flex justify-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white cursor-pointer"><FolderGit2/><p>10+ Projects done</p></div>
            <div className="flex justify-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white cursor-pointer"><Star/><p>10 Stars on repositories</p></div>
        </div>
    </section>
  );
}