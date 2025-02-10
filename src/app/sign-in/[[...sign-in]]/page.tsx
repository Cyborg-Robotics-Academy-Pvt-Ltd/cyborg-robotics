import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="justify-center flex flex-row mt-32 w-full">
      {" "}
      <SignIn />
    </div>
  );
};

export default page;
