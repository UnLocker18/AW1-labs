import dayjs from 'dayjs'

const task = [
    {id: 1, description: "Buy groceries", urgent: true, priv: false, deadline: dayjs("2021-04-15 17:45") },
    {id: 2, description: "Web app. lectures", urgent: false, priv: false, deadline: "" },
    {id: 3, description: "Read a book", urgent: true, priv: false, deadline: "" },
    {id: 4, description: "Get amazon package", urgent: false, priv: true, deadline: "" },
    {id: 5, description: "Team reunion", urgent: true, priv: true, deadline: dayjs("2021-04-20 14:30") },
  ];

const list = ["All", "Important", "Today", "After 7 Days", "Private"];

export {task, list};