import HeaderButton from "../components/HeaderButton";

export default function ProfilePage() {
    const coreValues = [
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

    const workExperience = [
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

    const companyPerformance = [
        {
            company: 'TechCorp Industries',
            metrics: [
                { label: 'Revenue Growth', value: '150%', color: 'text-green-600 dark:text-green-400' },
                { label: 'User Acquisition', value: '200K+', color: 'text-blue-600 dark:text-blue-400' },
                { label: 'Customer Satisfaction', value: '98%', color: 'text-yellow-600 dark:text-yellow-400' },
                { label: 'Market Share', value: '+25%', color: 'text-purple-600 dark:text-purple-400' }
            ]
        },
        {
            company: 'Global Solutions Inc',
            metrics: [
                { label: 'Product Launches', value: '12', color: 'text-green-600 dark:text-green-400' },
                { label: 'Team Growth', value: '300%', color: 'text-blue-600 dark:text-blue-400' },
                { label: 'User Engagement', value: '+45%', color: 'text-yellow-600 dark:text-yellow-400' },
                { label: 'Revenue Impact', value: '$5M', color: 'text-purple-600 dark:text-purple-400' }
            ]
        }
    ];

    return (
        <div className="flex h-screen bg-slate-100">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                <header className=" flex justify-between m-4 md:mb-8">
                    <h1 className=" flex text-4xl md:text-5xl lg:text-5xl font-bold text-black">
                        Profile Page
                    </h1>
                    <div className="relative flex-1 mx-5 mt-1">
                        <span className="absolute w-4.5 left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"><img src="/search.png" alt="" /></span>
                        <input
                            type="text"
                            placeholder="Search ....."
                            className="w-full bg-white pl-10 pr-4 py-2 text-sm text-black md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <span className="hidden md:block absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">⌘  K
                        </span>
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-2 mr-1">
                        <HeaderButton className="hidden md:block" iconSrc="/search.png" />
                        <HeaderButton className="hidden md:block" iconSrc="/bolts.png" />
                        <HeaderButton iconSrc="/bells.png" />
                        <div className="flex items-center bg-white border border-gray-200 rounded-3xl p-1 pr-1 space-x-2 hover:cursor-pointer">
                            <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                            <span className="font-medium text-black hidden sm:block">Warren</span>
                            <span className="text-black sm:block">▼</span>
                        </div>
                    </div>
                </header>
                <section className="flex px-4 mt-6">
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

                <section className="my-10 md:mb-12">
                    <div className="flex flex-col relative mb-12">
                        <h2 className="text-3xl mx-auto md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Core Values
                        </h2>
                        <div className="w-24 h-1 mx-auto bg-yellow-400 rounded-full"></div>
                    </div>

                    <div className="grid sm:grid-cols-2 m-4 lg:grid-cols-3 gap-6 md:gap-8">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-6 md:p-8 border border-gray-200  hover:shadow-lg transition-all hover:scale-105 duration-200"
                            >
                                <div className="text-4xl md:text-5xl w-8 mb-4"><img src={value.icon} alt="" /></div>
                                <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </div>
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
                            <div
                                key={index}
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
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    )
}