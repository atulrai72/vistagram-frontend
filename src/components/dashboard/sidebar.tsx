import {
  Home,
  Search,
  Compass,
  SquarePlay,
  Send,
  Heart,
  Plus,
  LogOut,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className="
        fixed bottom-0 left-0 z-50 w-full bg-white border-t flex flex-row justify-around items-center py-3
        md:static md:h-full md:flex-col md:justify-start md:items-start md:py-5 md:px-5 md:border-none
      "
    >
      <h1 className="hidden md:block font-['Grand_Hotel'] text-4xl text-black mb-10">
        Vistagram
      </h1>

      <div className="flex w-full md:flex-col md:gap-10 text-xl font-normal justify-around md:justify-start">
        <Link
          to="/dashboard"
          className="flex items-center hover:cursor-pointer"
        >
          <Home /> <span className="hidden md:block ml-2">Home</span>
        </Link>

        <Link to="/search" className="flex items-center hover:cursor-pointer">
          <Search /> <span className="hidden md:block ml-2">Search</span>
        </Link>

        <div className="hidden md:flex items-center hover:cursor-pointer">
          <Compass /> <span className="ml-2">Explore</span>
        </div>

        <div className="flex items-center hover:cursor-pointer">
          <SquarePlay /> <span className="hidden md:block ml-2">Reels</span>
        </div>

        <div className="flex items-center hover:cursor-pointer">
          <Send /> <span className="hidden md:block ml-2">Messages</span>
        </div>

        <div className="hidden md:flex items-center hover:cursor-pointer">
          <Heart /> <span className="ml-2">Notifications</span>
        </div>

        <div className="flex hover:cursor-pointer">
          <Link to="/create" className="flex items-center">
            <Plus /> <span className="hidden md:block ml-2">Create</span>
          </Link>
        </div>

        <Link
          to="/user-management"
          className="flex items-center hover:cursor-pointer"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="hidden md:block ml-2">Profile</span>
        </Link>

        <div className="hidden md:block mt-auto">
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="w-full justify-start"
          >
            <LogOut size={24} color="blue" />
            <span className="ml-2">Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
