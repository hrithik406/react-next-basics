export default function ProfilePage() {
    type coreValuesType = {
        icon: string;
        title: string;
        description: string;
    }

    const coreValues: coreValuesType[] = [
        {
            icon: '/deals.png',
            title: 'Goal Oriented',
            description: 'Setting clear objectives and consistently achieving measurable results.'
        },
        {
            icon: '/bulb.png',
            title: 'Creative Thinker',
            description: 'Bringing innovative solutions to complex business challenges.'
        },
        {
            icon: '/handshake.png',
            title: 'Team Player',
            description: 'Collaborating effectively with cross-functional teams.'
        },
        {
            icon: '/analytics.png',
            title: 'Growth Mindset',
            description: 'Continuously learning and adapting to new technologies.'
        },
        {
            icon: '/bolts.png',
            title: 'Fast Executor',
            description: 'Delivering high-quality work with efficiency and speed.'
        },
        {
            icon: '/degree.png',
            title: 'Lifelong Learner',
            description: 'Committed to personal and professional development.'
        }
    ];

    const CoreValuesCard = ({ core }: { core: coreValuesType }) => (
        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200  hover:shadow-lg transition-all hover:scale-105 duration-200"
        >
            <div className="text-4xl md:text-5xl w-8 mb-4"><img src={core.icon} alt="" /></div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                {core.title}
            </h3>
            <p className="text-gray-600">
                {core.description}
            </p>
        </div>
    )



    type WorkExperienceType = {
        company: string;
        role: string;
        duration: string;
        description: string;
        icon: string;
    }

    const workExperience: WorkExperienceType[] = [
        {
            company: 'TechCorp Industries',
            role: 'Senior Product Manager',
            duration: '2021 - Present',
            description: 'Leading product strategy and execution for enterprise CRM solutions, managing cross-functional teams of 15+ members.',
            icon: '/building.png'
        },
        {
            company: 'Global Solutions Inc',
            role: 'Product Manager',
            duration: '2019 - 2021',
            description: 'Developed and launched 3 major product features that increased user engagement by 45%.',
            icon: '/globe.png'
        },
        {
            company: 'StartupHub',
            role: 'Associate Product Manager',
            duration: '2017 - 2019',
            description: 'Managed product roadmap and collaborated with engineering teams to deliver innovative solutions.',
            icon: '/rocket.png'
        },
        {
            company: 'Innovate Corp',
            role: 'Business Analyst',
            duration: '2015 - 2017',
            description: 'Conducted market research and data analysis to inform product decisions and business strategy.',
            icon: '/analytics.png'
        }
    ];

    const ExperienceCard = ({ experience }: { experience: WorkExperienceType }) => (<div
        className="bg-white rounded-xl p-6 md:p-8 border border-gray-300  hover:shadow-lg transition-shadow"
    >
        <div className="flex items-start justify-between mb-4">
            <div className="text-4xl md:text-5xl w-8"><img src={experience.icon} alt="" /></div>
            <span className="text-sm text-white  bg-gray-500  px-3 py-1 rounded-full">
                {experience.duration}
            </span>
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            {experience.role}
        </h3>
        <p className="text-lg text-gray-700 mb-4 font-semibold">
            {experience.company}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
            {experience.description}
        </p>
    </div>)

    type companyPerformanceType = {
        companyName: string;
        metrics: {
            label: string;
            value: string;
            color: string;
        }[];
    }

    const companyPerformance: companyPerformanceType[] = [
        {
            companyName: 'TechCorp Industries',
            metrics: [
                { label: 'Revenue Growth', value: '150%', color: 'text-green-600 dark:text-green-400' },
                { label: 'User Acquisition', value: '200K+', color: 'text-blue-600 dark:text-blue-400' },
                { label: 'Customer Satisfaction', value: '98%', color: 'text-yellow-600 dark:text-yellow-400' },
                { label: 'Market Share', value: '+25%', color: 'text-purple-600 dark:text-purple-400' }
            ]
        },
        {
            companyName: 'Global Solutions Inc',
            metrics: [
                { label: 'Product Launches', value: '12', color: 'text-green-600 dark:text-green-400' },
                { label: 'Team Growth', value: '300%', color: 'text-blue-600 dark:text-blue-400' },
                { label: 'User Engagement', value: '+45%', color: 'text-yellow-600 dark:text-yellow-400' },
                { label: 'Revenue Impact', value: '$5M', color: 'text-purple-600 dark:text-purple-400' }
            ]
        }
    ];

    const CompanyPfm = ( company: companyPerformanceType ) => (
        <div className="flex flex-col bg-white rounded-xl p-3 md:p-6 border border-gray-200"
        >
            <h3 className="text-2xl md:text-3xl font-bold text-black mx-auto mb-8">
                {company.companyName} 
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {company.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                        <div className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${metric.color}`}>
                            {metric.value}
                        </div>
                        <div className="text-sm md:text-base text-gray-600">
                            {metric.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )


    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-transparent">
                <main className="flex-1 mb-4">
                    <section className="flex px-4">
                        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 ">
                                    <div className="mb-6">
                                        <h2 className="text-2xl md:text-3xl font-bold text-black  mb-2">
                                            Profile
                                        </h2>
                                        <div className="w-22 h-1 bg-yellow-400 rounded-full"></div>
                                    </div>
                                    <div className="space-y-4 text-gray-600">
                                        <p>
                                            <span className="font-semibold text-black ">Hi, I'm Sarah Johnson</span> - a passionate product manager with over 8 years of experience in building and scaling digital products.
                                        </p>
                                        <p>
                                            I specialize in turning complex business challenges into elegant solutions that drive growth and user satisfaction. My approach combines data-driven decision making with a deep understanding of user needs.
                                        </p>
                                        <p>
                                            Throughout my career, I've led cross-functional teams, launched successful products, and contributed to significant revenue growth across multiple organizations.
                                        </p>
                                    </div>
                                    <div className="mt-6 space-y-3">
                                        <div className="flex items-center space-x-3 text-sm md:text-base">
                                            <span className="text-xl w-4"><img src="/location.png" alt="" /></span>
                                            <span className="text-gray-600">San Francisco, CA</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm md:text-base">
                                            <span className="text-xl w-4"><img src="/mail.png" alt="" /></span>
                                            <span className="text-gray-600">sarah.johnson@email.com</span>
                                        </div>
                                        <div className="flex items-center space-x-3 text-sm md:text-base">
                                            <span className="text-xl w-4"><img src="/suitcase.png" alt="" /></span>
                                            <span className="text-gray-600">Senior Product Manager</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right - Image Space (2/3) */}
                            <div className="lg:col-span-1">
                                <div className="bg-linear-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-xl min-h-[400px] md:min-h-full lg:min-h-full flex items-center justify-center relative overflow-hidden">
                                    {/* Image Placeholder - Replace with actual image */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-32 h-32 md:w-48 md:h-48 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                                                <span className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white">SJ</span>
                                            </div>
                                            <p className="text-white text-lg md:text-xl font-semibold">Profile Image Space</p>
                                        </div>
                                    </div>
                                    {/* You can replace the above div with: */}
                                    {/* <img src="your-image-url.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mt-10 md:mb-18">
                        <div className="flex flex-col relative mb-12">
                            <h2 className="text-3xl mx-auto md:text-4xl lg:text-5xl font-bold text-black mb-4">
                                Company Performance
                            </h2>
                            <div className="w-40 h-1 mx-auto bg-yellow-400 rounded-full"></div>
                            <p className="text-lg mx-auto text-gray-600 mt-4">
                                Key achievements and metrics from previous roles
                            </p>
                        </div>

                        <div className="space-y-8 mx-4">
                            {companyPerformance.map((companies, index) => (
                                <CompanyPfm key={index} {...companies}/>
                            ))}
                        </div>
                    </section>

                    <section className="mb-10 md:mb-12">
                        <div className="flex flex-col relative mb-12">
                            <h2 className="text-3xl mx-auto md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Core Values
                            </h2>
                            <div className="w-24 h-1 mx-auto bg-yellow-400 rounded-full"></div>
                        </div>

                        <div className="grid sm:grid-cols-2 m-4 lg:grid-cols-3 gap-6 md:gap-8">
                            {coreValues.map((core, i) => (
                                <CoreValuesCard key={i} core={core} />
                            ))}
                        </div>
                    </section>

                    <section className="mb-10 md:mb-12">
                        <div className="flex flex-col relative mb-10">
                            <h2 className="text-3xl mx-auto md:text-4xl lg:text-5xl font-bold text-black mb-4">
                                Work Experience
                            </h2>
                            <div className="w-30 h-1 mx-auto bg-yellow-400 rounded-full"></div>
                        </div>

                        <div className="grid sm:grid-cols-2 mx-4 gap-6 md:gap-8">
                            {workExperience.map((experience, index) => (
                                <ExperienceCard key={index} experience={experience} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="bg-linear-to-r from-yellow-400 to-orange-500 rounded-2xl p-8 md:p-12 lg:p-12 text-center m-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white ">
                                Let's Work Together
                            </h2>
                            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <button className="bg-white hover:bg-gray-900 text-gray-900 hover:text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 w-full sm:w-auto hover:cursor-pointer">
                                    Download Resume
                                </button>
                                <button className="bg-gray-900 hover:bg-white text-white hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-colors w-full sm:w-auto hover:cursor-pointer">
                                    Get In Touch
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}