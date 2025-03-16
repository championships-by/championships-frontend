import s from "./sass/check-diploma-info.module.scss";
import { Typography } from "antd";
import { useEffect, useState } from "react";
import { certificateApi } from "../../api/certificates";

function CheckDiplomaInfo({ certificateId }) {
  const [certificateData, setCertificateData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!certificateId) return;

    const fetchCertificate = async () => {
      setLoading(true);
      try {
        const response = await certificateApi.getCertificateById(certificateId);
        setCertificateData(response.data);
      } catch (error) {
        console.error("Ошибка при запросе данных:", error.message);
        setCertificateData(null);
      }
      setLoading(false);
    };

    fetchCertificate();
  }, []);

  if (loading) return <Typography.Paragraph>Загрузка...</Typography.Paragraph>;
  if (!certificateData)
    return <Typography.Paragraph>Введите номер диплома</Typography.Paragraph>;

  const { event_name, event_start_date, event_end_date, participant_name, id } =
    certificateData;

  return (
    <div className={s.content}>
      <div>
        <Typography.Title level={5}>Мероприятие</Typography.Title>
        <Typography.Paragraph>{event_name}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={5}>Даты проведения</Typography.Title>
        <Typography.Paragraph>
          {event_start_date}
          {event_end_date ? ` -${event_end_date}` : ""}
        </Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={5}>ФИО</Typography.Title>
        <Typography.Paragraph>{participant_name}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={5}>Номер диплома</Typography.Title>
        <Typography.Paragraph>{id}</Typography.Paragraph>
      </div>
    </div>
  );
}

export default CheckDiplomaInfo;
