import getAuthUser from "@/lib/GetAuthUser";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const authUser = await getAuthUser();
  if (!authUser) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-150px)]">
      Dashboard Page
    </div>
  );
};

export default DashboardPage;
