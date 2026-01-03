import React from "react";
import HeaderButton from "./components/HeaderButton";
import LeadsBtn from "./components/LeadsBtn";
import ContactBtn from "./components/ContactBtn";

export default function LeadsContactsPage() {

  type leadsType = {
    id: number;
    initials: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    company: string;
    location: string;
    status: string;
    source: string;
    dealValue: string;
    assignedTo: string;
    avatar: string;
  }

  const leads: leadsType[] = [
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

  const statusColors: Record<string, any> = {
    qualified: 'bg-green-100 text-green-700',
    contacted: 'bg-purple-100 text-purple-700',
    new: 'bg-blue-100 text-blue-700'
  };

  const sourceColors: Record<string, any> = {
    website: 'bg-orange-100 text-orange-700',
    linkedin: 'bg-blue-100 text-blue-700',
    referral: 'bg-red-100 text-red-700'
  };

  const LeadsCard = (lead: leadsType) => (
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
                <span className={`px-2 h-fit md:px-3 py-1 rounded-2xl text-xs font-bold whitespace-nowrap ${statusColors[lead.status]}`}>
                  {lead.status}
                </span>
                <span className={`px-2 md:px-3 py-1 h-fit rounded-full text-xs font-bold whitespace-nowrap ${sourceColors[lead.source]}`}>
                  {lead.source}
                </span>
              </div>
            </div>
            <p className="text-sm md:text-base text-gray-600 mb-3 -mt-1 md:mb-4 wrap-break-words">{lead.title}</p>

            {/* Contact Details */}
            <div className="grid grid-cols-2 pt-4 gap-2 md:gap-4 text-xs md:text-sm">
              <ContactBtn iconSrc="/mail.png">{lead.email}</ContactBtn>
              <ContactBtn iconSrc="/phone.png">{lead.phone}</ContactBtn>
              <ContactBtn iconSrc="/building.png">{lead.company}</ContactBtn>
              <ContactBtn iconSrc="/location.png">{lead.location}</ContactBtn>
            </div>
          </div>
        </div>

        {/* Right Side - Deal Value and Assigned To */}
        <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start space-x-4 lg:space-x-0 lg:space-y-3 lg:ml-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
          <div className="text-left lg:text-right">
            <p className="text-xs text-gray-500 mb-1">Deal Value</p>
            <p className="text-lg md:text-xl mb-4 font-bold text-green-600">{lead.dealValue}</p>
          </div>
          <div className="flex items-center mb-5 max-lg:mb-0 space-x-2">
            <div className="w-7 h-7 flex items-center justify-center text-s text-gray-600 bg-gray-300 rounded-full">{lead.avatar}</div>
            <span className="text-xs md:text-sm text-gray-600">{lead.assignedTo}</span>
          </div>
          <button className=" hover:bg-gray-100 rounded lg:self-end">
            <span className="text-gray-400">⋮</span>
          </button>
        </div>
      </div>
    </div>
  )

  // const request = {
  //   headers: "",
  //   method: "GET",
  //   body: {
  //     name: "kriss"
  //   }
  // } 

  // request.body.name

  // function Temp(){
  //   return (
  //     <>
  //     {request.body.name}
  //     </>
  //   )
  // }

  const obj = {
    name: "henry",
    age: 12
  }

  const obj2 = {
    ...obj,
    name: "hrithik",
  }

  return (

    <div className=" flex min-h-screen">
      {/* {Temp()} */}
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-transparent">
        {/* Page Content */}
        <main className="flex-1 px-4 md:px-4 lg:px-4 pb-4 md:pb-6">
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
                  <span className="absolute w-4.5 left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"><img src="/search.png" alt="" /></span>
                  <input
                    type="text"
                    placeholder="Search leads..."
                    className="w-full text-black lg:w-80 xl:w-120 pl-10  py-3 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>
              {/* <div className="flex gap-x-2 items-center"> */}
              <div className="flex flex-wrap max-lg:w-115 max-md:w-100 items-center gap-2 bg-white p-1 border rounded-lg">
                <LeadsBtn className="bg-yellow-100 text-gray-900">All Leads (6)</LeadsBtn>
                <LeadsBtn className="text-gray-600 hover:bg-gray-100">New (2)</LeadsBtn>
                <LeadsBtn className="text-gray-600 hover:bg-gray-100">Qualified (2)</LeadsBtn>
                <LeadsBtn className="text-gray-600 hover:bg-gray-100">Contacted (2)</LeadsBtn>
              </div>
              <button className="flex  bg-white text-gray-600 max-md:w-20 max-lg:w-25 space-x-1 h-fit px-2 md:px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-100 text-xs md:text-sm  hover:cursor-pointer">
                <span className="w-4 pt-px "><img src="/filter.png" alt="" /></span>
                <span className="pl-0.5">Filters</span>
              </button>
              {/* </div> */}
            </div>
          </div>

          {/* Leads List */}
          <div className="space-y-4">
            {leads.map((lead, index) => (
              <LeadsCard key={index} {...lead} company={lead.company + " LTD"} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
} 