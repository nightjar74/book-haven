"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BookQuantitySchema } from "@/lib/validations";

interface Props {
  defaultValues: { totalCopies: number; availableCopies: number };
  onSubmit: (
    values: z.infer<typeof BookQuantitySchema>
  ) => Promise<{ success: boolean; error?: string }>;
}

const QuantityForm = ({ defaultValues, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof BookQuantitySchema>>({
    resolver: zodResolver(BookQuantitySchema),
    defaultValues,
  });

  const handleSubmit = async (values: z.infer<typeof BookQuantitySchema>) => {
    const result = await onSubmit(values);
    if (!result.success) {
      console.error(result.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800">Total Copies</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="w-full min-h-14 border-[1px] border-slate-400 text-base font-bold placeholder:font-normal text-slate-700 placeholder:text-light-100 focus-visible:ring-0 focus-visible:shadow-none bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableCopies"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800">Available Copies</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  className="w-full min-h-14 border-[1px] border-slate-400 text-base font-bold placeholder:font-normal text-slate-700 placeholder:text-light-100 focus-visible:ring-0 focus-visible:shadow-none bg-white"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="form-btn w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Updating..." : "Update Quantity"}
        </Button>
      </form>
    </Form>
  );
};

export default QuantityForm;
