"use client";
import { useEffect, useState } from "react";
import getAuthUser from "@/lib/GetAuthUser";
import { redirect } from "next/navigation";

const DashboardPage = () => {
  const [user, setAuthUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const authUser = await getAuthUser();
      setLoading(false);
      if (!authUser) {
        redirect("/login");
      }
      setAuthUser(authUser);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-150px)]">
      {isLoading ? (
        "Loading ...."
      ) : (
        <div>Dashboard Page, AuthUser : {JSON.stringify(user)}</div>
      )}
    </div>
  );
};

export default DashboardPage;
