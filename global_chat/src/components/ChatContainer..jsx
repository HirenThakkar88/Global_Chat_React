import { useState, useEffect, useRef } from "react";

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    { _id: "1", senderId: "1", text: "Hello!", createdAt: "2025-04-01T10:00:00Z", image: null },
    { _id: "2", senderId: "2", text: "Hi, how are you?", createdAt: "2025-04-01T10:05:00Z", image: null },
    { _id: "3", senderId: "1", text: "I'm good, thanks!", createdAt: "2025-04-01T10:10:00Z", image: null },
    { _id: "4", senderId: "2", text: null, createdAt: "2025-04-01T10:15:00Z", image: "/path/to/image.jpg" },
  ]);
  const [selectedUser, setSelectedUser] = useState({
    _id: "2",
    profilePic: "/avatar.png",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const authUser = { _id: "1", profilePic: "/avatar.png" }; // Dummy auth user
  const messageEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever new messages are added
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Filter messages based on search query
  const filteredMessages = messages.filter((message) =>
    message.text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          filteredMessages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="border rounded-full size-10">
                  <img
                    src={message.senderId === authUser._id ? authUser.profilePic : selectedUser.profilePic}
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="mb-1 chat-header">
                <time className="ml-1 text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
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
          ))
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
