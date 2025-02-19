import { LoadingOutlined } from "@ant-design/icons";
import { tableLocale } from "@constants";
import { formatTime } from "@utils";
import { Flex, Table, Tooltip, Typography } from "antd";
import { getTranslation, getMedal } from "@utils";
import { useTranslation } from "react-i18next";

import "./TimeMatchesResult.scss";

export const TimeMatchesResults = ({
  timeMatches,
  isLoading,
  isErrorOccurred,
}) => {
  const { t } = useTranslation();

  const columns = [
    {
      title: " ",
      key: "medal",
      render: (text, record, index) => (
        <>
          {index <= 2 && (
            <div className="medal-column">
              <img src={getMedal(index)} />
            </div>
          )}
        </>
      ),
    },
    {
      title: <Tooltip title={t("COMMON.PLACE")}>{t("COMMON.PLACE")}</Tooltip>,
      dataIndex: "place",
      key: "place",
      render: (text, record, index) => index + 1,
    },
    {
      title: <Tooltip title={t("COMMON.TEAM")}>{t("COMMON.TEAM")}</Tooltip>,
      dataIndex: "teamName",
      key: "teamName",
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
        <Tooltip title={t("TOURNAMENTS.BEST_TIME")}>
          {t("TOURNAMENTS.BEST_TIME")}
        </Tooltip>
      ),
      dataIndex: "bestAttempt",
      key: "bestAttempt",
      render: (text, record) =>
        record.bestAttempt &&
        record.bestAttempt?.result !== null &&
        record.bestAttempt?.result !== "00:00.000"
          ? record.bestAttempt?.result
          : t("TOURNAMENTS.DISQALIFICATED"),
    },
  ];

  return isLoading ? (
    <LoadingOutlined />
  ) : (
    <Flex vertical gap="large">
      {isErrorOccurred ? (
        <Typography>{t("COMMON.ERROR_TO_GET_DATA")}</Typography>
      ) : (
        <Table
          className="time-matches-table"
          pagination={false}
          columns={columns}
          locale={getTranslation(tableLocale, t)}
          dataSource={timeMatches.sort((a, b) => {
            const aResult = a.best_attempt?.result;
            const bResult = b.best_attempt?.result;

            if (!aResult || aResult === "00:00.000") return 1;
            if (!bResult || bResult === "00:00.000") return -1;

            return formatTime(aResult).diff(formatTime(bResult));
          })}
        />
      )}
    </Flex>
  );
};
