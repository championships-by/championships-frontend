import { useLayoutEffect } from "react";
import ReactQuill from "react-quill";
import { useTranslation } from "react-i18next";

import "react-quill/dist/quill.snow.css";
import "./sass/textEditor.scss";

function TextEditor({ value, onChange, placeholder }) {
  const { t } = useTranslation();

  useLayoutEffect(() => {
    const styleSheet = document.styleSheets[0];

    if (styleSheet) {
      styleSheet.insertRule(
        `.quill .ql-snow .ql-tooltip.ql-editing a.ql-action::after { content: "${t(
          "COMMON.SAVE"
        )}"; }`,
        styleSheet.cssRules.length
      );

      styleSheet.insertRule(
        `.quill .ql-snow .ql-tooltip a.ql-action::after { content: "${t(
          "COMMON.EDIT"
        )}"; }`,
        styleSheet.cssRules.length
      );

      styleSheet.insertRule(
        `.quill .ql-snow .ql-tooltip a.ql-remove::before { content: "${t(
          "COMMON.DELETE"
        )}"; }`,
        styleSheet.cssRules.length
      );
    }
  }, [t]);

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      placeholder={placeholder || t("EVENTS.ENTER_EVENT_DESCRIPTION")}
      className="quill"
      modules={{
        toolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
        ],
      }}
    />
  );
}

export default TextEditor;
