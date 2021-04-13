"use strict";

dayjs.extend(window.dayjs_plugin_isToday);
dayjs.extend(window.dayjs_plugin_isBetween);

function Task(id, desc, urgent = false, priv = true, deadline) {
    this.id = id;
    this.desc = desc;
    this.urgent = urgent;
    this.private = priv;
    this.deadline = deadline && dayjs(deadline);

    this.toString = () => {
        return `
        ID: ${this.id}, Description: ${this.desc}, Urgent: ${this.urgent}, Private: ${this.private}` 
        + (this.deadline ? this.deadline.format("MMMM DD, YYYY HH:mm") : "")
    };
}

function TaskList() {
    this.list = [];

    this.add = (newTask) => {
        if (!this.list.some(tsk => tsk.id == newTask.id))
            this.list.push(newTask);
        else 
            throw new Error('Duplicate task');
    }

    this.sortByDeadline = () => {
        return [...this.list].sort( (a, b) => {
            if (a.deadline && b.deadline)
                return dayjs(a.deadline).diff(b.deadline);
            else if (!a.deadline) return 1;
            else return -1;
        } );
    }

    this.filterByUrgent = () => {
        return this.list.filter( (tsk) => tsk.urgent);
    }

    this.filterByPrivate = () => {
        return this.list.filter( (tsk) => tsk.private );
    }

    this.filterToday = () => {
        return this.list.filter( (tsk) => tsk.deadline && dayjs(tsk.deadline).isToday() );
    }

    this.filter7Days = () => {
        return this.list.filter( (tsk) => {
            const now = dayjs();
            const then = now.add(7, 'day'); 

            return dayjs(tsk.deadline).isBetween(now, then);
        } )
    }

    this.sortAndPrint = () => {
        const tmp = [...list];

        tmp.sort( (a, b) => { 
            if (a.deadline.isBefore(b.deadline)) {
                return 1;
            } else if (b.deadline.isBefore(a.deadline)) {
                return -1;
            }
        } );

        return tmp;
    };

    this.filterAndPrint = () => {
        const filteredList = this.list.filter ( (tsk) => {
            if (tsk.urgent) return true;
            else return false;
        } );

        return filteredList;
    };
}


const t1 = new Task(0, "Computer Lab 3", true, false, "2021-04-02T08:30:00.000Z");
const t2 = new Task(1, "Buy Groceries", false, true);
const t3 = new Task(2, "Review React", true, false, "2021-04-03T16:30:00.000Z");
const t4 = new Task(3, "Cook Dinner", false, true, "2021-03-30T16:30:00.000Z");

const taskList = new TaskList;

taskList.add(t1);
taskList.add(t2);
taskList.add(t3);
taskList.add(t4);

function displayTaskList(tl, list) {
    let i = 0;

    tl.innerHTML = "";
    for (const nt of list) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        const strong = (nt.urgent) && document.createElement('strong');
        const span1 = document.createElement('span');
        const icon = (!nt.private) && document.createElement('i');
        const span2 = document.createElement('span');

        li.className = "list-group-item d-flex justify-content-between";
        div.className = "custom-control custom-checkbox d-inline col-4";
        input.className = "custom-control-input";
        label.className = "custom-control-label";
        if (strong) strong.className = "text-danger";
        span1.className = "col-4 text-center";
        if (icon) icon.className = "bi bi-people-fill";
        span2.className = "col-4 text-right";

        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', 'customCheckTsk' + `${i}`);
        label.setAttribute('for', 'customCheckTsk' + `${i}`);
        i++;

        if (strong) strong.innerText = nt.desc;
        else label.innerText = nt.desc;
        if (nt.deadline) span2.innerText = dayjs(nt.deadline).isToday() ? "Today, " + dayjs(nt.deadline).format("HH:mm") : dayjs(nt.deadline).format("MMMM DD, YYYY HH:mm");
        
        tl.append(li);
        li.append(div);
        div.append(input);
        div.append(label);
        if (strong) label.append(strong);
        li.append(span1);
        if (icon) span1.append(icon);
        li.append(span2);
    }
}

window.addEventListener('load', event => {
    let tl = document.getElementById('TaskList');
    displayTaskList(tl, taskList.list);   

    const filters = document.querySelectorAll('.nav-link');
    for (const f of filters) {
        f.addEventListener('click', event => {
            switch (event.target.id) {
                case "All":
                    displayTaskList(tl, taskList.list);
                    break;
                case "Important":
                    displayTaskList(tl, taskList.filterByUrgent());
                    break;
                case "Today":
                    displayTaskList(tl, taskList.filterToday());
                    break;
                case "7Days":
                    displayTaskList(tl, taskList.filter7Days());
                    break;
                case "Private":
                    displayTaskList(tl, taskList.filterByPrivate());
                    break;
                default:
            }
        });
        
    }
});