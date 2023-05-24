// Constant values for status descriptions

export const loginStatusMsg = {
    200: 'login_status_200',
    400: 'login_status_400',
    401: 'login_status_401',
    500: 'login_status_500',
    error: 'login_status_error',
};

export const registerStatusMsg = {
    201: 'Udało Ci się zarejestrować konto',
    400: 'Rejestracja się nie powiodła',
    409: 'Konto o takich parametrach już istnieje',
    500: 'Brak odpowiedzi z serwera',
    error: 'Wystąpił błąd'
}

export const logoutStatusMsg = {
    200: 'Wylogowano pomyślnie',
    error: 'Nie udało się wylogować',
};