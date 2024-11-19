import { EventEmitter } from "events";
import { translate } from "@utils";

export const ZUBRONOK = "https://zubronok.by/";

export const Roles = {
  ADMIN: "admin",
  JUDGE: "judge",
  SPECIALIST: "specialist",
};

export const FILE_UPLOADING = {
  UPLOADING: "uploading",
  DONE: "done",
  ERROR: "error",
  UPLOAD: {
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  },
};

export const ROLE_FILTERS = [
  {
    text: "COMMON.ADMIN",
    value: "admin",
  },
  {
    text: "COMMON.JUDGE",
    value: "judge",
  },
  {
    text: "COMMON.MANAGER",
    value: "specialist",
  },
];

export const NOMINATIONS = {
  TIME: "time",
  PLAYOFF: "playoffs",
  CRITERIA: "criteria",
  OLYMPIC: "olympic",
};

export const NOMINATION_TYPES = {
  CRITERIA: "NOMINATION_TYPES.CRITERIA",
  TIME: "NOMINATION_TYPES.TIME",
  OLYMPIC: "NOMINATION_TYPES.PLAYOFF",
};

export const RESPONSE_STATUS = {
  STATUS_OK: 200,
  STATUS_UNAUTHORIZED: 401,
  STATUS_FORBIDDEN: 403,
  STATUS_NOTFOUND: 404,
  STATUS_CONFLICT: 409,
};

export const ROUTES = {
  NOT_FOUND: { TITLE: "404", PATH: "*" },
  UNAUTHORIZED: { TITLE: "401", PATH: "/401" },
  FORBIDDEN: { TITLE: "403", PATH: "/403" },
  AUTHORIZATION: { TITLE: "COMMON.AUTH", PATH: "/" },
  LOGOUT: { TITLE: "COMMON.LOGOUT", PATH: "/logout" },
  PARTICIPANTS: {
    TITLE: "COMMON.PARTICIPANT_MANAGEMENT",
    PATH: "/participants",
  },
  PARTICIPANT_INFORMATION: {
    TITLE: "PARTICIPANTS.CARD_OF_PARTICIPANT",
    PATH: (participantID) => `/participants/${participantID}`,
  },
  USERS_CONTROL: { TITLE: "COMMON.USER_MANAGEMENT", PATH: "/users" },
  USER_SETTINGS: {
    TITLE: "USER_SETTINGS.USER_SETTINGS",
    PATH: "/settings",
  },
  ABOUT_PROGRAM: {
    TITLE: "USER_SUPPORT.ABOUT_SITE",
    PATH: "/about",
  },
  FEEDBACK: { TITLE: "USER_SUPPORT.FEEDBACK", PATH: "/feedback" },
  EVENTS: { TITLE: "EVENTS.EVENTS", PATH: "/events" },
  EVENTS_DESCRIPTION: {
    TITLE: "EVENTS.EVENT_DESCRIPTION",
    PATH: (eventID) => `/events/${eventID}`,
  },
  EVENTS_REGISTRATION: {
    TITLE: "EVENTS.PARTICIPANT_REGISTRATION",
    PATH: (eventID) => `/events/${eventID}/registration`,
  },
  JUDGMENT: {
    TITLE: "COMMON.EVENT_MANAGEMENT",
    PATH: "/judgment/events",
  },
  JUDGMENT_CREATE: {
    TITLE: "EVENTS.CREATE_EVENT",
    PATH: "/judgment/events/create",
  },
  JUDGMENT_CREATE_TEST: {
    TITLE: "EVENTS.CREATE_EVENT",
    PATH: "/judgment/events/create/test",
  },
  JUDGMENT_EVENT_SETTINGS: {
    TITLE: "COMMON.EDIT",
    PATH: (eventID) => `/judgment/events/${eventID}/settings`,
  },
  JUDGMENT_GROUP_STAGE: {
    TITLE: "NOMINATION_TYPES.PLAYOFF",
    PATH: (event_id, nomination_id) =>
      `/judgment/events/${event_id}/${nomination_id}/group-stage`,
  },
  JUDGMENT_TIME_MATCHES: {
    TITLE: "NOMINATION_TYPES.TIME",
    PATH: (event_id, nomination_id) =>
      `/judgment/events/${event_id}/${nomination_id}/time-matches`,
  },
  JUDGMENT_CRITERIA: {
    TITLE: "NOMINATION_TYPES.CRITERIA",
    PATH: (event_id, nomination_id) =>
      `/judgment/events/${event_id}/${nomination_id}/criteria`,
  },
};

