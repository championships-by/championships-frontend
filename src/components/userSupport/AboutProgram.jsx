import { Typography, Row, Col } from "antd";
import laptop from "@/assets/img/laptop.png";
import { useDevice } from "@/hooks";
import MobileDevelopers from "./MobileDevelopers";
import DesktopDevelopers from "./DesktopDevelopers";
import { useTranslation } from "react-i18next";
import { userGuide } from "@/const";

import "./sass/user-support.scss";

function AboutProgram() {
  const { t } = useTranslation();
  const { isMobile } = useDevice();
  return (
    <div className="user-support">
      <Typography.Title level={2}>
        {t("USER_SUPPORT.ABOUT_SITE")}
      </Typography.Title>
      <Typography.Text className="user-support__about__text">
        <Typography.Text className="user-support__about__text__blue">
          {t("USER_SUPPORT.RESURS")}
        </Typography.Text>
        {" - "}
        {t("USER_SUPPORT.RESURS_IS")}
        <br /> <br />
        <Typography.Link href={userGuide} target="_blank">
          {t("USER_SUPPORT.USER_GUIDE")}
        </Typography.Link>
      </Typography.Text>
      <Row align="middle">
        <Col xs={24} sm={24} md={24} lg={9}>
          <img src={laptop} className="user-support__about__laptop-img" />
        </Col>
        <Col xs={24} sm={24} md={24} lg={15}>
          <div className="user-support__about__advantages-container">
            <Typography.Title
              className="user-support__about__titles__advantages"
              level={3}
            >
              {t("USER_SUPPORT.ADVANTAGES")}
            </Typography.Title>
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              1. {t("USER_SUPPORT.CONVENIENCE")}:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              {t("USER_SUPPORT.ONLINE_REGISTRATION")}
            </Typography.Text>
            <br />
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              2. {t("USER_SUPPORT.CONTROL")}:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              {t("USER_SUPPORT.EASY_CONTROL")}
            </Typography.Text>
            <br />
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              3. {t("USER_SUPPORT.COVERAGE")}:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              {t("USER_SUPPORT.EASY_ACCESS")}
            </Typography.Text>
            <br />
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              4. {t("USER_SUPPORT.FLEXIBILITY")}:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              {t("USER_SUPPORT.CUSTOMIZATION_FOR_TOURNAMENT_NEEDS")}
            </Typography.Text>
            <br />
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              5. {t("USER_SUPPORT.REPORTING")}:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              {t("USER_SUPPORT.AUTO_GENERATION")}
            </Typography.Text>
          </div>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col>
          <Typography.Title level={3}>
            {t("USER_SUPPORT.DEVELOPERS")}
          </Typography.Title>
        </Col>
      </Row>

      {isMobile ? <MobileDevelopers /> : <DesktopDevelopers />}
    </div>
  );
}

export default AboutProgram;
