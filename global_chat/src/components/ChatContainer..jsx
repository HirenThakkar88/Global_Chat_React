import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime, groupMessagesByDate } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    searchQuery,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Filter messages based on search query
  const filteredMessages = messages.filter((message) =>
    message.text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group messages by date
  const groupedMessages = groupMessagesByDate(filteredMessages);
  const dateGroups = Object.entries(groupedMessages);

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col flex-1 overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />

      <div
        className="flex-1 p-4 space-y-4 overflow-y-auto"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#888 transparent" }}
      >
        {filteredMessages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            {searchQuery ? "No messages found" : "No messages yet"}
          </div>
        ) : (
          dateGroups.map(([dateLabel, groupMessages]) => (
            <div key={dateLabel} className="space-y-4">
              {/* Date header */}
              <div className="sticky top-0 z-10 flex justify-center my-4">
                <div className="px-4 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full">
                  {dateLabel}
                </div>
              </div>

              {/* Messages for this date */}
              {groupMessages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                >
                  {/* Profile image */}
                  <div className="chat-image avatar">
                    <div className="border rounded-full size-10">
                      <img
                        src={
                          message.senderId === authUser._id
                            ? authUser.profilePic || "/avatar.png"
                            : selectedUser.profilePic || "/avatar.png"
                        }
                        alt="profile pic"
                      />
                    </div>
                  </div>

                  {/* Message time */}
                  <div className="mb-1 chat-header">
                    <time className="ml-1 text-xs opacity-50">
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>

                  {/* Message content */}
                  <div className="flex flex-col chat-bubble">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="sm:max-w-[200px] rounded-md mb-2"
                      />
                    )}
                    {message.text && <p>{message.text}</p>}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
        {/* Scroll anchor */}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;