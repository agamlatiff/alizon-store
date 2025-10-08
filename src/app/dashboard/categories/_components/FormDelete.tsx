"use client";

import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { deleteCategory } from "../lib/actions";
import { useActionState } from "react";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: number;
}

const FormDelete = ({ id }: FormDeleteProps) => {
  const deleteCategoryById = (_: unknown, formData: FormData) =>
    deleteCategory(_, formData, id);

  const [state, formAction, pending] = useActionState(deleteCategoryById, initialState);

  return (
    <form action={formAction}>
      <Button variant={"destructive"} size={"sm"} disabled={pending}>
        <Trash className="size-4 mr-2" />
        {pending ? "Loading..." : "Delete"}
      </Button>
    </form>
  );
};

export default FormDelete;
