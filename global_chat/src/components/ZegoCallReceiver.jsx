import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZIM } from 'zego-zim-web';
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

const ZegoCallReceiver = () => {
  const { authUser } = useAuthStore();
  const appID = parseInt(import.meta.env.VITE_appID);
  const serverSecret = import.meta.env.VITE_serverSecret;
  const zpInstance = useRef(null);

  useEffect(() => {
    if (!authUser?.id) return;

    const initializeZego = async () => {
      try {
        // Validate environment variables first
        if (!appID || !serverSecret) {
          throw new Error("Missing Zego credentials");
        }

        const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          null,
          authUser._id,
          authUser.fullName
        );

        // Create new instance only if none exists
        if (!zpInstance.current) {
          zpInstance.current = ZegoUIKitPrebuilt.create(token);
          await zpInstance.current.addPlugins({ ZIM });
          zpInstance.current.setLanguage('en-US');
        }

        // Event handler setup
        zpInstance.current.onCallInvitationReceived = (inviter, callType) => {
          const acceptCall = confirm(`Incoming ${callType} from ${inviter.userName}`);
          
          if (acceptCall) {
            zpInstance.current.enterRoom({
              container: document.getElementById('zego-container'),
              scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
                config: {
                  onLeaveRoom: () => {
                    zpInstance.current?.destroy();
                    zpInstance.current = null;
                  },
                },
              },
              showPreJoinView: true,
            });
          } else {
            zpInstance.current.refuseInvitation(inviter);
          }
        };

      } catch (error) {
        console.error('Zego initialization error:', error);
        // Only show error if no instance exists
        if (!zpInstance.current) {
          toast.error('Call system initialization failed');
        }
      }
    };

    initializeZego();

    return () => {
      if (zpInstance.current) {
        zpInstance.current.destroy();
        zpInstance.current = null;
      }
    };
  }, [authUser?.id, authUser?.fullName]);

  return <div id="zego-container" style={{ 
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    pointerEvents: 'none' 
  }} />;
};

export default ZegoCallReceiver;