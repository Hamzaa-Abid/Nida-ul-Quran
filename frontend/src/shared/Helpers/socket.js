import socketIOClient from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as types from "../../store/Actions/Types";
import { socketInitAction } from "../../store/Actions";

//const baseUrl = "https://qtutor.azurewebsites.net/";
const baseUrl = "http://localhost:5500/";

let socket;

function SocketHandler({ info }) {
  let dispatch = useDispatch();

  const establishConnection = (info) => {
    socket = socketIOClient(baseUrl);
    socket.on("connect", () => {
      const userSocketData = socket.emit("userUpdate", {
        socketId: socket.id,
        userId: info.loginId,
        role: info.userRole,
      });
      console.log("step 2: set socket in redux !!", userSocketData);
      dispatch(socketInitAction(types.SOCKET_INIT, socket));
    });
  };

  useEffect(() => {
    establishConnection(info);
  }, [info]);

  return null;
}
export default SocketHandler;
