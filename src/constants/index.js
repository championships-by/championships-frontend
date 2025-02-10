import { EventEmitter } from "events";

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
  FIRST_AUTHORIZATION: { TITLE: "COMMON.AUTH", PATH: "/auth/first_login" },
  RESET_PASSWORD: {
    TITLE: "COMMON.PASSWORD_RECOVERY",
    PATH: "/reset_password",
  },
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
  FIRST_AUTHORIZATION: "/auth/first_login",
  RESET_PASSWORD: "/reset_password",
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

export const tableLocale = {
  triggerDesc: "TABLE_LOCALE.TRIGGERDESC",
  triggerAsc: "TABLE_LOCALE.TRIGGERASC",
  cancelSort: "TABLE_LOCALE.CANCELSORT",
  filterReset: "TABLE_LOCALE.FILTERRESET",
  filterConfirm: "TABLE_LOCALE.FILTERCONFIRM",
  emptyText: "COMMON.NO_DATA",
};

export const paginationLocale = {
  items_per_page: "PAGINATION.ITEMS_PER_PAGE",
  jump_to: "PAGINATION.JUMP_TO",
  jump_to_confirm: "PAGINATION.JUMP_TO_CONFIRM",
  page: "PAGINATION.PAGE",
  prev_page: "PAGINATION.PREV_PAGE",
  next_page: "PAGINATION.NEXT_PAGE",
  prev_5: "PAGINATION.PREV_5",
  next_5: "PAGINATION.NEXT_5",
  prev_3: "PAGINATION.PREV_3",
  next_3: "PAGINATION.NEXT_3",
};

export const calendarLocale = {
  lang: {
    locale: "ru_RU",
    placeholder: "DATE_TIME.PLACEHOLDER",
    rangePlaceholder: ["DATE_TIME.BEGIN", "DATE_TIME.END"],
    today: "DATE_TIME.TODAY",
    now: "DATE_TIME.NOW",
    backToToday: "DATE_TIME.BACKTOTODAY",
    ok: "DATE_TIME.OK",
    clear: "DATE_TIME.CLEAR",
    month: "DATE_TIME.MONTH",
    year: "DATE_TIME.YEAR",
    timeSelect: "DATE_TIME.TIMESELECT",
    dateSelect: "DATE_TIME.DATESELECT",
    monthSelect: "DATE_TIME.MONTHSELECT",
    yearSelect: "DATE_TIME.YEARSELECT",
    decadeSelect: "DATE_TIME.DECADESELECT",
    previousMonth: "DATE_TIME.PREVIOUSMONTH",
    nextMonth: "DATE_TIME.NEXTMONTH",
    previousYear: "DATE_TIME.PREVIOUSYEAR",
    nextYear: "DATE_TIME.NEXTYEAR",
    previousDecade: "DATE_TIME.PREVIOUSDECADE",
    nextDecade: "DATE_TIME.NEXTDECADE",
    previousCentury: "DATE_TIME.PREVIOUSCENTURY",
    nextCentury: "DATE_TIME.NEXTCENTURY",
    shortWeekDays: [
      "SHORT_WEEK_DAYS.SUN",
      "SHORT_WEEK_DAYS.MON",
      "SHORT_WEEK_DAYS.TUE",
      "SHORT_WEEK_DAYS.WED",
      "SHORT_WEEK_DAYS.THU",
      "SHORT_WEEK_DAYS.FRI",
      "SHORT_WEEK_DAYS.SAT",
    ],
    shortMonths: [
      "MONTHS.JANUARY",
      "MONTHS.FEBRUARY",
      "MONTHS.MARCH",
      "MONTHS.APRIL",
      "MONTHS.MAY",
      "MONTHS.JUNE",
      "MONTHS.JULY",
      "MONTHS.AUGUST",
      "MONTHS.SEPTEMBER",
      "MONTHS.OCTOBER",
      "MONTHS.NOVEMBER",
      "MONTHS.DECEMBER",
    ],
  },
  timePickerLocale: {
    placeholder: "DATE_TIME.CHOOSE_TIME",
  },
};

export const Locale = {
  lang: {
    locale: "ru_RU",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    timeFormat: "HH:mm",
    monthFormat: "MMMM",
    monthBeforeYear: true,
  },
  roles: {
    admin: "COMMON.ADMIN",
    judge: "COMMON.JUDGE",
    specialist: "COMMON.MANAGER",
  },
  eventFilters: {
    [EventFilters.REPUBLIC]: "EVENT_LEVELS.REPUBLIC",
    [EventFilters.REGION]: "EVENT_LEVELS.REGION",
    [EventFilters.DISTRICT]: "EVENT_LEVELS.DISTRICT",
    [EventFilters.TOWN]: "EVENT_LEVELS.TOWN",
    [EventFilters.OTHER]: "EVENT_LEVELS.OTHER",
  },
  dateFormat: "DD.MM.YYYY",
  dateTimeFormat: "DD.MM.YYYY HH:mm",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
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

export const url = API_HOST;

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

export const ANTD_INPUT_FIELD_STATUSES = {
  DEFAULT: null,
  ERROR: "error",
  WARNING: "warning",
};

export const MAX_TEXTAREA_LENGTH = 1000;
