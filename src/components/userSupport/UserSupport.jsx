import React, { useState, useEffect, useRef } from "react";
import { FloatButton, Tooltip } from "antd";
import {
  QuestionCircleOutlined,
  CommentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@constants";

function UserSupport() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const floatButtonGroupRef = useRef(null);

  const onClick = () => {
    setOpen(!isOpen);
  };

  const openAbout = () => {
    navigate(ROUTES.ABOUT_PROGRAM.PATH);
    setOpen(false);
  };

  const openFeedback = () => {
    navigate(ROUTES.FEEDBACK.PATH);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        floatButtonGroupRef.current &&
        !floatButtonGroupRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div ref={floatButtonGroupRef}>
        <FloatButton.Group
          open={isOpen}
          trigger="click"
          onClick={onClick}
          icon={<QuestionCircleOutlined />}
        >
          <Tooltip placement="left" title="О программе">
            <FloatButton icon={<FileTextOutlined />} onClick={openAbout} />
          </Tooltip>
          <Tooltip placement="left" title="Обратная связь">
            <FloatButton icon={<CommentOutlined />} onClick={openFeedback} />
          </Tooltip>
        </FloatButton.Group>
      </div>
    </>
  );
}

export default UserSupport;
