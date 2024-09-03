import { Typography } from "antd";
import laptop from "@assets/img/laptop-simple.png";
import { mailZubronok } from "@constants";

import "./sass/user-support.scss";
function Feedback() {
  return (
    <div className="user-support">
      <Typography.Title level={2}>Обратная связь</Typography.Title>
      <Typography.Text strong>
        Спасибо, что посетили наш РЕСУРС. Если вы хотите оставить отзыв о
        Республиканской единой системе управления соревнованиями, вы можете
        написать нам на почту{" "}
        <a href={`mailto:${mailZubronok}`}> {mailZubronok}</a>
      </Typography.Text>
      <div className="user-support__feedback__img-container">
        <img src={laptop} className="user-support__feedback__laptop-img" />
      </div>
    </div>
  );
}

export default Feedback;
