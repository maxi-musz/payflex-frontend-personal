import Dashboard from "@/components/dashboard/Dashboard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import SidebarRight from "@/components/sidebar-right/SidebarRight";

const HomePage: React.FC = () => {

  return (
    <div className='bg-[#f8fbff] h-full min-h-screen flex'>
      <Sidebar />
      <div className="px-2 md:px-5 w-full md:w-4/6 h-full min-h-screen col-span-2 border-x border-customGray ">
        <Navbar />
        <Dashboard />
      </div>
      <SidebarRight />
    </div>
  );
};

export default HomePage;
