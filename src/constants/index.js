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
    text: "Администратор",
    value: "admin",
  },
  {
    text: "Судья",
    value: "judge",
  },
  {
    text: "Менеджер",
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
  FORBIDDEN: { TITLE: "403", PATH: "/403" },
  AUTHORIZATION: { TITLE: "Авторизация", PATH: "/" },
  LOGOUT: { TITLE: "Выход", PATH: "/logout" },
  PARTICIPANTS: { TITLE: "Управление участниками", PATH: "/participants" },
  PARTICIPANT_INFORMATION: {
    TITLE: "Карточка участника",
    PATH: (participantID) => `/participants/${participantID}`,
  },
  USERS_CONTROL: { TITLE: "Управление пользователями", PATH: "/users" },
  USER_SETTINGS: { TITLE: "Настройки пользователя", PATH: "/settings" },
  USER_SETTINGS_TEST: { TITLE: "Тест", PATH: "/settings/test" },
  ABOUT_PROGRAM: { TITLE: "О портале", PATH: "/about" },
  FEEDBACK: { TITLE: "Обратная связь", PATH: "/feedback" },
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
  JUDGMENT_CRITERIA: {
    TITLE: "Компетенции по критериям",
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
  USER_SETTINGS_TEST: "settings/test",
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
  roles: {
    admin: "Администратор",
    judge: "Судья",
    specialist: "Менеджер",
  },
  eventFilters: {
    [EventFilters.REPUBLIC]: "Республиканский",
    [EventFilters.REGION]: "Областной",
    [EventFilters.DISTRICT]: "Районный",
    [EventFilters.TOWN]: "Городской",
    [EventFilters.OTHER]: "Другое",
  },
  pagination: {
    items_per_page: "элементов на странице",
    jump_to: "Перейти",
    jump_to_confirm: "подтвердить",
    page: "Страница",
    prev_page: "Предыдущая страница",
    next_page: "Следующая страница",
    prev_5: "Предыдущие 5 страниц",
    next_5: "Следующие 5 страниц",
    prev_3: "Предыдущие 3 страницы",
    next_3: "Следующие 3 страницы",
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
  filterEmptyText: "Нет фильтров",
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
