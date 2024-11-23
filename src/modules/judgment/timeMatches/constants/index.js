import { RESPONSE_STATUS } from "@constants";
import { getTranslation } from "@utils";

export const TimeMatchesTabsEnum = {
  TABLE: "table",
  RESULTS: "results",
};

export const timeMatchesTabs = {
  [TimeMatchesTabsEnum.TABLE]: {
    key: "1",
    label: getTranslation("COMMON.TABLE"),
  },
  [TimeMatchesTabsEnum.RESULTS]: {
    key: "2",
    label: getTranslation("COMMON.RESULTS"),
    disabled: true,
  },
};

export const timeMatchesErrorMessages = {
  [RESPONSE_STATUS.STATUS_CONFLICT]: getTranslation("MESSAGES.YOU_NOT_JUDGE"),
  default: getTranslation("MESSAGES.ERROR"),
};
