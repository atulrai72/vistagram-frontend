import { Outlet } from "react-router-dom";
import SideBar from "@/components/dashboard/sidebar"; // Adjust path if needed

export default function AppLayout() {
  return (
    <div className="w-full min-h-screen md:grid md:grid-cols-[250px_1fr]">
      <div className="hidden md:block md:h-screen md:sticky md:top-0 md:border-r-2">
        <SideBar />
      </div>
      <div className="w-full pb-20 md:pb-0">
        <main>
          <Outlet />
        </main>
      </div>
      <div className="md:hidden">
        <SideBar />
      </div>
    </div>
  );
}
