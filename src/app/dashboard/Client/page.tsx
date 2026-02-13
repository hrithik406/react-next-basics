import Link from "next/link"

export default function ProjectPage() {

    type projectsType = {
        id: number;
        projectName: string;
        linked: string;
    }


    const projects: projectsType[] = [
        {
            id: 1,
            projectName: 'Timer',
            linked: '/dashboard/client/timer'
        },
        {
            id: 2,
            projectName: 'Click Game',
            linked: 'client/game'
        },
        {
            id: 3,
            projectName: "Pet Feeder",
            linked: "/dashboard/client/feeder"
        }
    ]

    const ProjectCard = (project: projectsType) => (
        <div key={project.id} className="bg-white rounded-xl p-6 md:p-8 border border-gray-300  hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center justify-center gap-y-4">
                <h1 className="text-black text-xl font-bold">{project.projectName}</h1>
                <Link href={project.linked}><button className="bg-yellow-200 px-2 border-2 text-black text-xl rounded-xl hover:cursor-pointer">Open</button></Link>
            </div>
        </div>
    )

    return (
        <main className="flex flex-col m-4 h-auto bg-slate-100">
            <div className="flex items-center justify-center text-4xl text-black font-bold mb-10">Mini Projects Using Hooks</div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {projects.map((project, i) => (
                    <ProjectCard key={i} {...project}/>
                ))}
            </div>
        </main>
    )
}