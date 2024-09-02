import { Typography, Row, Col } from "antd";
import logo from "@assets/img/logo.png";
import bntuLogo from "@assets/img/bntu-logo.png";
import fitrLogo from "@assets/img/fitr-logo.png";
import schoolLogo from "@assets/img/school-logo.png";
import laptop from "@assets/img/laptop.png";

import "./sass/user-support.scss";

function AboutProgram() {
  return (
    <div className="user-support">
      <Typography.Title level={2}>О портале</Typography.Title>
      <Typography.Title level={3}>
        Республиканская единая система управления соревнованиями
      </Typography.Title>
      <Row align="middle">
        <Col span={17}>
          <Typography.Text strong>1. Удобство: </Typography.Text>
          <Typography.Text>
            Регистрация онлайн, без привязки ко времени и месту.
          </Typography.Text>
          <br />
          <Typography.Text>
            2. Упрощенное управление участниками и данными соревнований.
          </Typography.Text>
          <br />
          <Typography.Text strong>3. Расширение охвата: </Typography.Text>
          <Typography.Text>
            Легкий доступ для участников из разных регионов.
          </Typography.Text>
          <br />
          <Typography.Text strong>4. Гибкость: </Typography.Text>
          <Typography.Text>Настройка под нужды соревнований.</Typography.Text>
          <br />
          <Typography.Text>
            5. Автоматическая генерация текущих и итоговых протоколов.
          </Typography.Text>
        </Col>
        <Col span={7}>
          <img src={laptop} className="user-support__about__laptop-img" />
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col>
          <Typography.Title level={3}>Разработчики</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={8} className="user-support__about__logo-container">
          <img src={logo} className="user-support__about__logo" />
        </Col>
        <Col span={8} className="user-support__about__logo-container">
          <img src={fitrLogo} className="user-support__about__fitrLogo" />
          <img src={bntuLogo} className="user-support__about__bntuLogo" />
        </Col>
        <Col span={8} className="user-support__about__logo-container">
          <img src={schoolLogo} className="user-support__about__logo" />
        </Col>
      </Row>
      <Row>
        <Col span={8} className="user-support__about__titles">
          <Typography.Text strong>
            Учреждение образования национальный детский
            образовательно-оздоровительный центр{" "}
          </Typography.Text>
          <Typography.Text strong className="user-support__about__institution">
            «Зубренок»
          </Typography.Text>
        </Col>
        <Col span={8} className="user-support__about__titles">
          <Typography.Text strong className="user-support__about__institution">
            Факультет информационных технологий и робототехники{" "}
          </Typography.Text>
          <Typography.Text strong>
            учреждения образования «Белорусский национальный технический
            университет»
          </Typography.Text>
        </Col>
        <Col span={8} className="user-support__about__titles">
          <Typography.Text strong>
            Государственное учреждение образования{" "}
          </Typography.Text>
          <Typography.Text strong className="user-support__about__institution">
            «Гимназия 61 г. Минска»
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
}

export default AboutProgram;
