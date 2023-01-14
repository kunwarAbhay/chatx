import React from "react";
import {
  HiUserCircle,
  HiChevronLeft,
  HiMicrophone,
  HiPaperClip,
  HiFaceSmile,
} from "react-icons/hi2";

const Chat = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <div className="h-screen p-8 flex flex-col">
      <div className="flex gap-6 items-center mb-8">
        <HiChevronLeft className="text-4xl" />
        <HiUserCircle className="text-8xl p-1" />
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-semibold">James Dullmo</h1>
          <span className="text-2xl">Last seen 2 hours ago</span>
        </div>
      </div>

      <div className="flex flex-col flex-grow gap-8 px-8 pb-6 max-h-fit overflow-y-auto">
        {nums.map((num) => {
          const alignment = num % 3 ? " ml-auto" : " mr-auto";
          return (
            <div
              className={"bg-slate-200 p-8 text-2xl rounded-2xl " + alignment}
            >
              Hi!, How are you!
            </div>
          );
        })}
      </div>

      {/* NAV BAR */}
      <div className="flex justify-between items-center gap-4 text-5xl pt-8 px-6">
        <div className="flex items-center flex-grow gap-4 bg-slate-200 px-8 py-4 rounded-full">
          <HiFaceSmile />
          <input
            type="text"
            placeholder={"Message"}
            className={"w-full bg-inherit border-2 text-4xl"}
          />
          <HiPaperClip />
        </div>
        <HiMicrophone />
      </div>
    </div>
  );
};

export default Chat;
