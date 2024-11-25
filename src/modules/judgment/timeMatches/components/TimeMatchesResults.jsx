import { LoadingOutlined } from "@ant-design/icons";
import { tableLocale } from "@constants";
import BronzeMedal from "@src/assets/img/bronze-medal.png";
import GoldMedal from "@src/assets/img/gold-medal.png";
import SilverMedal from "@src/assets/img/silver-medal.png";
import { formatTime } from "@utils";
import { Flex, Table, Tooltip, Typography } from "antd";
import { getTranslation } from "@utils";
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
      title: "№",
      key: "medal",
      render: (text, record, index) => (
        <>
          {index <= 2 && (
            <div className="medal-column">
              <img
                src={
                  index === 0
                    ? GoldMedal
                    : index === 1
                      ? SilverMedal
                      : index === 2
                        ? BronzeMedal
                        : ""
                }
              />
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
      title: (
        <Tooltip title={t("COMMON.PARTICIPANTS")}>
          {t("COMMON.PARTICIPANTS")}
        </Tooltip>
      ),
      dataIndex: "teamName",
      key: "teamName",
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
        record.bestAttempt.result ?? t("TOURNAMENTS.DISQALIFICATED"),
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
          dataSource={timeMatches.sort((a, b) =>
            formatTime(a.bestAttempt.result).diff(
              formatTime(b.bestAttempt.result)
            )
          )}
        />
      )}
    </Flex>
  );
};
