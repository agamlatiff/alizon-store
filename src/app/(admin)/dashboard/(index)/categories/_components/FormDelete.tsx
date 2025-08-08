"use client";

import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { deleteCategory } from "../lib/actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: number;
}

const SubmitButton = async () => {
  const { pending } = useFormStatus();
  return (
    <Button variant={"destructive"} size={"sm"} disabled={pending}>
      <Trash className="size-4 mr-2" />
      {pending ? "Loading..." : "Delete"}
    </Button>
  );
};

const FormDelete = ({ id }: FormDeleteProps) => {
  const deleteCategoryById = (_: unknown, formData: FormData) =>
    deleteCategory(_, formData, id);

  const [state, formAction] = useFormState(deleteCategoryById, initialState);

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
};

export default FormDelete;
