import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit, Trash2, Plus, Building } from "lucide-react";

// Define the job position type
type JobPosition = {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  salary: string;
  experience: string;
  posted_date: string;
  urgent: boolean;
  description: string;
  requirements: string[];
  benefits: string[];
  active: boolean;
  created_at: string;
  updated_at: string;
};

// Form schema for validation
const jobFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  department: z.string().min(1, "Department is required"),
  type: z.string().min(1, "Job type is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().min(1, "Salary information is required"),
  experience: z.string().min(1, "Experience level is required"),
  description: z.string().min(1, "Job description is required"),
  requirements: z.string().min(1, "Requirements are required"),
  benefits: z.string().min(1, "Benefits are required"),
  urgent: z.boolean().default(false),
  active: z.boolean().default(true),
});

const fetchJobPositions = async () => {
  const { data, error } = await supabase
    .from("job_positions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data || [];
};

const JobPositionsAdmin: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [currentJob, setCurrentJob] = React.useState<JobPosition | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  console.log("Dialog state:", { isDialogOpen, currentJob }); // Debug log

  const {
    data: positions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["job_positions_admin"],
    queryFn: fetchJobPositions,
  });

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      department: "",
      type: "",
      location: "",
      salary: "",
      experience: "",
      description: "",
      requirements: "",
      benefits: "",
      urgent: false,
      active: true,
    },
  });

  const createJobMutation = useMutation({
    mutationFn: async (values: z.infer<typeof jobFormSchema>) => {
      const requirementsArray = values.requirements
        .split("\n")
        .filter((item) => item.trim() !== "");

      const benefitsArray = values.benefits
        .split("\n")
        .filter((item) => item.trim() !== "");

      const insertObj = {
        title: values.title,
        department: values.department,
        type: values.type,
        location: values.location,
        salary: values.salary,
        experience: values.experience,
        description: values.description,
        requirements: requirementsArray,
        benefits: benefitsArray,
        urgent: values.urgent,
        active: values.active,
      };

      const { data, error } = await supabase
        .from("job_positions")
        .insert([insertObj]);

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job_positions_admin"] });
      toast({ title: "Job position created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error creating job position",
        description: (error as Error).message,
        variant: "destructive",
      });
    },
  });

  const updateJobMutation = useMutation({
    mutationFn: async (values: z.infer<typeof jobFormSchema>) => {
      if (!currentJob) return;

      const requirementsArray = values.requirements
        .split("\n")
        .filter((item) => item.trim() !== "");
      const benefitsArray = values.benefits
        .split("\n")
        .filter((item) => item.trim() !== "");

      const { data, error } = await supabase
        .from("job_positions")
        .update({
          ...values,
          requirements: requirementsArray,
          benefits: benefitsArray,
          updated_at: new Date().toISOString(),
        })
        .eq("id", currentJob.id);

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job_positions_admin"] });
      toast({ title: "Job position updated successfully" });
      setIsDialogOpen(false);
      setCurrentJob(null);
    },
    onError: (error) => {
      toast({
        title: "Error updating job position",
        description: (error as Error).message,
        variant: "destructive",
      });
    },
  });

  const deleteJobMutation = useMutation({
    mutationFn: async () => {
      if (!currentJob) return;

      const { error } = await supabase
        .from("job_positions")
        .delete()
        .eq("id", currentJob.id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job_positions_admin"] });
      toast({ title: "Job position deleted successfully" });
      setIsDeleteDialogOpen(false);
      setCurrentJob(null);
    },
    onError: (error) => {
      toast({
        title: "Error deleting job position",
        description: (error as Error).message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof jobFormSchema>) => {
    if (currentJob) {
      updateJobMutation.mutate(values);
    } else {
      createJobMutation.mutate(values);
    }
  };

  const handleEdit = (job: JobPosition) => {
    setCurrentJob(job);
    form.reset({
      title: job.title,
      department: job.department,
      type: job.type,
      location: job.location,
      salary: job.salary,
      experience: job.experience,
      description: job.description,
      requirements: job.requirements.join("\n"),
      benefits: job.benefits.join("\n"),
      urgent: job.urgent,
      active: job.active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (job: JobPosition) => {
    setCurrentJob(job);
    setIsDeleteDialogOpen(true);
  };

  const handleAddNew = () => {
    console.log("Add New Position button clicked!"); // Debug log
    setCurrentJob(null);
    form.reset({
      title: "",
      department: "",
      type: "",
      location: "",
      salary: "",
      experience: "",
      description: "",
      requirements: "",
      benefits: "",
      urgent: false,
      active: true,
    });
    setIsDialogOpen(true);
    console.log("Dialog state after handleAddNew:", { isDialogOpen: true }); // Debug log
  };

  const handleDialogOpenChange = (open: boolean) => {
    console.log("Dialog open change:", open); // Debug log
    setIsDialogOpen(open);
    if (!open) {
      setCurrentJob(null);
      form.reset();
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading job positions: {(error as Error).message}
        <div className="mt-2 text-xs text-gray-400">
          Check if your user is authenticated with an @aticom.com email, and if
          RLS policies/data exist in the table.
        </div>
      </div>
    );
  }

  if (!positions || positions.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        <p className="mb-4">No job positions found.</p>
        <Button
          onClick={handleAddNew}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Position
        </Button>

        {/* Job Form Dialog - always rendered */}
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {currentJob ? "Edit Job Position" : "Add New Job Position"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Software Engineer"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Engineering" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Type</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Full-time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Addis Ababa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salary</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. ETB: 50,000 - ETB: 70,000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Experience</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 2-3 years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the job role and responsibilities"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirements (one per line)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Bachelor's degree in Computer Science
3+ years of experience with React
Strong communication skills"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefits (one per line)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Competitive salary
Health insurance
Flexible working hours"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-4">
                  <FormField
                    control={form.control}
                    name="urgent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Mark as Urgent</FormLabel>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>Active (visible on website)</FormLabel>
                      </FormItem>
                    )}
                  />
                </div>

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDialogOpenChange(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {currentJob ? "Update Position" : "Create Position"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog - always rendered */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to delete the job position:{" "}
              <strong>{currentJob?.title}</strong>?
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteJobMutation.mutate()}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {!positions || positions.length === 0 ? (
        <div className="p-8 text-center text-gray-600">
          <p className="mb-4">No job positions found.</p>
          <Button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Position
          </Button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Job Positions</h1>
            <Button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700"
              type="button"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Position
            </Button>
          </div>
          <div className="grid gap-4">
            {positions?.map((job: JobPosition) => (
              <Card key={job.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        {job.urgent && (
                          <Badge className="bg-red-500">Urgent</Badge>
                        )}
                        {!job.active && (
                          <Badge variant="outline" className="text-gray-500">
                            Inactive
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600">
                        {job.department} • {job.type} • {job.location}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Posted: {new Date(job.posted_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(job)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(job)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Job Form Dialog - always rendered */}
      <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentJob ? "Edit Job Position" : "Add New Job Position"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Software Engineer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Engineering" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Type</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Full-time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Addis Ababa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. ETB: 50,000 - ETB: 70,000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 2-3 years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the job role and responsibilities"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirements (one per line)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Bachelor's degree in Computer Science
3+ years of experience with React
Strong communication skills"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Benefits (one per line)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Competitive salary
Health insurance
Flexible working hours"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-4">
                <FormField
                  control={form.control}
                  name="urgent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Mark as Urgent</FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Active (visible on website)</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDialogOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {currentJob ? "Update Position" : "Create Position"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog - always rendered */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the job position:{" "}
            <strong>{currentJob?.title}</strong>?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteJobMutation.mutate()}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobPositionsAdmin;
