import React, { useEffect, useState } from "react";
import AppliedJobs from "./AppliedJob";
import StageProgress from "./StageProgress";
import ActionButtons from "./ActionButton";
import { Link, Outlet, useParams } from "react-router-dom";
import { ApplicantProfileProps } from "@/types/company";
import { useQuery } from "react-query";
import { ApplicationApi } from "@/api/application.api";
import { ArrowRight, ChevronRight, Ellipsis } from "lucide-react";
import NavigationLink from './NavigationLink'
const ApplicantProfile: React.FC<ApplicantProfileProps> = ({ applicant }) => {
    const { id } = useParams();
    const [ user, setApplicant ] = useState({});
    const applicants = useQuery({ 
      queryKey: ["applicant"],
      queryFn: () => ApplicationApi.getApplication(id as string)
    });

    useEffect(() => {
      console.log("/api/v1/job/application", applicants.data, "user", user)
      const data = applicants.data?.data.applications
      if(data) {
          setApplicant(data)
      }
    }, [applicants])

  return (
    <div className="p-8">
      <header className="flex flex-wrap gap-10 justify-between items-center px-6 py-4 w-full bg-white">
        <div className="flex gap-6 items-center self-stretch my-auto min-w-[240px] text-slate-800">
          <div className="flex flex-col self-stretch my-auto min-w-[240px]">
            <h1 className="text-2xl font-semibold leading-tight">Applicant Details</h1>
          </div>
        </div>
        <button className="inline-flex gap-2 justify-center items-center rounded-lg self-stretch px-4 py-2 my-auto text-base font-bold leading-relaxed text-center text-orange-700 border border-orange-700 border-solid hover:text-white hover:bg-orange-700">
          <ArrowRight className="rotate-180" />
          <span className="self-stretch my-auto">Back</span>
        </button>
      </header>
      <div className="flex bg-white border rounded-lg p-1">
        <aside className="w-[320px] flex-shrink-0 flex flex-col p-6 bg-white border-r border-zinc-200">
          <header className="flex gap-5 items-start self-start text-base leading-relaxed text-orange-950">
          <div className={`w-12 h-12 text-lg  bg-gradient-to-br from-orange-400 to-orange-800 rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}>
      <span className="select-none capitalize">{user.applicantId?.username?.[0] || 'N'}</span>
    </div>
            <div>
              <h1 className="text-2xl font-semibold leading-tight">
                {user.applicantId?.username || 'Name'}
              </h1>
              <p className="mt-2 text-gray-400">{user.applicantId?.jobRole}</p>
            </div>
          </header>
          <AppliedJobs job={user?.jobId}  />
          <StageProgress stage={applicant.stage} />
          <ActionButtons applicant={user?.applicantId } />
          <hr className="mt-5 w-full bg-zinc-200 min-h-[1px]" />
          <section className="flex flex-col items-start mt-5 w-full text-base leading-relaxed bg-white">
            <h2 className="gap-px self-stretch w-full text-xl font-semibold leading-tight whitespace-nowrap text-orange-950">Contact</h2>
            <div className="flex gap-4 items-start mt-4 whitespace-nowrap">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/acde2dca327cee7b4fecc3228c70373168846f3971b56480e235ff3b376d53ee?placeholderIfAbsent=true&apiKey=942cdf39840f4ab69951fbe195dac732" alt="" className="object-contain shrink-0 w-6 aspect-square" />
              <div className="flex flex-col">
                <span className="text-slate-500">Email</span>
                <a href={`mailto:${user.applicantId?.email}`} className="text-slate-800">{user.applicantId?.email}</a>
              </div>
            </div>
            <div className="flex gap-4 items-start mt-4">
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/478a2fd5772c5740cc9174aff22ed4988d90f39feb98925f3b61328024735c13?placeholderIfAbsent=true&apiKey=942cdf39840f4ab69951fbe195dac732" alt="" className="object-contain shrink-0 w-6 aspect-square" />
              <div className="flex flex-col">
                <span className="text-slate-500">Phone</span>
                <a href={`tel:${user.applicantId?.phone}`} className="text-slate-800">{user.applicantId?.phone}</a>
              </div>
            </div>
          </section>
        </aside>
        <main className="flex-1">
        <nav className="flex flex-col pt-4 font-semibold leading-relaxed bg-white">
      <ul className="flex flex-wrap gap-10 items-start pl-6 w-full bg-white shadow-sm max-md:pl-5">
        <NavigationLink to="profile">
          Applicant Profile
        </NavigationLink>
        <NavigationLink to="resume">
          Resume
        </NavigationLink>
        <NavigationLink to="hiringstage">
          Hiring Progress
        </NavigationLink>
        <NavigationLink to="interview-schedule">
          Interview Schedule
        </NavigationLink>
      </ul>
    </nav>
          <Outlet context={{ user, applicant, applicantId: user.applicantId?._id }} />
        </main>
      </div>
    </div>
  );
};

export default ApplicantProfile;