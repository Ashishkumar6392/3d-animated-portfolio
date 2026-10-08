import { ArrowUpRight, CalendarRange, FileUser, ListTodo, Github } from 'lucide-react';
const icons = { calendar: CalendarRange, resume: FileUser, tasks: ListTodo };
export default function ProjectCard({ project }) {
  const Icon = icons[project.icon] || CalendarRange;
  return (
    <article className={`project-card project-${project.color} reveal`}>
      <div className="project-visual">
        <div className="visual-grain" />
        <div className="project-visual-header"><span className="window-controls"><i/><i/><i/></span><span>PROJECT / {project.number}</span></div>
        <div className="project-symbol"><Icon size={62} strokeWidth={1.15}/></div>
        <span className="project-watermark">{project.number}</span>
      </div>
      <div className="project-meta"><span>{project.category}</span><span>{project.number} / 03</span></div>
      <div className="project-card-title"><h3>{project.name}</h3>{project.live ? <a href={project.live} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} live project`} className="arrow-icon"><ArrowUpRight size={24}/></a> : <a href={project.code} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} source code`} className="arrow-icon"><Github size={22}/></a>}</div>
      <p>{project.description}</p>
      <div className="tag-row">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    </article>
  );
}
