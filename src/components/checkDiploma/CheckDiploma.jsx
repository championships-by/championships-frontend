import { Row, Col, Typography, Button, Flex } from "antd";
import "./sass/check-diploma.scss";
import { useSelector } from "react-redux";
import { getEventsSelector } from "@store/events/selectors";
import Loader from "@components/loader/Loader";
import SearchInput from "@modules/search/SearchInput";
import CheckDiplomaInfo from "./CheckDiplomaInfo";
import { useState } from "react";

function CheckDiploma() {
  const [certificateId, setCertificateId] = useState("");
  const [searchId, setSearchId] = useState(null);
  const { isLoading } = useSelector(getEventsSelector);

  const handleSearch = () => {
    setSearchId(certificateId);
  };

  return (
    <>
      <Loader show={isLoading} />
      <Row>
        <Col span={24}>
          <Typography.Title level={2}>Проверка сертификата</Typography.Title>
        </Col>
        <Col span={24}>
          <Flex gap="middle" align="center">
            <div style={{ width: "300px" }}>
              <SearchInput value={certificateId} onChange={setCertificateId} />
            </div>
            <Button type="primary" onClick={handleSearch}>
              Проверить
            </Button>
          </Flex>
        </Col>
        <CheckDiplomaInfo certificateId={searchId} />
      </Row>
    </>
  );
}

export default CheckDiploma;
