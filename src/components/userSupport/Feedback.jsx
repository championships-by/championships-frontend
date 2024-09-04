import { Typography } from "antd";
import laptop from "@assets/img/laptop-simple.png";
import { mailZubronok } from "@constants";

import "./sass/user-support.scss";
function Feedback() {
  return (
    <div className="user-support">
      <Typography.Title level={2}>Обратная связь</Typography.Title>
      <Typography.Text className="user-support__feedback__text">
        Спасибо, что посетили наш РЕСУРС. Если вы хотите оставить отзыв о
        Республиканской единой системе управления соревнованиями, а также по
        проблемам работы портала, вы можете написать нам на почту:
        <br />
        <br />
        <a href={`mailto:${mailZubronok}`}> {mailZubronok}</a>
      </Typography.Text>
      <br />
      <br />
      <Typography.Text className="user-support__feedback__text">
        <Typography.Text
          strong
          type="danger"
          className="user-support__feedback__text"
        >
          Внимание!{" "}
        </Typography.Text>
        Для связи с организаторами выбранного мероприятия воспользуйтесь email
        для вопросов участников на странице этого мероприятия.
      </Typography.Text>
      <div className="user-support__feedback__img-container">
        <img src={laptop} className="user-support__feedback__laptop-img" />
      </div>
    </div>
  );
}

export default Feedback;
