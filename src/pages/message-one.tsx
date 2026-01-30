import { useUser } from "@/features/authentication/use-user";
import { useMutualUser } from "@/features/chat/use-mutual-users";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useOtherUserProfile } from "@/features/profile/use-profile";
import { useAssignRooms } from "@/features/chat/use-assign-rooms";
import { useSocket } from "@/context/socket-context";

interface Message {
  text: string;
}

export default function OneToOneMessage() {
  const socket = useSocket();
  const { isAssigning } = useAssignRooms();
  const { id } = useParams();
  const { user } = useUser();
  const { mutualUsers } = useMutualUser();
  const { otherUser } = useOtherUserProfile(Number(id));

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([{ text: "Hi" }]);
  const inputRef = useRef<HTMLInputElement>(null);
  const room = 1;

  useEffect(() => {
    console.log("insde the use effect");
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    socket.on("recieve_message", (data: { text: string }) => {
      console.log("data", data);
      setMessages((prev) => [...prev, { text: data.text }]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
    };
  }, [socket]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const text = inputRef.current.value;
      socket.emit("message", { text, room });
      inputRef.current.value = "";
    }
  }

  return (
    <div className="h-screen w-full bg-gray-100 text-black flex overflow-hidden">
      <aside className="w-[340px] border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-lg font-semibold">{user?.name}</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <p className="px-4 pt-4 pb-2 text-sm font-semibold text-gray-500">
            Mutual friends
          </p>

          {mutualUsers?.map((user: any, index: number) => (
            <Link to={`/message/${user.id}`} key={index}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors duration-150 cursor-pointer hover:bg-gray-100",
                  user?.id === Number(id) && "bg-gray-200",
                )}
              >
                <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src={user?.avatar_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{user?.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-gray-50">
        <div className="h-16 border-b border-gray-200 bg-white flex items-center px-6 gap-3 shadow-sm">
          <img
            src={otherUser?.userDetails.avatar_url}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">
              {otherUser?.userDetails.name}
              <p className="text-muted-foreground">
                {isConnected ? "Connected" : "Disconnected"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <div className="flex items-end gap-2">
            {messages.length === 0 ? (
              <p style={{ color: "#aaa" }}>No messages yet...</p>
            ) : null}

            {messages.map((msg) => (
              <div key={Math.random()} style={{ padding: "5px 0" }}>
                {msg.text}
              </div>
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="h-16 border-t border-gray-200 bg-white flex items-center gap-3 px-4"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isAssigning}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium transition"
            disabled={isAssigning}
            onClick={handleSubmit}
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
