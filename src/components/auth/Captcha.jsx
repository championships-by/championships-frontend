import React, { useState } from "react";
import { SmartCaptcha } from "@yandex/smart-captcha";
import { captcha_token } from "@constants";

function Captcha({ onSuccess }) {
  const [token, setToken] = useState('');

  const onSuccessWrapper = (token) => {
    setToken(token);
    onSuccess();
  };

  return (
    <SmartCaptcha
      sitekey={process.env.CAPTCHA_TOKEN}
      onSuccess={(token) => onSuccessWrapper(token)}
      token={token}
    />
  );
}

export default Captcha;