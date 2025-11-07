import { Outlet } from "react-router-dom";

export const BodyLayout = () => {
  return (
    <>
      {/* Main Content Area */}
      <main className="flex-1 p-6 overflow-auto">
        <div
          style={{
            boxShadow: ".2px .2px 30px 2px #ececec",
            padding: "20px",
            minHeight: "200px",
            borderRadius: "8px",
          }}
          className="h-full"
        >
          <Outlet />
        </div>
      </main>
    </>
  );
};
