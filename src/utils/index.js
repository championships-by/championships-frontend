export const FILTER_OPTION = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const handlePaste = (event) => {
  event.preventDefault();
  const clipboardData = (event.clipboardData || window.clipboardData).getData(
    "text"
  );
  const sanitizedData = clipboardData.replace(/\s/g, "");
  const input = event.target;
  const { value } = input;
  const { selectionStart } = input;
  const { selectionEnd } = input;
  input.value =
    value.substring(0, selectionStart) +
    sanitizedData +
    value.substring(selectionEnd);
  input.setSelectionRange(
    selectionStart + sanitizedData.length,
    selectionStart + sanitizedData.length
  );
  input.dispatchEvent(new Event("input", { bubbles: true }));
};