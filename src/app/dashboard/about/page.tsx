import StoryStats from "../components/StoryStats";

export default function AboutPage() {
    type valuesType = {
        icon: string;
        title: string;
        description: string;
    }

    const values: valuesType[] = [
        {
            icon: '/deals.png',
            title: 'Mission Driven',
            description: 'We are committed to helping businesses grow through innovative CRM solutions that make a real difference.'
        },
        {
            icon: '/bulb.png',
            title: 'Innovation First',
            description: 'Constantly pushing boundaries to deliver cutting-edge features and exceptional user experiences.'
        },
        {
            icon: '/handshake.png',
            title: 'Customer Focused',
            description: 'Your success is our success. We prioritize customer satisfaction and long-term partnerships.'
        },
        {
            icon: '/plant.png',
            title: 'Sustainable Growth',
            description: 'Building long-term relationships and sustainable business practices for lasting impact.'
        },
        {
            icon: '/bolts.png',
            title: 'Speed & Quality',
            description: 'Delivering high-quality solutions rapidly without compromising on excellence.'
        },
        {
            icon: '/globe.png',
            title: 'Global Impact',
            description: 'Empowering businesses worldwide to achieve their goals and transform their operations.'
        }
    ];

    const ValuesCard = (value: valuesType) => (
        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
            <div className="text-4xl md:text-5xl mb-4 w-9"><img src={value.icon} alt="" /></div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                {value.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
                {value.description}
            </p>
        </div>
    )

    type teamMembersType = {
        id: number;
        name: string;
        role: string;
        initials: string;
        color: string;
    }

    const teamMembers: teamMembersType[] = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'CEO & Founder',
            initials: 'SJ',
            color: 'from-yellow-400 to-orange-400'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Chief Technology Officer',
            initials: 'MC',
            color: 'from-blue-400 to-purple-400'
        },
        {
            id: 3,
            name: 'Emily Rodriguez',
            role: 'Head of Design',
            initials: 'ER',
            color: 'from-pink-400 to-red-400'
        },
        {
            id: 4,
            name: 'David Kim',
            role: 'VP of Product',
            initials: 'DK',
            color: 'from-green-400 to-teal-400'
        }
    ];

    const MembersCard = (member: teamMembersType) => (
        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-200 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className={`w-24 h-24 md:w-32 md:h-32 bg-linear-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <span className="text-2xl md:text-3xl font-bold text-white">{member.initials}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                {member.name}
            </h3>
            <p className="text-base md:text-lg text-gray-600 font-medium">
                {member.role}
            </p>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Hero Section - Heading and Subheading Centered */}
            <section className="py-8 md:py-8 lg:py-8 px-4 md:px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-gray-900 mb-2">
                        About Us
                    </h1>
                    <div className="w-28 h-1 mx-auto bg-yellow-400 rounded-full"></div>
                    <p className="text-lg md:text-xl lg:text-xl text-gray-600 max-w-3xl mt-4 mx-auto">
                        Empowering businesses worldwide with innovative CRM solutions that drive growth, efficiency, and customer success
                    </p>
                </div>
            </section>
            <section className="mb-12 md:mb-12 lg:mb-14 mx-4 ">
                <div className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] border rounded-3xl bg-linear-to-br from-yellow-400 via-orange-400 to-pink-500 relative overflow-hidden">
                    {/* Image Placeholder - Replace with actual company image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-6xl md:text-7xl lg:text-8xl mb-4 block">🏢</span>
                            <p className="text-white text-xl md:text-2xl font-semibold">Company Image Space</p>
                        </div>
                    </div>
                    {/* Replace the above div with: */}
                    {/* <img src="your-company-image-url.jpg" alt="Company" className="w-full h-full object-cover" /> */}
                </div>
            </section>
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* About the Company Section */}
                <section className="mb-16 md:mb-12 lg:mb-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                Our Story
                            </h2>
                            <div className="w-20 h-1 bg-yellow-400 rounded-full mx-auto"></div>
                        </div>

                        <div className="bg-white rounded-2xl p-8 md:p-12 lg:p-16 border border-gray-200 shadow-lg">
                            <div className="space-y-6 text-base md:text-lg text-gray-600">
                                <p className="leading-relaxed">
                                    Founded in 2020, <span className="font-semibold text-gray-900">Tenx</span> began with a simple yet powerful vision: to revolutionize how businesses manage and nurture their customer relationships. What started as a small team of passionate entrepreneurs has evolved into a leading CRM platform trusted by thousands of companies worldwide.
                                </p>
                                <p className="leading-relaxed">
                                    Our journey has been driven by a relentless commitment to innovation and customer success. We've built a platform that not only meets the current needs of modern businesses but anticipates the challenges of tomorrow. Through continuous iteration and feedback from our amazing community, we've created a solution that truly makes a difference.
                                </p>
                                <p className="leading-relaxed">
                                    Today, Tenx serves organizations across diverse industries, from startups to enterprise companies, helping them streamline operations, boost productivity, and build lasting relationships with their customers. Our platform processes millions of interactions daily, enabling businesses to work smarter and grow faster.
                                </p>
                                <p className="leading-relaxed">
                                    But we're more than just a software company. We're a team of dreamers, builders, and problem-solvers who believe that great technology should empower people to achieve extraordinary things. Every feature we build, every decision we make, is guided by our commitment to your success.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 pt-12 border-t border-gray-200">
                                <StoryStats stats="5K+" Name="Active Customers"></StoryStats>
                                <StoryStats stats="50+" Name="Team Members"></StoryStats>
                                <StoryStats stats="99%" Name="Satisfaction Rate"></StoryStats>
                                <StoryStats stats="24/7" Name="Support Available"></StoryStats>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="mb-16 md:mb-12 lg:mb-16">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <div className="w-20 h-1 bg-yellow-400 rounded-full mx-auto mb-6"></div>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            The core principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {values.map((value, index) => (
                            <ValuesCard key={index} {...value} />
                        ))}
                    </div>
                </section>

                {/* Our Team Section */}
                <section className="mb-16 md:mb-12 lg:mb-16">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Our Team
                        </h2>
                        <div className="w-20 h-1 bg-yellow-400 rounded-full mx-auto mb-6"></div>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Meet the talented people behind Tenx
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {teamMembers.map((member, idx) => (
                            <MembersCard key={idx} {...member} />
                        ))}
                    </div>
                </section>
            </div>

        </div>
    )
}