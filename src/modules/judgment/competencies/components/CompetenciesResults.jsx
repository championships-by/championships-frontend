import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Table, Tooltip, Typography } from "antd";
import { tableLocale } from "@constants";
import { getTranslation, getMedal, getPlace } from "@utils";
import { useTranslation } from "react-i18next";

import "./CompetenciesResults.scss";

export const CompetenciesResults = ({
  dataSource,
  isLoading,
  hasError,
  maxPlace,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: " ",
      key: "medal",
      render: (text, record, index) => (
        <>
          {getPlace(index, maxPlace) <= 2 && (
            <div className="medal-column">
              <img src={getMedal(getPlace(index, maxPlace))} />
            </div>
          )}
        </>
      ),
    },
    {
      title: <Tooltip title={t("COMMON.PLACE")}>{t("COMMON.PLACE")}</Tooltip>,
      dataIndex: "place",
      key: "place",
      render: (text, record, index) => getPlace(index, maxPlace) + 1,
    },
    {
      title: <Tooltip title={t("COMMON.TEAM")}>{t("COMMON.TEAM")}</Tooltip>,
      dataIndex: "team",
      key: "team",
      render: (record) => record.name,
    },
    {
      title: (
        <Tooltip title={t("COMMON.PARTICIPANTS")}>
          {t("COMMON.PARTICIPANTS")}
        </Tooltip>
      ),
      dataIndex: "participants",
      key: "participants",
    },
    {
      title: (
        <Tooltip title={t("COMMON.FINAL_SCORE")}>
          {t("COMMON.FINAL_SCORE")}
        </Tooltip>
      ),
      dataIndex: "totalScore",
      key: "totalScore",
      render: (text, record) => record.totalScore ?? "-",
    },
  ];

  return isLoading ? (
    <LoadingOutlined />
  ) : (
    <Flex vertical gap="large">
      {hasError ? (
        <Typography>{t("COMMON.ERROR_TO_GET_DATA")}</Typography>
      ) : (
        <Table
          className="competencies-result-table"
          locale={getTranslation(tableLocale, t)}
          pagination={false}
          columns={columns}
          dataSource={dataSource.sort((a, b) => b.totalScore - a.totalScore)}
        />
      )}
    </Flex>
  );
};
