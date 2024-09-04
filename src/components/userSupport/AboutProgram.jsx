import { Typography, Row, Col } from "antd";
import logo from "@assets/img/logo.png";
import bntuLogo from "@assets/img/bntu-logo.png";
import fitrLogo from "@assets/img/fitr-logo.png";
import schoolLogo from "@assets/img/school-logo.png";
import laptop from "@assets/img/laptop.png";
import { bntuSite, zubronokSite, fitrSite, gymnSite } from "@constants";

import "./sass/user-support.scss";

function AboutProgram() {
  return (
    <div className="user-support">
      <Typography.Title level={2}>О портале</Typography.Title>
      <Typography.Text className="user-support__about__text">
        Республиканская единая система управления соревнованиями - это система
        управления мероприятиями и соревнованиями. Все процессы
        автоматизированы, что позволяет экономить ресурсы и время на организацию
        проведения соревнований разного уровня от городского до
        республиканского.
      </Typography.Text>
      <Row align="middle">
        <Col span={13} className="user-support__about__text1">
          <Typography.Title level={3}>Преимущества</Typography.Title>
          <Typography.Text strong className="user-support__about__text">
            1. Удобство:{" "}
          </Typography.Text>
          <Typography.Text className="user-support__about__text">
            Регистрация онлайн, без привязки ко времени и месту.
          </Typography.Text>
          <br />
          <Typography.Text className="user-support__about__text">
            2. Упрощенное управление участниками и данными соревнований.
          </Typography.Text>
          <br />
          <Typography.Text strong className="user-support__about__text">
            3. Расширение охвата:{" "}
          </Typography.Text>
          <Typography.Text className="user-support__about__text">
            Легкий доступ для участников из разных регионов.
          </Typography.Text>
          <br />
          <Typography.Text strong className="user-support__about__text">
            4. Гибкость:{" "}
          </Typography.Text>
          <Typography.Text className="user-support__about__text">
            Настройка под нужды соревнований.
          </Typography.Text>
          <br />
          <Typography.Text className="user-support__about__text">
            5. Автоматическая генерация текущих и итоговых протоколов.
          </Typography.Text>
        </Col>
        <Col span={11}>
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
          <a href={zubronokSite}>
            <img src={logo} className="user-support__about__logo" />
          </a>
        </Col>
        <Col span={8} className="user-support__about__logo-container">
          <a href={fitrSite}>
            <img src={fitrLogo} className="user-support__about__fitrLogo" />
          </a>
          <a href={bntuSite}>
            <img src={bntuLogo} className="user-support__about__bntuLogo" />
          </a>
        </Col>
        <Col span={8} className="user-support__about__logo-container">
          <a href={gymnSite}>
            <img src={schoolLogo} className="user-support__about__logo" />
          </a>
        </Col>
      </Row>
      <Row>
        <Col span={8} className="user-support__about__titles">
          <Typography.Text strong>Учреждение образования </Typography.Text>
          <Typography.Text strong className="user-support__about__institution">
            «Национальной детский образовательно-оздоровительный центр
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
            «Гимназия №61 г. Минска»
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
}

export default AboutProgram;
