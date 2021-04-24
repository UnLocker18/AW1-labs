
/* const filters = [
    {id: 1, text: 'All'},
    {id: 2, text: 'Important'},
    {id: 3, text: 'Today'},
    {id: 4, text: 'Next 7 Days'},
    {id: 5, text: 'Private'},
]; */

const filters = ['All', 'Important', 'Today', 'Next 7 Days', 'Private'];

const tasks = [
    { id: 1, description: "Fai qualcosa", isPrivate: true, isUrgent: false, date: "Monday 29 March 2021 at 0:00" },
    { id: 2, description: "Fai qualcosa2", isPrivate: true, isUrgent: true, date: "Monday 29 March 2021 at 0:00" },
    { id: 3, description: "Fai qualcosa3", isPrivate: false, isUrgent: false, date: "Monday 29 March 2021 at 0:00" },
];

export {filters, tasks};