"use server";
import { signOut } from "./auth";

const LogOutButton = async () => {
  "use server";
  await signOut();
};

export default LogOutButton;
