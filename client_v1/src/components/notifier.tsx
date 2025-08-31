import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Snackbar, Alert, Badge, IconButton } from "@mui/material";
import { io, Socket } from "socket.io-client";

type NotificationCount = Dispatch<SetStateAction<number>>;
interface NotifierProps {
  setOnline: (status:boolean)=>void;
  setNotification:NotificationCount // optional role to join room
}

const Notifier: React.FC<NotifierProps> = ({ setOnline,setNotification}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
 const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      // join role room if role is provided
      setOnline(true);
      const userData = localStorage.getItem("user");
      let userRole;
      if (!userRole && userData) {
        try {
          const user = JSON.parse(userData);
          userRole = user?.role;
        } catch {}
      }
      if (userRole) {
        newSocket.emit("joinRole", userRole);
      }
    });

    // listen for admin notifications
    newSocket.on("adminNotification", (data) => {
      setMessage(data.message);
      setNotification(prev=>prev+1)
      setOpen(true);
      setUnreadCount((prev) => prev + 1);
    });

    // optional: listen for general notifications
    newSocket.on("notification", (data) => {
      setMessage(data.message || "New notification");
      setOpen(true);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };



  return (
    <>
      {/* Notification bell with badge */}
 

      {/* Snackbar popup */}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notifier;
