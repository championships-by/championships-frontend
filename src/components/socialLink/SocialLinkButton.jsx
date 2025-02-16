import React, { useRef } from "react";
import { FloatButton } from "antd";
import CustomTelegramIcon from "./CustomTelegramIcon";
import { OPEN_TELEGRAM } from "@constants";

function SocialLinkButton() {
  const floatButtonGroupRef = useRef(null);

  return (
    <>
      <div ref={floatButtonGroupRef}>
        <FloatButton
          style={{ insetInlineEnd: 170 }}
          icon={<CustomTelegramIcon />}
          onClick={OPEN_TELEGRAM}
        />
      </div>
    </>
  );
}

export default SocialLinkButton;
