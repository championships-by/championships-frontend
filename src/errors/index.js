export const ERRORS = {
  "email taken": "Введённый Email уже занят",
  "logged out": "Для доступа к системе необходима авторизация",
  "team cannot contain email address": "Название команды не может содержать email адрес",
  getError: function (errorKey) {
    return this[errorKey] || "Произошла неизвестная ошибка.";
  },
};
