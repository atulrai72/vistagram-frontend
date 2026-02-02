import { useUser } from "@/features/authentication/use-user";
import { useMutualUser } from "@/features/chat/use-mutual-users";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useOtherUserProfile } from "@/features/profile/use-profile";
import { useAssignRooms } from "@/features/chat/use-assign-rooms";
import { useSocket } from "@/context/socket-context";
import { useGetChat } from "@/features/chat/use-get-chat";

interface Message {
  id?: number;
  message: string;
  senderId: number;
  roomId?: number;
  createdAt?: string;
}

export default function OneToOneMessage() {
  const socket = useSocket();
  const { user } = useUser(); 
  const { isAssigning } = useAssignRooms();
  const { id } = useParams(); 
  const { mutualUsers } = useMutualUser();
  const { otherUser } = useOtherUserProfile(Number(id));
  const [isConnected, setIsConnected] = useState(socket.connected);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { data: chatHistory } = useGetChat(Number(id));

  useEffect(() => {
    if (chatHistory && Array.isArray(chatHistory)) {
      setMessages(chatHistory);
    }
  }, [chatHistory]);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
   
    socket.on("recieve_message", (data) => {
      console.log("data", data.text);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("recieve_message"); 
    };
  }, [socket]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const text = inputRef.current.value;
        
      const newMessage: Message = {
        message: text,
        senderId: user?.id || 0,
        roomId: Number(id),
        createdAt: new Date().toISOString()
      };

      socket.emit("message", { text, userId: user?.id, room: Number(id) });
      
      setMessages((prev) => [...prev, newMessage]); 

      inputRef.current.value = "";
    }
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


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

          {mutualUsers?.map((friend: any, index: number) => (
            <Link to={`/message/${friend.id}`} key={index}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 transition-colors duration-150 cursor-pointer hover:bg-gray-100",
                  friend?.id === Number(id) && "bg-gray-200",
                )}
              >
                <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src={friend?.avatar_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{friend?.name}</p>
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
            </div>
            <p className="text-xs text-muted-foreground">
               {isConnected ? "Connected" : "Reconnecting..."}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="flex flex-col gap-2"> 
            {messages.length === 0 ? (
              <p className="text-center text-gray-400 mt-10">No messages yet...</p>
            ) : null}

            {messages.map((msg, index) => {
                const isMe = msg.senderId === user?.id; 

                return (
                  <div 
                    key={msg.id || index} 
                    className={cn(
                      "flex w-full",
                      isMe ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "max-w-[70%] px-4 py-2 rounded-2xl text-sm break-words",
                        isMe 
                          ? "bg-blue-600 text-white rounded-br-none" 
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm" 
                      )}
                    >
                      {msg.message}
                    </div>
                  </div>
                );
            })}
            <div ref={scrollRef} />
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition disabled:opacity-50"
            disabled={isAssigning}
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}