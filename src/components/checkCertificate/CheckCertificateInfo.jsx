import { Typography } from "antd";
import { useEffect, useState } from "react";
import { certificateApi } from "@api/certificates";

import s from "./sass/check-certificate-info.module.scss";
import { t } from "i18next";

function CheckCertificateInfo({ certificateId }) {
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
        setCertificateData(null);
      }
      setLoading(false);
    };

    fetchCertificate();
  }, []);

  if (loading)
    return (
      <Typography.Paragraph>
        {t("CHECK_CERTIFICATE.LOADING")}
      </Typography.Paragraph>
    );
  if (!certificateData)
    return (
      <Typography.Paragraph>
        {t("CHECK_CERTIFICATE.INPUT")}
      </Typography.Paragraph>
    );

  const { event_name, event_start_date, event_end_date, participant_name, id } =
    certificateData;

  return (
    <div className={s.content}>
      <div>
        <Typography.Title level={5}>
          {t("CHECK_CERTIFICATE.EVENT")}
        </Typography.Title>
        <Typography.Paragraph>{event_name}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={5}>
          {t("CHECK_CERTIFICATE.DATE")}
        </Typography.Title>
        <Typography.Paragraph>
          {event_start_date}
          {event_end_date ? ` -${event_end_date}` : ""}
        </Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={5}>
          {t("CHECK_CERTIFICATE.FULL_NAME")}
        </Typography.Title>
        <Typography.Paragraph>{participant_name}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Title level={5}>
          {t("CHECK_CERTIFICATE.NUMBER")}
        </Typography.Title>
        <Typography.Paragraph>{id}</Typography.Paragraph>
      </div>
    </div>
  );
}

export default CheckCertificateInfo;
