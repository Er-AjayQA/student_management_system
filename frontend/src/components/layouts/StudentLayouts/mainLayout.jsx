import { Header } from "../../Header";
import { AppSidebar } from "../../Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const MainLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <div className="flex-shrink-0">
          <AppSidebar />
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
        </div>
      </div>
    </SidebarProvider>
  );
};
