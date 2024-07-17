"use client";

import { SocialIcon } from "react-social-icons";

const Socials = () => {
  return (
    <div className="flex flex-row items-center gap-2">
      <SocialIcon
        url={"https://github.com/davidemioma/Meteor_Game"}
        style={{ width: "32px", height: "32px" }}
        bgColor={"black"}
        fgColor={"white"}
        target="_blank"
      />

      <SocialIcon
        url={"https://www.linkedin.com/in/daviducheemioma"}
        style={{ width: "32px", height: "32px" }}
        target="_blank"
      />
    </div>
  );
};

export default Socials;
