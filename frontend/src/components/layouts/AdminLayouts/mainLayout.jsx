import { Header } from "../../AdminComponents/Header";
import { AdminSidebar } from "../../AdminComponents/Sidebar";

export const MainLayout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
      </div>
    </div>
  );
};
