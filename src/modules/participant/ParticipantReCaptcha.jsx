import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const webSiteKey = WEB_SITE_KEY;

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
        sitekey={webSiteKey}
        onChange={onChange}
      />
  );
}

export default ParticipantReCaptcha;
