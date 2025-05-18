import { Typography } from "antd";
import { useEffect, useState } from "react";
import { certificateApi } from "@/api";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Locale } from "@/const";

import styles from "./sass/check-certificate-info.module.scss";

function CheckCertificateInfo({ certificateId }) {
  const [certificateData, setCertificateData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!certificateId) return;

    const fetchCertificate = async () => {
      setIsLoading(true);

      try {
        const params = { certificate_id: certificateId };
        const result = await certificateApi.getCertificateById(params);
        setCertificateData(result);
      } catch (error) {
        setCertificateData(null);
      }
      setIsLoading(false);
    };

    fetchCertificate();
  }, [certificateId]);

  if (isLoading)
    return (
      <Typography.Paragraph>
        {t("CHECK_CERTIFICATE.LOADING")}
      </Typography.Paragraph>
    );

  if (!certificateData) return null;

  const { event_name, event_start_date, event_end_date, participant_name, id } =
    certificateData;

  return (
    <div className={styles.content}>
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
          {dayjs(event_start_date).format(Locale.dateFormat)}
          {event_end_date
            ? ` - ${dayjs(event_end_date).format(Locale.dateFormat)}`
            : ""}
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
