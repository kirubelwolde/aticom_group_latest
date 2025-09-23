import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogTitle, DialogHeader, DialogContent,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Eye, CheckCircle, XCircle } from "lucide-react";

// Minimal type
type Application = {
  id: string;
  job_position_id: string;
  applicant_name: string;
  email: string;
  phone: string | null;
  experience: string | null;
  cover_letter: string | null;
  resume_url: string | null;
  status: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
  submitted_at: string | null;
  created_at: string | null;
};

type JobMap = { [id: string]: string };

const fetchApplications = async () => {
  const { data, error } = await supabase
    .from("job_applications")
    .select("*")
    .order("submitted_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};
const fetchJobs = async () => {
  const { data, error } = await supabase
    .from("job_positions")
    .select("id,title");
  if (error) throw new Error(error.message);
  return data || [];
};

const JobApplicationsAdmin: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: jobsData } = useQuery({ queryKey: ["job_positions_map"], queryFn: fetchJobs });
  const jobs: JobMap = {};
  (jobsData || []).forEach((j: any) => { jobs[j.id] = j.title; });

  const {
    data: applications,
    isLoading,
    error
  } = useQuery({
    queryKey: ["job_applications_admin"],
    queryFn: fetchApplications,
  });

  const [view, setView] = useState<Application | null>(null);

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("job_applications")
        .update({ status })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast({ title: "Status updated" });
      queryClient.invalidateQueries({ queryKey: ["job_applications_admin"] });
      setView(null);
    }
  });

  // Error Handling
  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading job applications: {error.message}
        <div className="mt-2 text-xs text-gray-400">
          Check if your user is authenticated with an @aticom.com email, and if RLS policies/data exist in the table.
        </div>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        No job applications found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>
      <div className="space-y-3">
        {(applications || []).map((app: Application) => (
          <Card key={app.id}>
            <CardContent className="flex flex-col md:flex-row md:items-center p-4">
              <div className="flex-1">
                <div className="font-bold">{app.applicant_name}</div>
                <div className="text-gray-600 text-xs">{app.email}</div>
                <div className="text-gray-700 text-sm">
                  for <span className="font-medium">{jobs[app.job_position_id]}</span>
                </div>
                <div className="text-gray-600 text-xs">
                  {app.submitted_at && new Date(app.submitted_at).toLocaleString()}
                  {app.status && (
                    <Badge className={`ml-2 capitalize ${app.status==="pending"?"bg-yellow-100 text-yellow-900":app.status==="reviewed"?"bg-green-100 text-green-900":app.status==="rejected"?"bg-red-100 text-red-900":""}`}>
                      {app.status}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-2 md:mt-0 flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setView(app)}>
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Dialog */}
      <Dialog open={!!view} onOpenChange={() => setView(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {view && (
            <div className="space-y-2">
              <div>
                <strong>For Job:</strong> {jobs[view.job_position_id]}
              </div>
              <div>
                <strong>Name:</strong> {view.applicant_name}
              </div>
              <div>
                <strong>Email:</strong> {view.email}
              </div>
              <div>
                <strong>Phone:</strong> {view.phone}
              </div>
              <div>
                <strong>Years of Experience:</strong> {view.experience}
              </div>
              <div>
                <strong>Cover Letter:</strong>
                <div className="bg-gray-50 rounded p-2 text-sm">{view.cover_letter}</div>
              </div>
              <div>
                <strong>Resume:</strong>{" "}
                {view.resume_url ? (
                  <a
                    href={view.resume_url}
                    target="_blank"
                    className="text-blue-700 underline"
                  >
                    View/Download
                  </a>
                ) : (
                  <em>Not Provided</em>
                )}
              </div>
              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    updateStatus.mutate({ id: view.id, status: "reviewed" })
                  }
                  className="bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-1" /> Mark Reviewed
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() =>
                    updateStatus.mutate({ id: view.id, status: "rejected" })
                  }
                  className="bg-red-600 text-white"
                >
                  <XCircle className="w-4 h-4 mr-1" /> Reject
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setView(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default JobApplicationsAdmin;
