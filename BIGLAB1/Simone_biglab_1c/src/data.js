
const filters = [
    {id: 1, text: 'All', active: true},
    {id: 2, text: 'Important', active: false},
    {id: 3, text: 'Today', active: false},
    {id: 4, text: 'Next 7 Days', active: false},
    {id: 5, text: 'Private', active: false},
];

const tl = [
    { id: 1, description: "Fai qualcosa", isPrivate: true, isUrgent: false, date: "Monday 29 March 2021 0:00" },
    { id: 2, description: "Fai qualcosa2", isPrivate: true, isUrgent: true, date: "Monday 29 March 2021 0:00" },
    { id: 3, description: "Fai qualcosa3", isPrivate: false, isUrgent: false, date: "Monday 29 March 2021 0:00" },
];

export {filters, tl};