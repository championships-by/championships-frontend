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

export const NOMINATION_TYPES = {
  CRITERIA: "По критериям",
  TIME: "По времени",
  OLYMPIC: "Плей-офф",
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
  AUTHORIZATION: { TITLE: "Авторизация", PATH: "/" },
  LOGOUT: { TITLE: "Выход", PATH: "/logout" },
  PARTICIPANTS: { TITLE: "Управление участниками", PATH: "/participants" },
  USERS_CONTROL: { TITLE: "Управление пользователями", PATH: "/users" },
  USER_SETTINGS: { TITLE: "Настройки пользователя", PATH: "/settings" },
  USER_SETTINGS_TEST: { TITLE: "Тест", PATH: "/settings/test" },
  EVENTS: { TITLE: "Мероприятия", PATH: "/events" },
  EVENTS_DESCRIPTION: {
    TITLE: "Описание мероприятия",
    PATH: (eventID) => `/events/${eventID}`,
  },
  EVENTS_REGISTRATION: {
    TITLE: "Регистрация участников",
    PATH: (eventID) => `/events/${eventID}/registration`,
  },
  JUDGMENT: { TITLE: "Управление мероприятиями", PATH: "/judgment/events" },
  JUDGMENT_CREATE: {
    TITLE: "Создать мероприятие",
    PATH: "/judgment/events/create",
  },
  JUDGMENT_CREATE_TEST: {
    TITLE: "Создать мероприятие",
    PATH: "/judgment/events/create/test",
  },
  JUDGMENT_EVENT_SETTINGS: {
    TITLE: "Редактирование",
    PATH: (eventID) => `/judgment/events/${eventID}/settings`,
  },
  JUDGMENT_GROUP_STAGE: {
    TITLE: "Групповой этап",
    PATH: (event_id, nomination_id) =>
      `/judgment/events/${event_id}/${nomination_id}/group-stage`,
  },
  JUDGMENT_TIME_MATCHES: {
    TITLE: "Матчи на время",
    PATH: (event_id, nomination_id) =>
      `/judgment/events/${event_id}/${nomination_id}/time-matches`,
  },
  JUDGMENT_COMPETENCIES: {
    TITLE: "Компетенции по критериям",
    PATH: (event_id, nomination_id) =>
      `/judgment/events/${event_id}/${nomination_id}/competencies`,
  },
};

export const ROUTER_ROUTES = {
  NOT_FOUND: "*",
  UNAUTHORIZED: "/401",
  ROOT: "/",
  LOGOUT: "logout",
  ADMIN_PANEL: "",
  PARTICIPANTS: "participants",
  USERS_CONTROL: "users",
  USER_SETTINGS: "settings",
  USER_SETTINGS_TEST: "settings/test",
  EVENTS: "events",
  EVENTS_DESCRIPTION: ":eventID",
  EVENTS_REGISTRATION: ":eventID/registration",
  JUDGMENT: "judgment/events",
  JUDGMENT_CREATE: "create",
  JUDGMENT_CREATE_TEST: "create/test",
  JUDGMENT_EVENT_SETTINGS: ":eventID/settings",
  JUDGMENT_GROUP_STAGE: ":eventId/:nominationId/group-stage",
  JUDGMENT_TIME_MATCHES: ":eventId/:nominationId/time-matches",
  JUDGMENT_COMPETENCIES: ":eventId/:nominationId/competencies",
};

export const Locale = {
  lang: {
    locale: "ru_RU",
    placeholder: "Выберите дату",
    rangePlaceholder: ["Начало", "Конец"],
    today: "Сегодня",
    now: "Сейчас",
    backToToday: "Вернуться к сегодняшнему дню",
    ok: "OK",
    clear: "Очистить",
    month: "Месяц",
    year: "Год",
    timeSelect: "Выберите время",
    dateSelect: "Выберите дату",
    monthSelect: "Выберите месяц",
    yearSelect: "Выберите год",
    decadeSelect: "Выберите квартал",
    yearFormat: "YYYY",
    dateFormat: "M/D/YYYY",
    dayFormat: "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    timeFormat: "HH:mm",
    monthFormat: "MMMM",
    monthBeforeYear: true,
    previousMonth: "Предыдущий месяц (PageUp)",
    nextMonth: "Следующий месяц (PageDown)",
    previousYear: "Предыдущий год (Control + left)",
    nextYear: "Следующий год (Control + right)",
    previousDecade: "Предыдущий квартал",
    nextDecade: "Следующий квартал",
    previousCentury: "Предыдущий век",
    nextCentury: "Следующий век",
    shortWeekDays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    shortMonths: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
  },
  timePickerLocale: {
    placeholder: "Выберите время",
  },
  tableLocale: {
    triggerDesc: "Нажмите, чтобы сортировать по убыванию",
    triggerAsc: "Нажмите, чтобы сортировать по возрастанию",
    cancelSort: "Нажмите, чтобы отменить сортировку",
    filterReset: "Отменить",
    filterConfirm: "Ок",
  },
  dateFormat: "DD.MM.YYYY",
  dateTimeFormat: "DD.MM.YYYY HH:mm",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
  triggerDesc: "Нажмите для сортировки по убыванию",
  triggerAsc: "Нажмите для сортировки по возрастанию",
  cancelSort: "Нажмите для отмены сортировки",
  emptyText: "Нет данных",
  filterConfirm: "Ок",
  filterReset: "Сбросить",
};
export const yaShareLink = "https://yastatic.net/share2/share.js";
export const defaultTime = "00:00.000";

export const defaultFormat = "mm:ss.SSS";

export const TimeMatchEvents = {
  UPDATE_TABLE_DATA: "updateTableData",
};

export const ModalType = { ADD: "add", EDIT: "edit" };

export const timeMatchEventEmitter = new EventEmitter();

export const mailZubronok = "support@championships.by";

export const url = "https://robin-zubronok.site";
