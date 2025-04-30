import { Flex, Table, Tooltip, Typography } from "antd";
import { tableLocale } from "@const";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";
import { useMatches } from "@hooks";
import { getMedal } from "@utils";
import ParticipantsList from "@modules/judgment/common/ParticipantsList";
import ResultsTable from "@modules/judgment/common/ResultsTable";

export const PlayoffResult = ({ data }) => {
  const { t } = useTranslation();
  const { results } = useMatches();

  const columns = [
    {
      title: " ",
      key: "standing",
      dataIndex: "standing",
      render: (standing) => {
        return (
          standing <= 3 && (
            <div className="medal-column">
              <img src={getMedal(standing - 1)}></img>
            </div>
          )
        );
      },
    },
    {
      title: <Tooltip title={t("COMMON.PLACE")}>{t("COMMON.PLACE")}</Tooltip>,
      dataIndex: "standing",
      key: "standing",
      render: (standing) => standing,
    },
    {
      title: <Tooltip title={t("COMMON.TEAM")}>{t("COMMON.TEAM")}</Tooltip>,
      dataIndex: "team",
      key: "team",
      render: (team) => team.team.name,
    },
    {
      title: (
        <Tooltip title={t("COMMON.PARTICIPANTS")}>
          {t("COMMON.PARTICIPANTS")}
        </Tooltip>
      ),
      dataIndex: "team",
      key: "team",
      render: ({ participants }) => {
        return (
          <ParticipantsList
            participants={participants.map(
              (participant) =>
                `${participant.second_name} ${participant.first_name} ${participant.third_name}`
            )}
          />
        );
      },
    },
    {
      title: (
        <Tooltip title={t("COMMON.FINAL_SCORE")}>
          {t("COMMON.FINAL_SCORE")}
        </Tooltip>
      ),
      dataIndex: "score",
      key: "score",
      render: (score) => score,
    },
  ];

  return (
    <Flex vertical gap="large">
      <ResultsTable columns={columns} dataSource={results} />
    </Flex>
  );
};
