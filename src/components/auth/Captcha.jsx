import React, { useState } from "react";
import { SmartCaptcha } from "@yandex/smart-captcha";
import { CAPTCHA_TOKEN } from "@/const";

function Captcha({ onSuccess: onSuccessBase }) {
  const [token, setToken] = useState("");

  const onSuccess = (value) => {
    setToken(value);
    onSuccessBase();
  };

  return (
    <SmartCaptcha
      sitekey={CAPTCHA_TOKEN}
      onSuccess={onSuccess}
      token={token}
    />
  );
}

export default Captcha;
