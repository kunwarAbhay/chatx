import React from "react";
import { useEffect } from "react";
import {
  HiMagnifyingGlass,
  HiUserCircle,
  HiPhone,
  HiCog6Tooth,
  HiUser,
  HiChatBubbleLeft,
} from "react-icons/hi2";

const ChatList = () => {
  const getChatList = async () => {
    const res = await fetch(`/chat/`);
    const data = res.json();
    return data;
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="h-screen w-screen p-8 flex flex-col">
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-6xl font-semibold">Chats</h1>
        <HiMagnifyingGlass className="text-6xl" />
      </div>

      <div className="flex flex-col flex-grow gap-16 pb-6 overflow-y-auto">
        {nums.map((num) => (
          <div className="flex items-center gap-6">
            <HiUserCircle className="text-8xl p-1" />
            <div className="flex flex-col gap-4 flex-grow">
              <div className="flex justify-between">
                <span className="text-4xl font-semibold">Julia Semid</span>
                <span className="text-3xl">18:21</span>
              </div>
              <div className="flex justify-between">
                <div className="w-4/5 overflow-hidden">
                  <span className="text-4xl whitespace-nowrap">
                    Must go, talk to go, talk to you later
                  </span>
                </div>
                <span className="bg-slate-400 text-2xl w-12  h-12 rounded-full flex justify-center items-center">
                  2
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NAV BAR */}
      <div className="flex justify-between text-5xl pt-8 px-6">
        <HiChatBubbleLeft />
        <HiPhone />
        <HiUser />
        <HiCog6Tooth />
      </div>
    </div>
  );
};

export default ChatList;
