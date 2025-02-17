import React, { useRef } from "react";
import { FloatButton } from "antd";
import CustomTelegramIcon from "./CustomTelegramIcon";
import { TELEGRAM_LINK } from "@constants";

function SocialLinkButton() {
  const OPEN_TELEGRAM = () => {
    window.open(TELEGRAM_LINK, "_blank");
  };

  return (
    <div>
      <FloatButton
        style={{ insetInlineEnd: 170 }}
        icon={<CustomTelegramIcon />}
        onClick={OPEN_TELEGRAM}
      />
    </div>
  );
}

export default SocialLinkButton;
