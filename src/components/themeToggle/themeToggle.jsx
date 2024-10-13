import { FloatButton } from "antd";
import { MoonOutlined, SunFilled } from "@ant-design/icons";

function ThemeToggle() {
  return (
    <>
      <FloatButton
        style={{
          insetInlineEnd: 94,
        }}
        icon={<MoonOutlined />}
      />
    </>
  );
}

export default ThemeToggle;
