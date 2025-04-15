import { useEffect } from "react";
import { useCallStore } from "../store/useCallStore";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";

const IncomingCall = () => {
  const { incomingCall, acceptCall, rejectCall } = useCallStore();
  const { users } = useChatStore();

  useEffect(() => {
    if (incomingCall) {
      const caller = users.find(u => u._id === incomingCall.caller);
      if (caller) {
        toast.custom((t) => (
          <div className="p-4 border shadow-lg bg-base-100 rounded-box border-base-300">
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold">Incoming call from {caller.fullName}</h3>
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => {
                    acceptCall(incomingCall.callId, incomingCall.caller);
                    toast.dismiss(t.id);
                  }}
                  className="btn btn-success btn-sm"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    rejectCall(incomingCall.callId);
                    toast.dismiss(t.id);
                  }}
                  className="btn btn-error btn-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ), { duration: 30000 });
      }
    }
  }, [incomingCall]);

  return null;
};

export default IncomingCall;