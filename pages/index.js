import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context";

const protectedRoute = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else {
      router.push("/boredape/general");
    }
  }, [currentUser]);
  return <></>;
};

export default protectedRoute;
