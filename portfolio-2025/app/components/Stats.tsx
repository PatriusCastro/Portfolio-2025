import { LaptopMinimalCheck, FolderGit2, Star} from "lucide-react";


export default function Stats() {
  return (
    <section className="py-6 px-12 border-y-1 border-slate-300 dark:border-slate-700 mask-x-from-90% to-100%">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full text-center gap-y-6">
        {/* Experience */}
        <a
          href="https://github.com/PatriusCastro"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex justify-center sm:justify-start gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white cursor-pointer transition-colors duration-200"
        >
          <LaptopMinimalCheck />
          <p>1 Year Experience</p>
        </a>

        {/* Projects */}
        <a
          href="https://github.com/PatriusCastro?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex justify-center gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white cursor-pointer transition-colors duration-200"
        >
          <FolderGit2 />
          <p>10+ Projects done</p>
        </a>

        {/* Stars */}
        <a
          href="https://github.com/PatriusCastro"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex justify-center sm:justify-end gap-2 text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white cursor-pointer transition-colors duration-200"
        >
          <Star />
          <p>10 Stars on repositories</p>
        </a>
      </div>
    </section>
  );
}