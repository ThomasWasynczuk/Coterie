import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context";

const protectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser]);
  return currentUser && children;
};

export default protectedRoute;
