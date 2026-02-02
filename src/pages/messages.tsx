import { useUser } from "@/features/authentication/use-user";
import { useAssignRooms } from "@/features/chat/use-assign-rooms";
import { useMutualUser } from "@/features/chat/use-mutual-users";
import { Link } from "react-router-dom";
import { useSocket } from "@/context/socket-context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function MessagesPage() {
  const socket = useSocket();
  const { user } = useUser();
  const navigate = useNavigate();

  const { mutualUsers } = useMutualUser();
  const { assignRoomsApi } = useAssignRooms();

  const handleAssignRoom = async (id: number) => {
    try {
      const data = await assignRoomsApi(id);
      socket.emit("join-room", data.roomId);
      navigate(`/message/${data?.roomId}`);
      toast.success("Room assigned successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to assign room");
    }
  };

  return (
    <div className="h-screen w-full bg-white text-black flex">
      <aside className="w-85 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold">{user?.name}</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <p className="px-4 pt-4 pb-2 text-sm font-semibold">Mutual friends</p>

          {mutualUsers?.map((user: any, index: number) => (
            <div
              onClick={() => handleAssignRoom(user?.id)}
            >
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 cursor-pointer"
              >
                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
                  <img
                    src={user?.avatar_url}
                    alt=""
                    className="rounded-full h-full w-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                  {/* TODO: To dispaly when user is online */}
                  {/* <p className="text-xs text-gray-600">{msg.status}</p>  */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full border-2 border-black flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3 3l18 9-18 9 3-9Z"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold">Your messages</h2>
          <p className="text-sm text-gray-600">
            Send a message to start a chat.
          </p>
        </div>
      </main>
    </div>
  );
}
