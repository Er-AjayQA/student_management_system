import { SidebarTrigger } from "./ui/sidebar";
import { BodyLayout } from "./layouts/StudentLayouts/bodyLayout";

export const Header = () => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Header Content */}
      <div className="flex items-center gap-4 p-4 border-b justify-between">
        <SidebarTrigger />
        <div>
          <h5 className="">User Name</h5>
        </div>
      </div>

      {/* Main Content Area */}
      <BodyLayout />
    </div>
  );
};
