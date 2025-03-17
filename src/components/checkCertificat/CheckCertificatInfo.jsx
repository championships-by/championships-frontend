import { Typography } from "antd";
import { useEffect, useState } from "react";
import { certificateApi } from "../../api/certificates";

import s from "./sass/check-certificat-info.module.scss";

function CheckCertificatInfo({ certificateId }) {
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

  if (loading)
    return (
      <Typography.Paragraph>
        {t("CHECK_CERTIFICAT.LOADING")}
      </Typography.Paragraph>
    );
  if (!certificateData)
    return (
      <Typography.Paragraph>{t("CHECK_CERTIFICAT.INPUT")}</Typography.Paragraph>
    );

  const { event_name, event_start_date, event_end_date, participant_name, id } =
    certificateData;

  return (
    <div className={s.content}>
      <div>
        <Typography.Title level={5}>
          {t("CHECK_CERTIFICAT.EVENT")}
        </Typography.Title>
        <Typography.Paragraph>{event_name}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={5}>
          {t("CHECK_CERTIFICAT.DATE")}
        </Typography.Title>
        <Typography.Paragraph>
          {event_start_date}
          {event_end_date ? ` -${event_end_date}` : ""}
        </Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={5}>
          {t("CHECK_CERTIFICAT.FULL_NAME")}
        </Typography.Title>
        <Typography.Paragraph>{participant_name}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={5}>
          {t("CHECK_CERTIFICAT.NUMBER_CERTIFICAT")}
        </Typography.Title>
        <Typography.Paragraph>{id}</Typography.Paragraph>
      </div>
    </div>
  );
}

export default CheckCertificatInfo;
