import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const webSiteKey = "6LekOtUqAAAAAGvfJz0JdMRSQk5adqEmsFwf43zc";

function ParticipantReCaptcha({ onValidate }) {
  const [isValid, setIsValid] = useState(false);

  function onChange(value) {
    console.log("Captcha value:", value);
    const valid = value !== null;
    setIsValid(valid);
    if (onValidate) {
      onValidate(valid);
    }
  }

  return (
    <>
      <ReCAPTCHA
        className="re-captcha-container"
        sitekey={webSiteKey}
        onChange={onChange}
      />
    </>
  );
}

export default ParticipantReCaptcha;
