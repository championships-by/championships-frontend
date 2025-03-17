import { Row, Col, Typography, Button, Flex } from "antd";
import { useSelector } from "react-redux";
import { getEventsSelector } from "@store/events/selectors";
import Loader from "@components/loader/Loader";
import SearchInput from "@modules/search/SearchInput";
import CheckCertificatInfo from "./CheckCertificatInfo";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import s from "./sass/check-certificat.module.scss";

function CheckCertificat() {
  const [certificateId, setCertificateId] = useState("");
  const [searchId, setSearchId] = useState(null);
  const { isLoading } = useSelector(getEventsSelector);
  const { t } = useTranslation();

  const handleSearch = () => {
    setSearchId(certificateId);
  };

  return (
    <>
      <Loader show={isLoading} />
      <Row>
        <Col span={24}>
          <Typography.Title level={2}>
            {t("CHECK_CERTIFICAT.TITLE")}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <Flex gap="middle" align="center">
            <div className={s.input}>
              <SearchInput value={certificateId} onChange={setCertificateId} />
            </div>
            <Button type="primary" onClick={handleSearch}>
              {t("CHECK_CERTIFICAT.BUTTON")}
            </Button>
          </Flex>
        </Col>
        <CheckCertificatInfo certificateId={searchId} />
      </Row>
    </>
  );
}

export default CheckCertificat;
