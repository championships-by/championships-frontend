import { Flex, Table, Tooltip, Typography } from "antd";
import { tableLocale } from "@constants";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";
import { useMatches } from "@hooks";
import { getMedal } from "@utils";

import "@modules/judgment/groupStage/components/sass/playoff-results.scss";

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
      render: ({ team }) => team.name,
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
          <ul className="participants-list">
            {participants.map((participant, index) => (
              <li
                key={index}
              >{`${participant.second_name} ${participant.first_name} ${participant.third_name}`}</li>
            ))}
          </ul>
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
      <Table
        className="competencies-result-table"
        locale={getTranslation(tableLocale, t)}
        // expandable={{
        //   expandedRowRender: (record) => <p>{record.participants}</p>,
        // }}
        pagination={false}
        columns={columns}
        dataSource={results}
      />
    </Flex>
  );
};
