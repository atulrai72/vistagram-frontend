import { useMemo } from "react";
import { io } from "socket.io-client";

export const socket = useMemo(
  () =>
    io("http://localhost:3001", {
      withCredentials: true,
    }),
  [],
);
