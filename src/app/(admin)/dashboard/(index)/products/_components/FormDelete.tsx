"use client";

import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteProduct } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: number;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button variant={"destructive"} size={"sm"} disabled={pending}>
      <Trash className="size-4 mr-2" />
      {pending ? "Loading..." : "Delete"}
    </Button>
  );
};

const FormDelete = ({ id }: FormDeleteProps) => {
  const deleteProductById = (_: unknown, formData: FormData) =>
    deleteProduct(_, formData, id);

  const [state, formAction] = useFormState(deleteProductById, initialState);

  return (
    <form action={formAction}>
      <SubmitButton />
    </form>
  );
};

export default FormDelete;
