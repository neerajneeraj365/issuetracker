"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/ValidationSchemas";
import Spinner from "@/app/components/Spinner";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <MdErrorOutline />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {/*<ErrorMessage>{error.title?.message}</ErrorMessage>*/}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {/* <ErrorMessage>{error.description?.message}</ErrorMessage> */}
        <Button disabled={isSubmitting}>
          {isSubmitting && <Spinner />} Submit New Issue
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
