import { useLayoutEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import { useTranslation } from "react-i18next";
import MagicUrl from "quill-magic-url";

import "react-quill/dist/quill.snow.css";
import "./sass/textEditor.scss";

Quill.register("modules/magicUrl", MagicUrl);

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
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          ["code", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["blockquote"],
        ],
        clipboard: {
          matchVisual: false,
        },
        magicUrl: true,
      }}
      formats={[
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "code",
        "code-block",
        "list",
        "link",
        "blockquote",
      ]}
    />
  );
}

export default TextEditor;
