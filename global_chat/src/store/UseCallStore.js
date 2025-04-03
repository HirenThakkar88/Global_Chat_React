/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useCallStore = create((set, get) => ({
  incomingCall: null,
  activeCall: null,
  callHistory: [],
  localStream: null,
  remoteStream: null,
  peerConnection: null,

  initPeerConnection: () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
    });
    set({ peerConnection: pc });
    return pc;
  },

  initiateCall: async (receiverId) => {
    try {
      const { authUser, socket } = useAuthStore.getState();
      const pc = get().initPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      set({ localStream: stream });

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("ice:candidate", { receiverId, candidate: e.candidate });
        }
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") {
          set({ activeCall: { receiverId } });
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      socket.emit("call:initiate", {
        caller: authUser._id,
        receiver: receiverId,
        offer,
      });
    } catch (error) {
      toast.error("Failed to initiate call");
      console.error("Call initiation error:", error);
    }
  },

  acceptCall: async (callId, callerId) => {
    try {
      const { socket } = useAuthStore.getState();
      const pc = get().initPeerConnection();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      set({ localStream: stream, activeCall: { callId, callerId } });

      stream.getTracks().forEach(track => pc.addTrack(track, stream));

      pc.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit("ice:candidate", { receiverId: callerId, candidate: e.candidate });
        }
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("call:accept", { callId, answer: pc.localDescription });
    } catch (error) {
      toast.error("Failed to accept call");
      console.error("Call acceptance error:", error);
    }
  },

  rejectCall: (callId) => {
    const { socket } = useAuthStore.getState();
    socket.emit("call:reject", callId);
    set({ incomingCall: null, activeCall: null });
  },

  endCall: () => {
    const { peerConnection, localStream } = get();
    if (peerConnection) {
      peerConnection.close();
    }
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    set({ activeCall: null, peerConnection: null, localStream: null, remoteStream: null });
  },

  fetchCallHistory: async () => {
    try {
      const res = await axiosInstance.get("/calls/history");
      set({ callHistory: res.data });
    } catch (e) {
      toast.error("Failed to fetch call history");
    }
  }
}));