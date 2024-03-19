export function formatPrice(price) {
    return new Intl.NumberFormat("ru-RU").format(price);
}

export function formatDate(date) {
    const inputDate = new Date(date);

    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];

    const formattedDate = `${inputDate.getDate()} ${months[inputDate.getMonth()]} ${inputDate.getFullYear()}г`;

    return formattedDate;
}