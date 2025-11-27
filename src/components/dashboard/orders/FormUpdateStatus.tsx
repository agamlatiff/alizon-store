"use client";

import Button from "@/components/ui/button";
import type { ActionResult } from "@/types";
import { Check } from "lucide-react";
import { updateOrderStatus } from "@/app/dashboard/orders/lib/actions";
import { useActionState } from "react";

const initialState: ActionResult = {
  error: "",
};

interface FormUpdateStatusProps {
  id: string;
  currentStatus: string;
}

const FormUpdateStatus = ({ id, currentStatus }: FormUpdateStatusProps) => {
  const updateStatus = (_: unknown, formData: FormData) =>
    updateOrderStatus(_, formData, id);

  const [state, formAction, pending] = useActionState(
    updateStatus,
    initialState
  );

  // Don't show button if already success
  if (currentStatus === "success") {
    return null;
  }

  return (
    <form action={formAction}>
      <Button
        variant={"primary"}
        size={"sm"}
        disabled={pending}
        className="text-sm"
      >
        <Check className="size-4 mr-2" />
        {pending ? "Updating..." : "Mark as Done"}
      </Button>
    </form>
  );
};

export default FormUpdateStatus;
