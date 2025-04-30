import { RESPONSE_STATUS } from "@constants";
import i18n from "@translations/translations";

export const TimeMatchesTabsEnum = {
  TABLE: "table",
  RESULTS: "results",
};

export const timeMatchesTabs = {
  [TimeMatchesTabsEnum.TABLE]: {
    key: "1",
    label: i18n.t("COMMON.TABLE"),
  },
  [TimeMatchesTabsEnum.RESULTS]: {
    key: "2",
    label: i18n.t("COMMON.RESULTS"),
    disabled: true,
  },
};

export const timeMatchesErrorMessages = {
  [RESPONSE_STATUS.STATUS_CONFLICT]: i18n.t("MESSAGES.YOU_NOT_JUDGE"),
  default: i18n.t("MESSAGES.ERROR"),
};
