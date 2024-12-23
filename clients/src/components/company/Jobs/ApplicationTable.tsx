import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BriefcaseIcon,
  ChevronRight,
  MoreHorizontal,
  PlusCircle,
  Share,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useOutletContext } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";

const ApplicationTable: React.FC = () => {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case "In Review":
        return "text-amber-400 border-amber-400";
      case "Shortlisted":
        return "text-indigo-600 border-indigo-600";
      case "Declined":
        return "text-red-400 border-red-400";
      case "Hired":
        return "text-emerald-300 border-emerald-300";
      case "Interview":
        return "text-sky-400 border-sky-400";
      default:
        return "text-slate-500 border-slate-500";
    }
  };

  const navigate = useNavigate();
  const { data } = useOutletContext();

  useEffect(() => {
    console.log("application", data);
  }, [data]);

  return (
    <>
      {data && data?.length > 0 ? (
        <>
          <Table className="">
            <TableHeader>
              <TableRow className="hover:bg-white border">
                <TableHead className="w-[50px]">
                  <Checkbox />
                </TableHead>
                <TableHead className="min-w-[200px]">Full Name</TableHead>
                <TableHead className="min-w-[150px]">Hiring Stage</TableHead>
                <TableHead className="min-w-[150px]">Applied Date</TableHead>
                <TableHead className="min-w-[200px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data?.map((application, index) => (
                  <TableRow
                    key={application._id}
                    className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                  >
                    <TableCell className="w-[50px]">
                      <Checkbox />
                    </TableCell>
                    <TableCell className="min-w-[200px]">
                      <div className="flex items-center gap-4">
                        {/* <img 
                      src={applicant.avatar} 
                      alt={`${applicant.name}'s avatar`} 
                      className="w-10 h-10 rounded-full object-cover"
                    /> */}
                        <span className="font-medium text-slate-800">
                          {application?.applicantId?.username}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="min-w-[150px]">
                      <span
                        className={`px-2.5 py-1.5 border border-solid rounded-full text-sm font-semibold ${getStageColor(
                          application?.stage
                        )}`}
                      >
                        {application?.status}
                      </span>
                    </TableCell>
                    <TableCell className="min-w-[150px] font-medium text-slate-800">
                      {format(application?.appliedAt, "PPP")}
                    </TableCell>
                    <TableCell className="min-w-[200px]">
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={() => {
                            navigate(
                              `/company/application/applicant/${application?._id}/profile`,
                            );
                          }}
                          variant="outline"
                          className="bg-gray-50 text-orange-700 border-orange-700 hover:bg-orange-700 hover:text-white hover:shadow-lg"
                        >
                          See Application
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <nav className="flex flex-wrap gap-10 justify-between items-center px-4 text-base leading-relaxed bg-white border-t pt-2 w-full">
            <div className="flex gap-4 items-center self-stretch my-auto font-medium min-w-[240px] text-slate-500">
              <span>View</span>
              <Select>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>Applicants per page</span>
            </div>

            <div className="flex gap-2 justify-center items-center">
              <Button variant="ghost" size="icon" disabled={true}>
                <ChevronRight className="rotate-180" />
              </Button>
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "ghost"}
                  className={`w-[46px] h-[46px] ${
                    page === 1
                      ? "bg-orange-700 hover:bg-white hover:border-orange-700 border hover:text-orange-700 font-semibold"
                      : ""
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button variant="ghost" size="icon">
                <ChevronRight />
              </Button>
            </div>
          </nav>
        </>
      ) : (
        <Card className="w-full my-8">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-gray-500 p-4 mb-4">
              <BriefcaseIcon className="h-8 w-8 text-white" />
            </div>

            <h3 className="text-xl font-semibold text-orange-900 mb-2">
              No Applicants Yet
            </h3>

            <p className="text-gray-600 text-center mb-6 max-w-sm">
              Your job posting hasn't received any applications yet. Share the
              opening on social media or extend the reach by updating the job
              details to attract more candidates.
            </p>

            <Button className="flex items-center gap-2 bg-orange-700 hover:bg-orange-900">
              <Share className="h-4 w-4" />
              Share Job Posting
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ApplicationTable;
