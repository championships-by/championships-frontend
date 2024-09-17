export const ERRORS = {
    "email taken": "Введённый Email уже занят",
    
    getError: function (errorKey) {
        return this[errorKey] || "Неизвестная ошибка";
    }
};