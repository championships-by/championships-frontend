import { Typography, Row, Col } from "antd";
import laptop from "@assets/img/laptop.png";
import { useDevice } from "@hooks";
import MobileDevelopers from "./MobileDevelopers";
import DesktopDevelopers from "./DesktopDevelopers";

import "./sass/user-support.scss";

function AboutProgram() {
  const { isMobile } = useDevice();
  return (
    <div className="user-support">
      <Typography.Title level={2}>О портале</Typography.Title>
      <Typography.Text className="user-support__about__text">
        <Typography.Text className="user-support__about__text__blue">
          Республиканская единая система удаленной регистрации соревнований
        </Typography.Text>{" "}
        - это система управления мероприятиями и соревнованиями. Все процессы
        автоматизированы, что позволяет экономить ресурсы и время на организацию
        проведения соревнований разного уровня от городского до
        республиканского.
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
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              2. Управление:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              Упрощенное управление участниками и данными соревнований.
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
            <Typography.Text
              strong
              className="user-support__about__text__advantages"
            >
              5. Отчетность:{" "}
            </Typography.Text>
            <Typography.Text className="user-support__about__text__advantages">
              Автоматическая генерация текущих и итоговых протоколов.
            </Typography.Text>
          </div>
        </Col>
      </Row>
      <Row justify="center" align="middle">
        <Col>
          <Typography.Title level={3}>Разработчики</Typography.Title>
        </Col>
      </Row>

      {isMobile ? <MobileDevelopers /> : <DesktopDevelopers />}
    </div>
  );
}

export default AboutProgram;
