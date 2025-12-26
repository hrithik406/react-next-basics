export default function LeadsContactsPage() {
  const leads = [
    {
      id: 1,
      initials: 'JA',
      name: 'John Anderson',
      title: 'VP of Operations at TechCorp Industries',
      email: 'john@techcorp.com',
      phone: '+1(555) 123-4567',
      company: 'TechCorp Industries',
      location: 'San Francisco, CA',
      status: 'qualified',
      source: 'website',
      dealValue: '$85K',
      assignedTo: 'Sarah Chen',
      avatar: 'SC'
    },
    {
      id: 2,
      initials: 'ER',
      name: 'Emily Roberts',
      title: 'Director of IT at Global Solutions',
      email: 'john@techcorp.com',
      phone: '+1(555) 123-4567',
      company: 'Global Solutions',
      location: 'New York, NY',
      status: 'contacted',
      source: 'linkedin',
      dealValue: '$62K',
      assignedTo: 'Michael Ross',
      avatar: "MR"
    },
    {
      id: 3,
      initials: 'DC',
      name: 'David Chen',
      title: 'CEO of StartupHub',
      email: 'david@startuphub.io',
      phone: '+1(555) 345-6789',
      company: 'StartupHub',
      location: 'Austin, TX',
      status: 'new',
      source: 'referral',
      dealValue: '$45K',
      assignedTo: 'Emily Davis',
      avatar: "ED"
    },
    {
      id: 4,
      initials: 'LM',
      name: 'Lisa Martinez',
      title: 'Product Manager at Innovate Corp',
      email: 'lisa@innovate.com',
      phone: '+1(555) 456-7890',
      company: 'Innovate Corp',
      location: 'Chicago, IL',
      status: 'qualified',
      source: 'website',
      dealValue: '$35K',
      assignedTo: 'Lisa Martinez',
      avatar: 'LM'
    }
  ];

  const statusColors:Record<string,any> = {
    qualified: 'bg-green-100 text-green-700',
    contacted: 'bg-purple-100 text-purple-700',
    new: 'bg-blue-100 text-blue-700'
  };

  const sourceColors:Record<string,any> = {
    website: 'bg-orange-100 text-orange-700',
    linkedin: 'bg-blue-100 text-blue-700',
    referral: 'bg-red-100 text-red-700'
  };

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-200 border-b border-gray-200 px-2 py-3 md:px-6  md:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 max-w-xl">
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg hover:cursor-pointer"
                // onClick={toggleSidebar}
              >
                <span className="text-xl text-black">☰</span>
              </button>
              <div className="relative flex-1 -ml-2">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                <input
                  type="text"
                  placeholder="Search ....."
                  className="w-full bg-white pl-10 pr-4 py-2 text-sm text-black md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <span className="hidden md:block absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs">⌘  K
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-2 mr-1">
              <button className="p-2 px-2.5 border rounded-3xl bg-gray-50 hover:bg-gray-100  hidden md:block">
                <span className="text-gray-600">🔍</span>
              </button>
              <button className="p-2 px-2.5 border rounded-3xl bg-gray-50 hover:bg-gray-100 hidden md:block">
                <span className="text-gray-600">⚡</span>
              </button>
              <button className="p-2 px-2.5 border rounded-3xl bg-gray-50 hover:bg-gray-100 ">
                <span className="text-gray-600">🔔</span>
              </button>
              <div className="flex items-center bg-gray-50 border rounded-3xl p-1 pr-1 space-x-2">
                <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
                <span className="font-medium text-black hidden sm:block">Warren</span>
                <span className="text-black sm:block">▼</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto px-4 md:px-4 lg:px-4 py-4 md:py-6">
          {/* Page Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Leads & Contacts</h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">Manage your leads and customer contacts</p>
            </div>
            <button className="flex items-center justify-center space-x-2 bg-yellow-200 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-medium text-sm md:text-base whitespace-nowrap">
              <span className="text-xl">+</span>
              <span>Add Lead</span>
            </button>
          </div>

          {/* Tabs and Filters */}
          <div className="rounded-lg mb-6">
            <div className="flex flex-col flex-1 lg:flex-row lg:items-center lg:justify-between gap-4 ">
              <div className="flex items-center flex-1">
                <div className="relative flex-1 lg:flex-initial ">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search leads..."
                    className="w-full text-black lg:w-80 xl:w-140 pl-10  py-3 text-sm bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
              {/* <div className="flex gap-x-2 items-center"> */}
              <div className="flex flex-wrap max-lg:w-115 max-md:w-100 items-center gap-2 bg-gray-50 p-1 border rounded-lg">
                <button className="px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm bg-yellow-100 text-gray-900 hover:cursor-pointer">
                  All Leads (6)
                </button> 
                <button className="px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm text-gray-600 hover:bg-gray-100 hover:cursor-pointer">
                  New (2)
                </button>
                <button className="px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm text-gray-600 hover:bg-gray-100 hover:cursor-pointer">
                  Qualified (2)
                </button>
                <button className="px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm text-gray-600 hover:bg-gray-100 hover:cursor-pointer">
                  Contacted (2)
                </button>
              </div>
                <button className="flex  bg-gray-50 text-gray-600 max-md:w-20 max-lg:w-25 space-x-1 h-fit px-2 md:px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-100 text-xs md:text-sm  hover:cursor-pointer">
                  <span>⚡</span>
                  <span>Filters</span>
                </button>
                {/* </div> */}
            </div>
          </div>

          {/* Leads List */}
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex items-start space-x-3 md:space-x-4 flex-1">
                    {/* Avatar */}
                    <div className="w-10 mt-1 h-10 md:w-12 md:h-12 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-gray-600 font-semibold text-sm md:text-base">{lead.initials}</span>
                    </div>

                    {/* Lead Info */}
                    <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-2">
                      <div className="flex flex-wrap items-center gap-2 ">
                        <h3 className="text-base md:text-lg font-semibold text-gray-900 wrap-break-words">{lead.name}</h3>
                      </div>
                      <div className="flex gap-x-4 justify-end">
                        <span className={`px-2 h-fit md:px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap ${statusColors[lead.status]}`}>
                            {lead.status}
                        </span>
                        <span className={`px-2 md:px-3 py-2 h-fit rounded-full text-xs font-bold whitespace-nowrap ${sourceColors[lead.source]}`}>
                            {lead.source}
                        </span>
                        </div>
                      </div>
                      <p className="text-sm md:text-base text-gray-600 mb-3 -mt-1 md:mb-4 wrap-break-words">{lead.title}</p>

                      {/* Contact Details */}
                      <div className="grid grid-cols-2 pt-4 gap-2 md:gap-4 text-xs md:text-sm">
                        <div className="flex items-center space-x-2 text-gray-600 truncate">
                          <span className="shrink-0">✉️</span>
                          <span className="truncate">{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 truncate">
                          <span className="shrink-0">📞</span>
                          <span className="truncate">{lead.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 truncate">
                          <span className="shrink-0">📍</span>
                          <span className="truncate">{lead.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 truncate">
                          <span className="shrink-0">🏢</span>
                          <span className="truncate">{lead.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Deal Value and Assigned To */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start space-x-4 lg:space-x-0 lg:space-y-3 lg:ml-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                    <div className="text-left lg:text-right">
                      <p className="text-xs text-gray-500 mb-1">Deal Value</p>
                      <p className="text-lg md:text-xl mb-4 font-bold text-green-600">{lead.dealValue}</p>
                    </div>
                    <div className="flex items-center mb-5 space-x-2">
                      <div className="w-7 h-7 flex items-center justify-center text-s text-gray-600 bg-gray-300 rounded-full">{lead.avatar}</div>
                      <span className="text-xs md:text-sm text-gray-600">{lead.assignedTo}</span>
                    </div>
                    <button className=" hover:bg-gray-100 rounded lg:self-end">
                      <span className="text-gray-400">⋮</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
} 