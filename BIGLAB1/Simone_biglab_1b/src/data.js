
const filters = [
    {id: 1, text: 'All', active: true},
    {id: 2, text: 'Important', active: false},
    {id: 3, text: 'Today', active: false},
    {id: 4, text: 'Next 7 Days', active: false},
    {id: 5, text: 'Private', active: false},
];
/*
const tasks = [
    { id: 1, description: "Fai qualcosa", isPrivate: true, isUrgent: false, date: "Monday 29 March 2021 at 0:00" },
    { id: 2, description: "Fai qualcosa2", isPrivate: true, isUrgent: true, date: "Monday 29 March 2021 at 0:00" },
    { id: 3, description: "Fai qualcosa3", isPrivate: false, isUrgent: false, date: "Monday 29 March 2021 at 0:00" },
];
*/
const tasks = [
    {id: 1, description: "Buy groceries", isUrgent: true, isPrivate: false, date: "2021-04-15 17:45" },
    {id: 2, description: "Web app. lectures", isUrgent: false, isPrivate: false, date: "2021-04-19 10:10" },
    {id: 3, description: "Read a book", isUrgent: true, isPrivate: false, date: "" },
    {id: 4, description: "Get amazon package", isUrgent: false, isPrivate: true, date: "" },
    {id: 5, description: "Team reunion", isUrgent: true, isPrivate: true, date: "2021-04-30 14:30" },
  ];

export {filters, tasks};