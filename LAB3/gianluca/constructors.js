'use strict';

dayjs.extend(dayjs_plugin_isToday);
dayjs.extend(dayjs_plugin_isBetween);

function Task(id, description, isUrgent, isPrivate, deadline){
    this.id = id;
    this.description = description;
    this.isUrgent = isUrgent || false;
    this.isPrivate = isPrivate == false ? false : true;
    this.deadline = (deadline && dayjs(deadline).isValid()) ? dayjs(deadline) : undefined;
    
    this.deadlineToString = () => this.deadline ? this.deadline.format('dddd D MMMM YYYY [at] H:mm') : 'not defined';
}

function TaskList(){
    this.list = [];
    this.add = (task) => {
        try {
            task.forEach(t => this.list.push(t));
        } catch {
            this.list.push(task);
        }
    };
    this.filterBy = (parameter) => {
        parameter = parameter.toLowerCase();
        switch(parameter) {
            case 'important':
                this.list = this.list.filter( (task) => task.isUrgent );
                break;
            case 'today':
                this.list = this.list.filter( (task) => task.deadline ? task.deadline.isToday() : false);
                break;
            case 'next 7 days':
                this.list = this.list.filter( (task) => task.deadline ? task.deadline
                    .isBetween(dayjs().startOf('d').add(1, 'day'), dayjs().startOf('d').add(8, 'day')) : false );
                break;
            case 'private':
                this.list = this.list.filter( (task) => task.isPrivate );
                break;
        }
    };
}