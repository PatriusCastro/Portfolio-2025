"use client";

// The desktop windows' contents: each section of the classic site, re-staged as a desktop app.
// Layouts respond to the window's own size (container queries), since windows are resizable.
import { useState } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUp, FiChevronDown, FiChevronUp, FiExternalLink, FiFolder, FiGithub, FiSearch, FiSend } from "react-icons/fi";
import { ABOUT } from "./About";
import { projects } from "./Project";
import { skillGroups } from "./Skills";
import { FORM_ACTION, socials, useContactForm } from "./Contact";

const shell = "@container flex-1 min-h-0 flex flex-col text-[13px] text-[var(--text-sub)]";
const toolbar = "shrink-0 flex items-center gap-2 px-3 h-10 border-b border-[var(--border)]";
const statusBar = "shrink-0 flex items-center gap-4 px-3 h-7 border-t border-[var(--border)] bg-[var(--surface2)] font-mono text-[11px] text-[var(--muted)]";
const scroll = "overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--border-hover)_transparent]";
const selected = "bg-[var(--accent-pale)] text-[var(--text)]";
const hover = "hover:bg-[var(--surface2)]";

function Details({ p }: { p: typeof projects[number] }) {
  return (
    <>
      <h3 className="font-bold text-base text-[var(--text)]">{p.title}</h3>
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-[11px]">
        <dt className="text-[var(--muted)]">Type</dt>
        <dd className={p.live ? "text-[var(--green)]" : ""}>{p.live ? "Live site" : "Archived project"}</dd>
        <dt className="text-[var(--muted)]">Year</dt>
        <dd>{p.year}</dd>
      </dl>
      <p className="leading-relaxed">{p.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {p.technologies.map(t => <span key={t} className="tech-chip">{t}</span>)}
      </div>
      {p.features && (
        <ul className="pl-4 list-disc flex flex-col gap-1 leading-relaxed marker:text-[var(--accent-mid)]">
          {p.features.map(f => <li key={f}>{f}</li>)}
        </ul>
      )}
      {p.github && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 pt-3 border-t border-[var(--border)] font-mono text-[11px]">
          <dt className="text-[var(--muted)]">Stars</dt><dd>{p.github.stars}</dd>
          <dt className="text-[var(--muted)]">Commits</dt><dd>{p.github.commits}</dd>
          <dt className="text-[var(--muted)]">Code</dt><dd>{p.github.languages}</dd>
          <dt className="text-[var(--muted)]">Last push</dt><dd>{p.github.updated}</dd>
        </dl>
      )}
    </>
  );
}

/* Projects: a file explorer. Each project is a file: one click selects it and fills the details
   sidebar, a double click (or Enter on a selected file) opens it in the viewer window. */
export function Explorer({ onOpen }: { onOpen: (index: number) => void }) {
  const [sel, setSel] = useState<number | null>(null);

  return (
    <div className={shell}>
      <div className={toolbar}>
        <span aria-hidden className="hidden @md:flex gap-2.5 text-base text-[var(--muted2)]"><FiArrowLeft /><FiArrowRight /><FiArrowUp /></span>
        <div className="flex-1 min-w-0 flex items-center gap-2 h-7 px-2.5 rounded-md border border-[var(--border)] bg-[var(--bg)] font-mono text-[11px]">
          <FiFolder className="shrink-0 text-[var(--accent-mid)]" />
          <span className="truncate">This PC › patrius › Projects</span>
        </div>
        <a href="https://github.com/PatriusCastro" target="_blank" rel="noopener noreferrer"
          className={`shrink-0 flex items-center gap-1.5 h-7 px-2.5 rounded-md font-mono text-[11px] text-[var(--text-sub)] no-underline ${hover}`}>
          <FiGithub /> All on GitHub
        </a>
      </div>

      <div className="flex-1 min-h-0 flex flex-col @2xl:flex-row">
      <ul className={`flex-1 min-h-0 p-3 grid content-start gap-1 grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] ${scroll}`}>
        {projects.map((f, i) => (
          <li key={f.title}>
            <button
              onClick={() => setSel(i)}
              onDoubleClick={() => onOpen(i)}
              onKeyDown={e => { if (e.key === "Enter" && i === sel) { e.preventDefault(); onOpen(i); } }}
              aria-pressed={i === sel}
              title="Double-click to open"
              className={`w-full p-2 flex flex-col gap-2 rounded-lg border text-center transition-colors
                ${i === sel ? `border-[var(--border-hover)] ${selected}` : `border-transparent ${hover}`}`}
            >
              <img src={f.imageUrl} alt="" className="w-full aspect-[4/3] object-cover rounded-md border border-[var(--border)]" />
              <span className="text-xs leading-tight line-clamp-2">{f.title}</span>
              <span className="font-mono text-[11px] text-[var(--muted)]">{f.year}</span>
            </button>
          </li>
        ))}
      </ul>
      {sel !== null && (
        <aside aria-label="Details" className={`shrink-0 max-h-[55%] @2xl:max-h-none @2xl:w-72 p-4 flex flex-col gap-3 border-t @2xl:border-t-0 @2xl:border-l border-[var(--border)] ${scroll}`}>
          <img src={projects[sel].imageUrl} alt={`${projects[sel].title} screenshot`} className="hidden @2xl:block w-full aspect-video object-cover rounded-md border border-[var(--border)]" />
          <Details p={projects[sel]} />
          <button onClick={() => onOpen(sel)} className="btn-primary font-mono mt-auto self-start">Open</button>
        </aside>
      )}
      </div>

      <div className={statusBar}>
        <span>{projects.length} items</span>
        {sel !== null && <span className="truncate">1 selected · {projects[sel].title}</span>}
      </div>
    </div>
  );
}

