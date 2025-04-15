/* eslint-disable no-unused-vars */
import { X, Phone, Video, MoreVertical, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

import toast from "react-hot-toast";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, searchQuery, setSearchQuery } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setShowSearchInput(false);
  }, [selectedUser]);

  return (
    <div className="p-2.5 border-b border-base-300 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="relative rounded-full size-10">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSearchInput && (
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search chat..."
                className="input input-sm input-bordered"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchInput(false);
                }}
                className="btn btn-sm btn-ghost"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <button
            className="p-2 rounded-full hover:bg-base-200"
            disabled={!selectedUser}
          >
            <Phone size={20} className="text-base-content" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-base-200"
            disabled={!selectedUser}
          >
            <Video size={20} className="text-base-content" />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-base-200"
            >
              <MoreVertical size={20} className="text-base-content" />
            </button>

            {showMenu && (
              <div className="absolute right-0 z-10 w-48 rounded-lg shadow-lg top-10 bg-base-100">
                <button
                  onClick={() => {
                    setShowSearchInput(true);
                    setShowMenu(false);
                  }}
                  className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-base-200"
                >
                  <Search size={16} />
                  Search Chat
                </button>
                <button
                  onClick={() => console.log("Block user:", selectedUser._id)}
                  className="flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-base-200 text-error"
                >
                  <X size={16} />
                  Block User
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setSelectedUser(null)}
            className="p-2 rounded-full hover:bg-base-200"
          >
            <X size={20} className="text-base-content" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
