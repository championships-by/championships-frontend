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
        <Typography.Text className="user-support__about__text__blue">
          Республиканская единая система управления соревнованиями
        </Typography.Text>{" "}
        - это система управления мероприятиями и соревнованиями. Все процессы
        автоматизированы, что позволяет экономить ресурсы и время на организацию
        проведения соревнований разного уровня от городского до
        республиканского.
      </Typography.Text>
      <Row align="middle">
        <Col span={9}>
          <img src={laptop} className="user-support__about__laptop-img" />
        </Col>
        <Col span={15}>
          <div className="user-support__about__advantages-container">
            <Typography.Title
              className="user-support__about__titles__advantages"
              level={3}
            >
              Преимущества
            </Typography.Title>
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              1. Удобство:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              Регистрация онлайн, без привязки ко времени и месту.
            </Typography.Text>
            <br />
            <Typography.Text className="user-support__about__text__advantages">
              2. Упрощенное управление участниками и данными соревнований.
            </Typography.Text>
            <br />
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              3. Расширение охвата:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              Легкий доступ для участников из разных регионов.
            </Typography.Text>
            <br />
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              4. Гибкость:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              Настройка под нужды соревнований.
            </Typography.Text>
            <br />
            <Typography.Text className="user-support__about__text__advantages">
              5. Автоматическая генерация текущих и итоговых протоколов.
            </Typography.Text>
          </div>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col>
          <Typography.Title level={3}>Разработчики</Typography.Title>
        </Col>
      </Row>
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
            «Гимназия №61 г.Минска»
          </Typography.Text>
        </Col>
      </Row>
    </div>
  );
}

export default AboutProgram;