/* A project opened from the explorer: its screenshot beside its details. */
export function Viewer({ index }: { index: number }) {
  const p = projects[index];
  const url = p.liveUrl || p.repoUrl;

  return (
    <div className={shell}>
      <div className={toolbar}>
        <div className="flex-1 min-w-0 flex items-center gap-2 h-7 px-2.5 rounded-md border border-[var(--border)] bg-[var(--bg)] font-mono text-[11px]">
          <FiExternalLink className="shrink-0 text-[var(--accent-mid)]" />
          <span className="truncate">{url.replace("https://", "")}</span>
        </div>
        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-1.5 h-7 px-3 rounded-md bg-[var(--accent-mid)] text-[var(--bg)] font-semibold text-xs no-underline"><FiExternalLink /> Open live</a>}
        {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className={`shrink-0 flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-[var(--border)] font-mono text-[11px] text-[var(--text-sub)] no-underline ${hover}`}><FiGithub /> Source</a>}
      </div>

      <div className="flex-1 min-h-0 flex flex-col @2xl:flex-row">
        <div className="flex-1 min-h-40 p-4 flex items-center justify-center bg-[var(--bg)]">
          <img src={p.imageUrl} alt={`${p.title} screenshot`} className="max-w-full max-h-full object-contain rounded-md border border-[var(--border)]" />
        </div>
        <aside aria-label="Details" className={`shrink-0 max-h-[50%] @2xl:max-h-none @2xl:w-72 p-4 flex flex-col gap-3 border-t @2xl:border-t-0 @2xl:border-l border-[var(--border)] ${scroll}`}>
          <Details p={p} />
        </aside>
      </div>

      <div className={statusBar}><span>{index + 1} of {projects.length}</span><span className="ml-auto">{p.technologies.length} technologies</span></div>
    </div>
  );
}

/* About: a plain-text file open in a notepad. */
export function Notepad() {
  const text = ["Patrick Josuah Castro", "Full-Stack Developer", "", ...ABOUT.flatMap(p => [p, ""])].slice(0, -1).join("\n");

  return (
    <div className={shell}>
      <div aria-hidden className="shrink-0 flex gap-4 px-3 h-8 items-center border-b border-[var(--border)] text-xs text-[var(--muted)]">
        <span>File</span><span>Edit</span><span>View</span>
      </div>
      <p className={`flex-1 min-h-0 p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap bg-[var(--bg)] text-[var(--text)] ${scroll}`}>{text}</p>
      <div className={statusBar}>
        <span>{text.split("\n").length} lines</span><span>{text.length} characters</span><span className="ml-auto">UTF-8</span>
      </div>
    </div>
  );
}

/* Skills: a task manager. Categories sit in the side rail like performance tiles (average plus a
   mini chart of their skills); the table lists skills as processes, searchable and sortable. */
