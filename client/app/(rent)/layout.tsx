import Sidebar from "./components/siderbar";

export default function HosterLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar/>
        <div className="ml-64 p-8">
          {children}
        </div>
      </div>
    );
  }