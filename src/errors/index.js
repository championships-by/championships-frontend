export const ERRORS = {
    "email taken": "Введённый Email уже занят",
    "logged out": "Для доступа к системе необходима авторизация",
    
    getError: function (errorKey) {
        return this[errorKey] || "Неизвестная ошибка";
    }
};