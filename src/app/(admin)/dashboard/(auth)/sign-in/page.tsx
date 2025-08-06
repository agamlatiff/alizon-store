import { cn } from "@/lib/utils";
import FormSignin from "./_components/Form";

export default function SignInPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
        <FormSignin/>
        </div>
      </div>
    </div>
  );
}
