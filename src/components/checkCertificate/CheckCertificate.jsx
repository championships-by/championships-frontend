import { Row, Col, Typography, Button, Flex, Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { getEventsSelector } from "@store/events/selectors";
import Loader from "@components/loader/Loader";
import SearchInput from "@modules/search/SearchInput";
import CheckCertificateInfo from "@components/checkCertificate/CheckCertificateInfo";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ROUTES } from "@constants";

import s from "./sass/check-certificate.module.scss";

function CheckCertificate() {
  const [certificateId, setCertificateId] = useState("");
  const [searchId, setSearchId] = useState(null);
  const { isLoading } = useSelector(getEventsSelector);
  const { t } = useTranslation();

  const handleSearch = () => {
    setSearchId(certificateId);
  };
  const items = [
    {
      title: t("EVENTS.EVENTS"),
      href: ROUTES.EVENTS.PATH,
    },
    {
      title: t("CHECK_CERTIFICATE.TITLE"),
    },
  ];

  return (
    <>
      <Loader show={isLoading} />
      <Row>
        <Col span={24}>
          <Typography.Title level={2}>
            {t("CHECK_CERTIFICATE.TITLE")}
          </Typography.Title>
          <Breadcrumb items={items} />
        </Col>
        <Col span={24}>
          <Flex gap="middle" align="center">
            <div className={s.input}>
              <SearchInput
                value={certificateId}
                onChange={setCertificateId}
                placeholder={t("CHECK_CERTIFICATE.SEARCH")}
              />
            </div>
            <Button type="primary" onClick={handleSearch}>
              {t("CHECK_CERTIFICATE.BUTTON")}
            </Button>
          </Flex>
        </Col>
        <CheckCertificateInfo certificateId={searchId} />
      </Row>
    </>
  );
}

export default CheckCertificate;
