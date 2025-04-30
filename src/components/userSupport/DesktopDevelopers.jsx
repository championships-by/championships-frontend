import { Row, Col, Typography } from "antd";
import logo from "@assets/img/logo.png";
import bntuLogo from "@assets/img/bntu-logo.png";
import fitrLogo from "@assets/img/fitr-logo.png";
import schoolLogo from "@assets/img/school-logo.png";
import { bntuSite, zubronokSite, fitrSite, gymnSite } from "@const";
import { useTranslation } from "react-i18next";

import "./sass/user-support.scss";

function DesktopDevelopers() {
  const { t } = useTranslation();
  return (
    <>
      <Row>
        <Col span={8} className="user-support__about__logo-container">
          <a href={zubronokSite} target="_blank">
            <img src={logo} className="user-support__about__logo" />
          </a>
        </Col>
        <Col span={8} className="user-support__about__logo-container">
          <a href={fitrSite} target="_blank">
            <img src={fitrLogo} className="user-support__about__fitrLogo" />
          </a>
          <a href={bntuSite} target="_blank">
            <img src={bntuLogo} className="user-support__about__bntuLogo" />
          </a>
        </Col>
        <Col span={8} className="user-support__about__logo-container">
          <a href={gymnSite} target="_blank">
            <img src={schoolLogo} className="user-support__about__logo" />
          </a>
        </Col>
      </Row>
      <Row>
        <Col span={8} className="user-support__about__titles">
          <Typography.Text strong className="user-support__about__institution">
            {t("USER_SUPPORT.ZUBRONOK")}
          </Typography.Text>
        </Col>
        <Col span={8} className="user-support__about__titles">
          <Typography.Text strong className="user-support__about__institution">
            {t("USER_SUPPORT.BNTU")}
          </Typography.Text>
        </Col>
        <Col span={8} className="user-support__about__titles">
          <Typography.Text strong className="user-support__about__institution">
            {t("USER_SUPPORT.GYMN_61")}
          </Typography.Text>
        </Col>
      </Row>
    </>
  );
}

export default DesktopDevelopers;
