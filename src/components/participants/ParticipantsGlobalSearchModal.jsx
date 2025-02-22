import React, { useState } from "react";
import { debounce } from "lodash";
import { Modal, Input, AutoComplete } from "antd";
import { transformParticipantsInSystemData, getParticipantLink } from "@utils";
import ParticipantLink from "@components/participants/ParticipantLink.jsx";
import { useTranslation } from "react-i18next";
import { participantApi } from "@api";

import "@components/participants/sass/participants-global-search-modal.scss";

function ParticipantsGlobalSearchModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [options, setOptions] = useState([]);

  const search = async (value) => {
    try {
      const response = await participantApi.getParticipantsInSystem({
        name: value,
      });
      const transformedData = transformParticipantsInSystemData(response);
      setOptions(
        transformedData.map((item) => {
          return {
            value: item.value,
            label: <ParticipantLink>{item.label}</ParticipantLink>,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onSearch = debounce((value) => {
    search(value);
  }, 300);

  const onSelect = (value, option) => {
    window.open(getParticipantLink(option.value), "_blank");
  };

  return (
    <Modal
      title={t("COMMON.SYSTEM_WIDE_SEARCH")}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <AutoComplete
        options={options}
        onSearch={onSearch}
        onSelect={onSelect}
        className="participants-global-search"
      >
        <Input.Search />
      </AutoComplete>
    </Modal>
  );
}

export default ParticipantsGlobalSearchModal;
