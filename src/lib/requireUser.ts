import { redirect } from "next/navigation";
import { auth } from "./auth"

const requireUser = async () => {
  const user = await auth();
  
  if(!user) {
    redirect("/sign-in");
  }
  
  return user
    
}

export default requireUser