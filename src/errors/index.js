export const ERRORS = {
  "email taken": "Введённый Email уже занят",
  "logged out": "Для доступа к системе необходима авторизация",
  "team cannot contain email address": "Название команды не может содержать email адрес",
  "email doesn't exist": "Email не существует",
  getError: function (errorKey) {
    return this[errorKey] || "Произошла неизвестная ошибка.";
  },
};
