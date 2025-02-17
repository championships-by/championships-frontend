import React, { useRef } from "react";
import { FloatButton } from "antd";
import CustomTelegramIcon from "./CustomTelegramIcon";
import { TELEGRAM_LINK } from "@constants";

const OnClick = () => {
  window.open(TELEGRAM_LINK, "_blank");
};

function SocialLinkButton() {
  return (
    <div>
      <FloatButton
        style={{ insetInlineEnd: 170 }}
        icon={<CustomTelegramIcon />}
        onClick={OnClick}
      />
    </div>
  );
}

export default SocialLinkButton;
