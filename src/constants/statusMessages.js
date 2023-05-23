// Constant values for status descriptions
export const loginStatusMsg = {
    200: 'Zalogowano pomyślnie',
    400: 'Błędne dane',
    401: 'Sprawdź, czy nazwa i hasło są poprawne',
    500: 'Brak odpowiedzi z serwera',
    error: 'Wystąpił błąd',
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