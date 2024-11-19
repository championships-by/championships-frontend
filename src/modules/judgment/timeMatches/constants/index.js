import { RESPONSE_STATUS } from "@constants";
import { translate } from "@utils";

export const TimeMatchesTabsEnum = {
  TABLE: "table",
  RESULTS: "results",
};

export const timeMatchesTabs = {
  [TimeMatchesTabsEnum.TABLE]: {
    key: "1",
    label: translate("COMMON.TABLE"),
  },
  [TimeMatchesTabsEnum.RESULTS]: {
    key: "2",
    label: translate("COMMON.RESULTS"),
    disabled: true,
  },
};

export const timeMatchesErrorMessages = {
  [RESPONSE_STATUS.STATUS_CONFLICT]: translate("MESSAGES.YOU_NOT_JUDGE"),
  default: translate("MESSAGES.ERROR"),
};
