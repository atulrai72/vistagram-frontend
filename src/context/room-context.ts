import { createContext, useState } from "react";

const RoomIdContext = createContext<any>(null);  

const initialRoomIdState = {
    roomId: null,
    setRoomId: () => {},
};



const RoomIdProvider = ({ children }: { children: React.ReactNode }) => {
    const [roomId, setRoomId] = useState<number | null>(null);

    return (
        <RoomIdContext.Provider value={{ roomId, setRoomId }}>
            {children}
        </RoomIdContext.Provider>
    );
}