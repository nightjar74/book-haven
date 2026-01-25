"use client";

import React, { useTransition } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useBookSelector } from "@/app/context/book-selector-context";
import { cn } from "@/lib/utils";
import { updateAdminCollections } from "@/lib/actions/collections";
import { toast } from "@/hooks/use-toast";
import { Collection } from "@/types";

type Props = {
  collections: Collection[];
};

const AdminCard = ({ collections }: Props) => {
  //console.log("collections for cards", collections);
  const [isPending, startTransition] = useTransition();
  const { activeCardIndex, setActiveCardIndex, selections, clearSelections } =
    useBookSelector();
  const form = useForm({
    defaultValues: {
      items: collections?.length > 0 ? collections : [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "items",
  });

  function onSubmit(values: { items: Collection[] }) {
    const payload = values.items.map((item, index) => ({
      ...item,
      subtitle: item.subtitle || "",
      bookIds: selections[index] || [],
    }));
    //console.log("payload", payload);

    startTransition(async () => {
      const result = await updateAdminCollections(payload);

      if (result.success) {
        toast({
          title: "successfully updated collections",
        });
        //console.log("Updated successfully!");
      } else {
        toast({
          title: "failed to update collections",
          description: result.error,
          variant: "destructive",
        });
        console.error(result.error);
      }
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full w-full mt-7 mx-7"
      >
        <Button
          type="button"
          variant="ghost"
          className="text-slate-500 hover:text-red-600 absolute top-5 left-1 md:right-[140px] md:top-5 md:left-auto"
          onClick={clearSelections}
          disabled={isPending}
        >
          Clear Selected Books
        </Button>
        <Button
          type="submit"
          className="absolute top-5 right-1 md:right-5 md:top-5"
        >
          {isPending ? "Updating..." : "Update All"}
        </Button>
        <div className="px-4 flex md:flex-row flex-col gap-2 justify-between pt-7">
          {fields.map((item, index) => {
            const isActive = activeCardIndex === index;
            const currentImage = form.watch(`items.${index}.imageSrc`);
            return (
              <React.Fragment key={item.id}>
                {/* Desktop version */}
                <div
                  onClick={() => setActiveCardIndex(index)}
                  className={cn(
                    "h-[200px] group hidden relative md:grid grid-rows-1 w-full max-w-sm overflow-hidden rounded-xl border p-4 text-left shadow-sm transition-all cursor-pointer",
                    isActive
                      ? "bg-[#9d3128] border-[#9d3128] shadow-md ring-2 ring-offset-2 ring-[#9d3128]"
                      : "bg-white border-slate-200 hover:bg-slate-50",
                  )}
                >
                  <div className="flex flex-col pr-4 w-full h-7 justify-center mt-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              {...field}
                              className={cn(
                                "bg-transparent border-none outline-none text-xl font-normal tracking-tight uppercase w-full transition-colors",
                                isActive ? "text-white" : "text-gray-900",
                              )}
                              placeholder="Title"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex w-full flex-row justify-between gap-2">
                    <FormField
                      control={form.control}
                      name={`items.${index}.subtitle`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <textarea
                              {...field}
                              value={field.value ?? ""}
                              className={cn(
                                "bg-transparent border-none outline-none w-full text-md leading-tight mt-2 resize-none transition-colors",
                                isActive ? "text-white/80" : "text-gray-500",
                              )}
                              placeholder="Subtitle"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-red-50">
                      {!currentImage ? (
                        <div className="h-full w-full bg-orange-400 transition-transform duration-300 group-hover:scale-110"></div>
                      ) : (
                        <img
                          src={`${currentImage}.png`}
                          alt={"info"}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile version */}
                <div
                  onClick={() => setActiveCardIndex(index)}
                  className={cn(
                    "flex items-center justify-center md:hidden z-50 flex-col w-full h-[140px] overflow-hidden rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all active:scale-[0.98] group",
                    isActive
                      ? "bg-[#9d3128] border-[#9d3128] shadow-md ring-2 ring-offset-2 ring-[#9d3128]"
                      : "bg-white border-slate-200",
                  )}
                >
                  <div className="relative w-full h-[80px] flex items-center justify-center overflow-hidden ">
                    {!currentImage ? (
                      <div className="h-[55px] w-[55px] rounded-full bg-orange-400 transition-transform duration-300 group-active:scale-110"></div>
                    ) : (
                      <img
                        src={`${currentImage}.png`}
                        alt={"info"}
                        className="h-[55px] w-[55px] object-cover rounded-full transition-transform duration-300 group-active:scale-110"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <h3 className="text-[60%] font-normal tracking-tight text-center h-8 pt-2 text-gray-900 uppercase mb-3">
                    {form.watch(`items.${index}.title`)}
                  </h3>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </form>
    </Form>
  );
};

export default AdminCard;
