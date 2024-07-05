export const FILE_UPLOADING = {
  UPLOADING: 'uploading',
  DONE: 'done',
  ERROR: 'error',
  UPLOAD: {
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  },
}

export const RESPONSE_STATUS = {
  STATUS_OK: 200,
  STATUS_UNAUTHORIZED: 401,
  STATUS_FORBIDDEN: 403,
  STATUS_NOTFOUND: 404,
}

export const ROUTES = {
  NOT_FOUND: { TITLE: '404', PATH: '*' },
  UNAUTHORIZED: { TITLE: '401', PATH: '/401' },
  AUTHORIZATION: { TITLE: 'Авторизация', PATH: '/' },
  LOGOUT: { TITLE: 'Выход', PATH: '/logout' },
  PARTICIPANTS: { TITLE: 'Управление участниками', PATH: '/participants' },
  USERS_CONTROL: { TITLE: 'Управление пользователями', PATH: '/users' },
  USER_SETTINGS: { TITLE: 'Настройка аккаунта', PATH: '/settings' },
  EVENTS: { TITLE: 'Мероприятия', PATH: '/events' },
  EVENTS_DESCRIPTION: {
    TITLE: ' Описание мероприятия',
    PATH: (eventID) => `/events/${eventID}`,
  },
  EVENTS_REGISTRATION: {
    TITLE: 'Регистрация участников',
    PATH: (eventID) => `/events/${eventID}/registration`,
  },
  JUDGMENT: { TITLE: 'Судейство', PATH: '/judgment/events' },
  JUDGMENT_CREATE: {
    TITLE: 'Создание мероприятия',
    PATH: '/judgment/events/create',
  },
  JUDGMENT_EVENT_SETTINGS: {
    TITLE: 'Редактрирование мероприятия',
    PATH: (eventID) => `/judgment/events/${eventID}/settings`,
  },
}

export const ROUTER_ROUTES = {
  NOT_FOUND: '*',
  UNAUTHORIZED: '/401',
  ROOT: '/',
  LOGOUT: 'logout',
  ADMIN_PANEL: '',
  PARTICIPANTS: 'participants',
  USERS_CONTROL: 'users',
  USER_SETTINGS: 'settings',
  EVENTS: 'events',
  EVENTS_DESCRIPTION: ':eventID',
  EVENTS_REGISTRATION: ':eventID/registration',
  JUDGMENT: 'judgment/events',
  JUDGMENT_CREATE: 'create',
  JUDGMENT_EVENT_SETTINGS: ':eventID/settings',
}

export const Locale = {
  lang: {
    locale: 'ru_RU',
    placeholder: 'Выбирите дату',
    rangePlaceholder: ['Начало', 'Конец'],
    today: 'Сегодня',
    now: 'Сейчас',
    backToToday: 'Вернуться к сегодняшнему дню',
    ok: 'OK',
    clear: 'Очистить',
    month: 'Месяц',
    year: 'Год',
    timeSelect: 'Выбирите время',
    dateSelect: 'Выбирите дату',
    monthSelect: 'Выбирите месяц',
    yearSelect: 'Выбирите год',
    decadeSelect: 'Выбирите квартал',
    yearFormat: 'YYYY',
    dateFormat: 'M/D/YYYY',
    dayFormat: 'D',
    dateTimeFormat: 'M/D/YYYY HH:mm:ss',
    monthFormat: 'MMMM',
    monthBeforeYear: true,
    previousMonth: 'Предидущий месяц (PageUp)',
    nextMonth: 'Следующий месяц (PageDown)',
    previousYear: 'Предидущий год (Control + left)',
    nextYear: 'Следующий год (Control + right)',
    previousDecade: 'Предидущий квартал',
    nextDecade: 'Следующий квартал',
    previousCentury: 'Предидущий век',
    nextCentury: 'Следующий век',
    shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    shortMonths: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июнь',
      'Июль',
      'Авг',
      'Сент',
      'Окт',
      'Нояб',
      'Дек',
    ],
  },
  timePickerLocale: {
    placeholder: 'Выбирите время',
  },
  dateFormat: 'DD-MM-YYYY',
  dateTimeFormat: 'DD-MM-YYYY HH:mm:ss',
  weekFormat: 'YYYY-wo',
  monthFormat: 'YYYY-MM',
}

export const FILTER_OPTION = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
