import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
  return (
    <div className="relative w-full pt-[56.25%] bg-black">
      <div className="absolute top-0 left-0 bottom-0 right-0">
        <video width="640" height="360" controls>
          <source src="" type="application/x-mpegURL" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
