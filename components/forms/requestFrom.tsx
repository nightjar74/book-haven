"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { requestFormSchema } from "@/lib/validations";
import createRequest from "@/lib/actions/request";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function RequestForm({ id }: { id: any }) {
  //console.log("id:", id);
  const router = useRouter();
  const form = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: {
      title: "",
      author: "",
      publisher: "",
    },
  });

  //console.log("Form errors:", form.formState.errors);
  //console.log("Form isValid:", form.formState.isValid);
  const onSubmit = async (values: z.infer<typeof requestFormSchema>) => {
    const result = await createRequest({
      ...values,
      publisher: values.publisher || "",
      userId: id,
    });

    if (result.success) {
      toast({
        title: "Success",
        description: "Request created successfully",
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-full mx-auto mt-10 p-6 bg-white rounded-xl border shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Request a Book</h1>
        <p className="text-sm text-muted-foreground">
          Can't find what you're looking for? Let us know.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            //console.log("onSubmit called with values:", values);
            onSubmit(values);
          })}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. The Great Gatsby"
                    {...field}
                    className="h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. F. Scott Fitzgerald"
                    {...field}
                    className="h-[50px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Charles Scribner's Sons"
                    {...field}
                    className="h-[50px]"
                  />
                </FormControl>
                <FormDescription>
                  Optional: Enter the edition or publisher name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-[125px]">
            Submit Request
          </Button>
        </form>
      </Form>
    </div>
  );
}
