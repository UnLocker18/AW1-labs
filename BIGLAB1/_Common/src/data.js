import dayjs from 'dayjs';

const filters = [
    { id: 1, text: 'All' },
    { id: 2, text: 'Important' },
    { id: 3, text: 'Today' },
    { id: 4, text: 'Next 7 Days' },
    { id: 5, text: 'Private' },
];

const tl = [
    { id: 1, description: "Fai qualcosa", isPrivate: true, isUrgent: false, date: dayjs("2021-04-26") },
    { id: 2, description: "Fai qualcosa2", isPrivate: true, isUrgent: true, date: dayjs("2021-04-26") },
    { id: 3, description: "Fai qualcosa3", isPrivate: false, isUrgent: false, date: dayjs("2021-04-26") },
];

export { filters, tl };