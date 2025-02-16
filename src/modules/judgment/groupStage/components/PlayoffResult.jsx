import { LoadingOutlined } from "@ant-design/icons";
import BronzeMedal from "@src/assets/img/bronze-medal.png";
import GoldMedal from "@src/assets/img/gold-medal.png";
import SilverMedal from "@src/assets/img/silver-medal.png";
import { Flex, Table, Tooltip, Typography } from "antd";
import { tableLocale } from "@constants";
import { getTranslation } from "@utils";
import { useTranslation } from "react-i18next";
import { useMatches } from "@hooks";
import { getPlayoffResults, getMedal } from "@utils";

import "./PlayoffResults.scss";

export const PlayoffResult = () => {
  const { t } = useTranslation();
  const { leveledPlayoffMatches } = useMatches();
  const data = getPlayoffResults(leveledPlayoffMatches);

  const columns = [
    // {
    //   title: " ",
    //   key: "play",
    //   render: (place) => {
    //     place <= 3 && <img src={getMedal(place)}></img>;
    //   },
    // },
    {
      title: <Tooltip title={t("COMMON.PLACE")}>{t("COMMON.PLACE")}</Tooltip>,
      dataIndex: "place",
      key: "place",
      render: (place) => place + 1,
    },
    {
      title: <Tooltip title={t("COMMON.TEAM")}>{t("COMMON.TEAM")}</Tooltip>,
      dataIndex: "team",
      key: "team",
      render: (team) => team,
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
        dataSource={data}
      />
    </Flex>
  );
};
