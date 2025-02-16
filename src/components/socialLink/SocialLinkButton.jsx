import React, { useRef } from "react";
import { FloatButton } from "antd";
import CustomTelegramIcon from "./CustomTelegramIcon";

function SocialLinkButton() {
  const floatButtonGroupRef = useRef(null);

  const openTelegram = () => {
    window.open("https://t.me/championshipsby", "_blank");
  };

  return (
    <>
      <div ref={floatButtonGroupRef}>
        <FloatButton
          style={{ insetInlineEnd: 170 }}
          icon={<CustomTelegramIcon />}
          onClick={openTelegram}
        />
      </div>
    </>
  );
}

export default SocialLinkButton;
