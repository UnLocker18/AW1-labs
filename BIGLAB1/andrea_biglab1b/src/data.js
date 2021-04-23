import dayjs from "dayjs"

const filters = [
    {id: 1, text: 'All'},
    {id: 2, text: 'Important'},
    {id: 3, text: 'Today'},
    {id: 4, text: 'Next 7 Days'},
    {id: 5, text: 'Private'}
];

const tasks = [
    { id: 1, description: "Fai qualcosa", isPrivate: true, isUrgent: false, date: dayjs("04-19-2021")},
    { id: 2, description: "Fai qualcosa2", isPrivate: true, isUrgent: true, date: dayjs("04-23-2021")},
    { id: 3, description: "Fai qualcosa3", isPrivate: false, isUrgent: false, date: dayjs("12-02-2021")}
];

export {filters, tasks};