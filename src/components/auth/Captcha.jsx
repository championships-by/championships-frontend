import React, { useState } from "react";
import { SmartCaptcha } from "@yandex/smart-captcha";

function Captcha({ onSuccess }) {
  const [token, setToken] = useState('');

  const onSuccessWrapper = (value) => {
    setToken(value);
    onSuccess();
  };

  return (
    <SmartCaptcha
      sitekey={CAPTCHA_TOKEN}
      onSuccess={(value) => onSuccessWrapper(value)}
      token={token}
    />
  );
}

export default Captcha;