const ALL = "All";
const allSkills = Object.entries(skillGroups).flatMap(([group, list]) => list.map(s => ({ ...s, group })));
const average = (list: { level: number }[]) => Math.round(list.reduce((n, s) => n + s.level, 0) / (list.length || 1));
// ponytail: tiers are fixed cut-offs on the level number; change them here if the wording should differ.
const tier = (level: number) =>
  level >= 85 ? { label: "Advanced", cls: "text-[var(--green)]" }
  : level >= 70 ? { label: "Proficient", cls: "text-[var(--accent-mid)]" }
  : { label: "Familiar", cls: "text-[var(--muted)]" };

export function TaskManager() {
  const [group, setGroup] = useState(ALL);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: "name" | "level"; desc: boolean }>({ key: "level", desc: true });

  const inGroup = allSkills.filter(s => group === ALL || s.group === group);
  const rows = inGroup
    .filter(s => s.name.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((x, y) => (sort.key === "name" ? x.name.localeCompare(y.name) : x.level - y.level) * (sort.desc ? -1 : 1));

  const header = (key: "name" | "level", label: string, cls = "") => (
    <th aria-sort={sort.key !== key ? "none" : sort.desc ? "descending" : "ascending"} className={`text-left font-normal px-2 h-9 ${cls}`}>
      <button onClick={() => setSort(s => ({ key, desc: s.key === key ? !s.desc : key === "level" }))}
        className={`flex items-center gap-1 h-7 px-2 rounded ${hover} ${sort.key === key ? "text-[var(--text)]" : ""}`}>
        {label}{sort.key === key && (sort.desc ? <FiChevronDown /> : <FiChevronUp />)}
      </button>
    </th>
  );

  return (
    <div className={shell}>
      <div className={toolbar}>
        <label className="flex-1 min-w-0 flex items-center gap-2 h-7 px-2.5 rounded-md border border-[var(--border)] bg-[var(--bg)]">
          <FiSearch aria-hidden className="shrink-0 text-[var(--muted)]" />
          <input value={query} onChange={e => setQuery(e.target.value)} type="search" aria-label="Search skills" placeholder="Search skills"
            className="flex-1 min-w-0 bg-transparent text-xs text-[var(--text)] placeholder:text-[var(--muted2)] outline-none" />
        </label>
        <span className="shrink-0 font-mono text-[11px] text-[var(--muted)] tabular-nums">{rows.length} of {inGroup.length}</span>
      </div>

      <div className="flex-1 min-h-0 flex flex-col @xl:flex-row">
        <div role="tablist" aria-label="Skill categories" className="shrink-0 flex @xl:flex-col gap-1.5 p-2 @xl:w-48 border-b @xl:border-b-0 @xl:border-r border-[var(--border)] overflow-x-auto @xl:overflow-y-auto [scrollbar-width:thin]">
          {[ALL, ...Object.keys(skillGroups)].map(g => {
            const list = g === ALL ? allSkills : skillGroups[g];
            const on = g === group;
            return (
              <button key={g} role="tab" aria-selected={on} onClick={() => setGroup(g)}
                className={`shrink-0 px-3 py-2 rounded-lg border text-left transition-colors ${on ? `border-[var(--border-hover)] ${selected}` : `border-transparent ${hover}`}`}>
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-semibold text-[var(--text)]">{g}</span>
                  <span className="font-mono text-[11px] text-[var(--accent-mid)] tabular-nums">{average(list)}%</span>
                </span>
                <span aria-hidden className="hidden @xl:flex items-end gap-0.5 h-6 mt-1.5 border-b border-[var(--border)]">
                  {list.map(s => <span key={s.name} className={`flex-1 rounded-t-sm bg-[var(--accent-mid)] ${on ? "" : "opacity-50"}`} style={{ height: `${s.level}%` }} />)}
                </span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" aria-label={group} className={`flex-1 min-h-0 ${scroll}`}>
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-[1] bg-[var(--surface)] font-mono text-[11px] text-[var(--muted)] shadow-[0_1px_0_var(--border)]">
              <tr>
                {header("name", "Name")}
                {group === ALL && <th className="hidden @2xl:table-cell text-left font-normal px-4 h-9">Category</th>}
                <th className="hidden @lg:table-cell text-left font-normal px-4 h-9">Status</th>
                {header("level", "Proficiency", "w-2/5")}
              </tr>
            </thead>
            <tbody>
              {rows.map(s => (
                <tr key={s.name} className={`border-b border-[var(--border)] ${hover}`}>
                  <td className="px-4 h-11">
                    <span className="flex items-center gap-3 font-medium text-[var(--text)]">
                      <span aria-hidden className="w-7 h-7 shrink-0 flex items-center justify-center rounded-md bg-[var(--accent-pale)] text-[15px] text-[var(--accent-dim)]">{s.icon}</span>
                      {s.name}
                    </span>
                  </td>
                  {group === ALL && <td className="hidden @2xl:table-cell px-4 h-11 text-[var(--muted)]">{s.group}</td>}
                  <td className="hidden @lg:table-cell px-4 h-11">
                    <span className={`flex items-center gap-1.5 font-mono text-[11px] ${tier(s.level).cls}`}>
                      <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-current" />{tier(s.level).label}
                    </span>
                  </td>
                  <td className="px-4 h-11">
                    <span className="flex items-center gap-3">
                      <span aria-hidden className="flex-1 h-2 rounded-full bg-[var(--surface2)] overflow-hidden">
                        <span className="block h-full rounded-full bg-gradient-to-r from-[var(--accent-dim)] to-[var(--accent-mid)]" style={{ width: `${s.level}%` }} />
                      </span>
                      <span className="w-9 text-right font-mono text-[11px] text-[var(--text)] tabular-nums">{s.level}%</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <p className="p-8 text-center text-[var(--muted)]">No skills match &ldquo;{query}&rdquo;.</p>}
        </div>
      </div>

      <div className={statusBar}>
        <span>{inGroup.length} skills in {group}</span>
        <span className="ml-auto">Average {average(inGroup)}%</span>
      </div>
    </div>
  );
}

/* Contact: a mail client with a new message open, addressed to me. Other channels are the contact list. */
export function Mail() {
  const { status, onSubmit } = useContactForm();
  const field = "flex items-center gap-3 px-4 h-10 border-b border-[var(--border)]";
  const label = "w-14 shrink-0 font-mono text-[11px] text-[var(--muted)]";
  const input = "flex-1 min-w-0 h-8 px-2 rounded bg-transparent text-[var(--text)] placeholder:text-[var(--muted2)]";

  return (
    <div className={shell}>
      <div className="flex-1 min-h-0 flex flex-col @2xl:flex-row">
        <form action={FORM_ACTION} method="POST" onSubmit={onSubmit} className="flex-1 min-h-0 flex flex-col">
          <div className={toolbar}>
            <button type="submit" disabled={status === "sending"} className="flex items-center gap-1.5 h-7 px-3 rounded-md bg-[var(--accent-mid)] text-[var(--bg)] font-semibold text-xs disabled:opacity-60">
              <FiSend /> {status === "sending" ? "Sending…" : "Send"}
            </button>
            <p role="status" className={`truncate text-xs ${status === "error" ? "text-red-500" : "text-[var(--green)]"}`}>
              {status === "sent" && "✓ Sent. I'll get back to you soon."}
              {status === "error" && "Couldn't send. Try again or email me directly."}
            </p>
          </div>
          <div className={field}>
            <span className={label}>To</span>
            <span className="px-2 py-0.5 rounded-full bg-[var(--accent-pale)] text-[var(--text)] text-xs truncate">Patrick Castro</span>
          </div>
          <label className={field}><span className={label}>From</span><input name="email" type="email" required placeholder="your@email.com" className={input} /></label>
          <label className={field}><span className={label}>Subject</span><input name="subject" type="text" required placeholder="Subject" className={input} /></label>
          <textarea name="message" required aria-label="Message" placeholder="Write your message…"
            className={`flex-1 min-h-28 p-4 resize-none bg-[var(--bg)] text-[var(--text)] leading-relaxed placeholder:text-[var(--muted2)] ${scroll}`} />
        </form>

        <aside aria-label="Other ways to reach me" className={`shrink-0 @2xl:w-64 border-t @2xl:border-t-0 @2xl:border-l border-[var(--border)] ${scroll}`}>
          <h3 className="px-4 h-10 flex items-center font-mono text-[11px] text-[var(--muted)] border-b border-[var(--border)]">Contacts</h3>
          <ul className="p-2 flex @2xl:flex-col gap-1 overflow-x-auto">
            {socials.map(s => (
              <li key={s.label} className="shrink-0">
                <a href={s.href} target={s.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-2 py-2 rounded-md no-underline ${hover}`}>
                  <span className="p-2 rounded-full bg-[var(--accent-pale)] text-[var(--accent-dim)]">{s.icon}</span>
                  <span className="min-w-0">
                    <span className="block text-[var(--text)] font-semibold">{s.label}</span>
                    <span className="block text-xs text-[var(--muted)] truncate">{s.sub}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
