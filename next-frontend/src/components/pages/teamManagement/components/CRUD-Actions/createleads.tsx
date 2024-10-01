import { useState } from "react";
import { Button } from "@/components/custom/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastProvider, notify } from "@/components/ui/Toast";
import { useCreateLead } from "@/lib/hooks/api/useLead";
import { useLoading } from "@/components/ui/ui/loading";
import { PlusIcon } from "@radix-ui/react-icons";
import { updatedSchema } from "./validationSchema";

type FormValues = z.infer<typeof updatedSchema>;
export function CreateLeads() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createLead = useCreateLead();
  const { loading, startLoading, stopLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(updatedSchema),
  });

  const onSubmit = async (data: FormValues) => {
    startLoading();
    try {
      await createLead.mutateAsync(data);
      notify("success", "Lead created successfully!");
      reset();
      setIsModalOpen(false);
    } catch (err: any) {
      notify(
        "error",
        err?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      stopLoading();
    }
  };

  return (
    <>
      <ToastProvider />
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Create Leads
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-lg w-[600px] max-h-[80vh] overflow-y-auto">
            {" "}
            <h2 className="text-lg font-semibold dark:text-gray-100">
              Form Title
            </h2>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Email Address"
                    {...register("email")}
                    className="w-full bg-gray-100 dark:bg-gray-700 dark:text-white"
                    isInvalid={!!errors.email && isSubmitted}
                  />
                  {errors.email && isSubmitted && (
                    <p className="text-red-500 text-sm dark:text-red-400">
                      {errors.email?.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <select
                    {...register("category")}
                    className="w-full p-2 bg-gray-100 dark:bg-gray-700 dark:text-white border dark:border-gray-600"
                  >
                    <option value="">Select Role</option>
                    <option value="category1">Admin</option>
                    <option value="category2">Restricted User</option>
                    <option value="category3">Super User</option>
                    <option value="category3">User</option>
                  </select>
                  {errors.category && isSubmitted && (
                    <p className="text-red-500 text-sm dark:text-red-400">
                      {errors.category?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
                <Button
                  variant="ghost"
                  className="text-red-500 border-red-500 hover:bg-red-100 dark:text-red-400 dark:border-red-400 dark:hover:bg-red-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
