import React, { useRef } from "react";
import { FloatButton } from "antd";
import CustomTelegramIcon from "./CustomTelegramIcon";
import { TELEGRAM_LINK } from "@const";

const onClick = () => {
  window.open(TELEGRAM_LINK, "_blank");
};

function SocialLinkButton() {
  return (
    <div>
      <FloatButton
        style={{ insetInlineEnd: 170 }}
        icon={<CustomTelegramIcon />}
        onClick={onClick}
      />
    </div>
  );
}

export default SocialLinkButton;