export const ROUTER_ROUTES = {
  NOT_FOUND: "*",
  UNAUTHORIZED: "/401",
  FORBIDDEN: "/403",
  ROOT: "/",
  LOGOUT: "logout",
  ADMIN_PANEL: "",
  PARTICIPANTS: "participants",
  PARTICIPANT_INFORMATION: ":participantID",
  USERS_CONTROL: "users",
  USER_SETTINGS: "settings",
  ABOUT_PROGRAM: "about",
  FEEDBACK: "feedback",
  EVENTS: "events",
  EVENTS_DESCRIPTION: ":eventID",
  EVENTS_REGISTRATION: ":eventID/registration",
  JUDGMENT: "judgment/events",
  JUDGMENT_CREATE: "create",
  JUDGMENT_CREATE_TEST: "create/test",
  JUDGMENT_EVENT_SETTINGS: ":eventID/settings",
  JUDGMENT_GROUP_STAGE: ":eventId/:nominationId/group-stage",
  JUDGMENT_TIME_MATCHES: ":eventId/:nominationId/time-matches",
  JUDGMENT_CRITERIA: ":eventId/:nominationId/criteria",
};

export const EventFilters = {
  REPUBLIC: "republic",
  REGION: "region",
  DISTRICT: "district",
  TOWN: "town",
  OTHER: "other",
};

