import dayjs from 'dayjs';

const filters = [
    {id: 1, text: 'All', active: true, url: '/all'},
    {id: 2, text: 'Important', active: false, url: '/important'},
    {id: 3, text: 'Today', active: false, url: '/today'},
    {id: 4, text: 'Next 7 Days', active: false, url: '/next_week'},
    {id: 5, text: 'Private', active: false, url: '/private'},
];

const tl = [
    { id: 1, description: "Fai qualcosa", isPrivate: true, isUrgent: false, date: dayjs("2021-04-26") },
    { id: 2, description: "Fai qualcosa2", isPrivate: true, isUrgent: true, date: dayjs("2021-04-26") },
    { id: 3, description: "Fai qualcosa3", isPrivate: false, isUrgent: false, date: dayjs("2021-04-26") },
];

export {filters, tl};