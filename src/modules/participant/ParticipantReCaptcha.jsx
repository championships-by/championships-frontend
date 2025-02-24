import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function ParticipantReCaptcha({ onValidate }) {
  const [isValid, setIsValid] = useState(false);

  function onChange(value) {
    const valid = value !== null;
    setIsValid(valid);
    if (onValidate) {
      onValidate(valid);
    }
  }

  return (

    <ReCAPTCHA
      className="re-captcha-container"
      sitekey={WEB_SITE_KEY}
      onChange={onChange}
    />

  );
}

export default ParticipantReCaptcha;