export const Locale = {
  lang: {
    locale: "ru_RU",
    placeholder: translate("DATE_TIME.PLACEHOLDER"),
    rangePlaceholder: [
      translate("DATE_TIME.BEGIN"),
      translate("DATE_TIME.END"),
    ],
    today: translate("DATE_TIME.TODAY"),
    now: translate("DATE_TIME.NOW"),
    backToToday: translate("DATE_TIME.BACKTOTODAY"),
    ok: translate("DATE_TIME.OK"),
    clear: translate("DATE_TIME.CLEAR"),
    month: translate("DATE_TIME.MONTH"),
    year: translate("DATE_TIME.YEAR"),
    timeSelect: translate("DATE_TIME.TIMESELECT"),
    dateSelect: translate("DATE_TIME.DATESELECT"),
    monthSelect: translate("DATE_TIME.MONTHSELECT"),
    yearSelect: translate("DATE_TIME.YEARSELECT"),
    decadeSelect: translate("DATE_TIME.DECADESELECT"),
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    timeFormat: "HH:mm",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: translate("DATE_TIME.PREVIOUSMONTH"),
    nextMonth: translate("DATE_TIME.NEXTMONTH"),
    previousYear: translate("DATE_TIME.PREVIOUSYEAR"),
    nextYear: translate("DATE_TIME.NEXTYEAR"),
    previousDecade: translate("DATE_TIME.PREVIOUSDECADE"),
    nextDecade: translate("DATE_TIME.NEXTDECADE"),
    previousCentury: translate("DATE_TIME.PREVIOUSCENTURY"),
    nextCentury: translate("DATE_TIME.NEXTCENTURY"),
    shortWeekDays: [
      translate("SHORT_WEEK_DAYS.SUN"),
      translate("SHORT_WEEK_DAYS.MON"),
      translate("SHORT_WEEK_DAYS.TUE"),
      translate("SHORT_WEEK_DAYS.WED"),
      translate("SHORT_WEEK_DAYS.THU"),
      translate("SHORT_WEEK_DAYS.FRI"),
      translate("SHORT_WEEK_DAYS.SAT"),
    ],
    shortMonths: [
      translate("MONTHS.JANUARY"),
      translate("MONTHS.FEBRUARY"),
      translate("MONTHS.MARCH"),
      translate("MONTHS.APRIL"),
      translate("MONTHS.MAY"),
      translate("MONTHS.JUNE"),
      translate("MONTHS.JULY"),
      translate("MONTHS.AUGUST"),
      translate("MONTHS.SEPTEMBER"),
      translate("MONTHS.OCTOBER"),
      translate("MONTHS.NOVEMBER"),
      translate("MONTHS.DECEMBER"),
    ],
  },
  timePickerLocale: {
    placeholder: translate("DATE_TIME.CHOOSE_TIME"),
  },
  tableLocale: {
    triggerDesc: translate("TABLE_LOCALE.TRIGGERDESC"),
    triggerAsc: translate("TABLE_LOCALE.TRIGGERDESC"),
    cancelSort: translate("TABLE_LOCALE.TRIGGERDESC"),
    filterReset: translate("TABLE_LOCALE.TRIGGERDESC"),
    filterConfirm: translate("TABLE_LOCALE.TRIGGERDESC"),
  },
  roles: {
    admin: translate("COMMON.ADMIN"),
    judge: translate("COMMON.JUDGE"),
    specialist: translate("COMMON.MANAGER"),
  },
  eventFilters: {
    [EventFilters.REPUBLIC]: "EVENT_LEVELS.REPUBLIC",
    [EventFilters.REGION]: "EVENT_LEVELS.REGION",
    [EventFilters.DISTRICT]: "EVENT_LEVELS.DISTRICT",
    [EventFilters.TOWN]: "EVENT_LEVELS.TOWN",
    [EventFilters.OTHER]: "EVENT_LEVELS.OTHER",
  },
  pagination: {
    items_per_page: translate("PAGINATION.ITEMS_PER_PAGE"),
    jump_to: translate("PAGINATION.JUMP_TO"),
    jump_to_confirm: translate("PAGINATION.JUMP_TO_CONFIRM"),
    page: translate("PAGINATION.PAGE"),
    prev_page: translate("PAGINATION.PREV_PAGE"),
    next_page: translate("PAGINATION.NEXT_PAGE"),
    prev_5: translate("PAGINATION.PREV_5"),
    next_5: translate("PAGINATION.NEXT_5"),
    prev_3: translate("PAGINATION.PREV_3"),
    next_3: translate("PAGINATION.NEXT_3"),
  },
  dateFormat: "DD.MM.YYYY",
  dateTimeFormat: "DD.MM.YYYY HH:mm",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
  triggerDesc: translate("SORT.TRIGGERDESC"),
  triggerAsc: translate("SORT.TRIGGERASC"),
  cancelSort: translate("SORT.CANCELSORT"),
  emptyText: translate("SORT.EMPTYTEXT"),
  filterConfirm: translate("SORT.FILTERCONFIRM"),
  filterReset: translate("SORT.FILTERRESET"),
  filterEmptyText: translate("SORT.FILTEREMPTYTEXT"),
};
export const yaShareLink = "https://yastatic.net/share2/share.js";
export const defaultTime = "00:00.000";

export const defaultFormat = "mm:ss.SSS";

export const TimeMatchEvents = {
  UPDATE_TABLE_DATA: "updateTableData",
};

export const TabsButtonEvents = {
  ON_CLICK: "onClick",
};

export const ModalType = { ADD: "add", EDIT: "edit" };

export const timeMatchEventEmitter = new EventEmitter();
export const tabsButtonEventEmitter = new EventEmitter();

export const mailZubronok = "support@championships.by";

export const url = "https://robin-zubronok.site";
export const zubronokSite = "https://zubronok.by";
export const bntuSite = "https://bntu.by";
export const fitrSite = "https://bntu.by/faculties/fitr";
export const gymnSite = "http://gymn61.minsk.edu.by";

export const eventFilterOptions = Object.entries(EventFilters).map(
  ([key, value]) => ({
    label: Locale.eventFilters[value],
    value: EventFilters[key],
  })
);

export const defaultEventFilterOptions = Object.values(EventFilters);

export const LANGUAGES = {
  RU: "ru",
  BY: "by",
};
