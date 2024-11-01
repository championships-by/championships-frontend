import { Row, Col, Typography } from "antd";
import logo from "@assets/img/logo.png";
import bntuLogo from "@assets/img/bntu-logo.png";
import fitrLogo from "@assets/img/fitr-logo.png";
import schoolLogo from "@assets/img/school-logo.png";
import { bntuSite, zubronokSite, fitrSite, gymnSite } from "@constants";

import "./sass/user-support.scss";

function MobileDevelopers() {
  return (
    <Row align="middle" gutter={[16, 24]}>
      <Col span={8}>
        <a href={zubronokSite} target="_blank">
          <img src={logo} className="user-support__about__logo" />
        </a>
      </Col>
      <Col span={16}>
        <Typography.Text strong>Учреждение образования </Typography.Text>
        <Typography.Text strong className="user-support__about__institution">
          «Национальной детский образовательно-оздоровительный центр «Зубренок»
        </Typography.Text>
      </Col>
      <Col span={8}>
        <a href={fitrSite} target="_blank">
          <img src={fitrLogo} className="user-support__about__fitrLogo" />
        </a>
        <a href={bntuSite} target="_blank">
          <img src={bntuLogo} className="user-support__about__bntuLogo" />
        </a>
      </Col>
      <Col span={16}>
        <Typography.Text strong className="user-support__about__institution">
          Факультет информационных технологий и робототехники{" "}
        </Typography.Text>
        <Typography.Text strong>
          учреждения образования «Белорусский национальный технический
          университет»
        </Typography.Text>
      </Col>
      <Col span={8}>
        <a href={gymnSite} target="_blank">
          <img src={schoolLogo} className="user-support__about__logo" />
        </a>
      </Col>
      <Col span={16}>
        <Typography.Text strong>
          Государственное учреждение образования{" "}
        </Typography.Text>
        <Typography.Text strong className="user-support__about__institution">
          «Гимназия №61 г.Минска»
        </Typography.Text>
      </Col>
    </Row>
  );
}

export default MobileDevelopers;
