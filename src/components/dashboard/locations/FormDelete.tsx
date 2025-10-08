"use client";

import { deleteLocation } from "@/app/dashboard/locations/lib/actions";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { useActionState } from "react";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: string;
}

const FormDelete = ({ id }: FormDeleteProps) => {
  const deleteLocationById = (_: unknown, formData: FormData) =>
    deleteLocation(_, formData, id);

  const [state, formAction, pending] = useActionState(deleteLocationById, initialState);

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
