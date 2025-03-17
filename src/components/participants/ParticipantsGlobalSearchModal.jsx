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
  const [searchValue, setSearchValue] = useState("");

  const fetchParticipants = debounce(async (name) => {
    if (!name) {
      setOptions([]);
      return;
    }

    try {
      const response = await participantApi.getParticipantsInSystem({ name });
      const transformedData = transformParticipantsInSystemData(response);
      setOptions(
        transformedData.map((item) => ({
          value: item.value,
          label: <ParticipantLink>{item.label}</ParticipantLink>,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  }, 300);

  const onSearch = (value) => {
    setSearchValue(value);
    fetchParticipants(value);
  };

  const onSelect = (value) => {
    window.open(getParticipantLink(value), "_blank");
    setSearchValue("");
    setOptions([]);
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
        value={searchValue}
        className="participants-global-search"
      >
        <Input.Search />
      </AutoComplete>
    </Modal>
  );
}

export default ParticipantsGlobalSearchModal;
