'use strict';

function createTaskElement(task) {
    const taskElement = document.createElement('li');

    taskElement.className = "d-flex list-group-item align-items-center";
    /* taskElement.innerHTML = `
    <span class="col-4">
        <div class="custom-control custom-checkbox z-index-max">
            <input type="checkbox" class="custom-control-input" id="customCheck${task.id.toString()}" name="example1">
            <label class="custom-control-label ${task.isUrgent ? 'text-danger' : ''}" for="customCheck${task.id.toString()}">${task.description}</label>
        </div>                               
    </span>
    <span class="col-4 text-center">${task.isPrivate ? '<i class="bi bi-person-square text-dark"></i>' : ''}</span>
    <span class="col-4 text-right font-075">${task.deadlineToString()}</span>
    ` */

    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    const span3 = document.createElement('span');

    span1.className = 'col-4';
    span2.className = 'col-4 text-center';
    span3.className = 'col-4 text-right font-075';

    const div = document.createElement('div');
    div.className = 'custom-control custom-checkbox z-index-max';

    const input = document.createElement('input');
    input.className = 'custom-control-input';
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', 'customCheck'+task.id.toString());

    const label = document.createElement('label');
    label.className = 'custom-control-label';
    task.isUrgent ? label.classList.add('text-danger') : '';
    label.setAttribute('for', 'customCheck'+task.id.toString());
    label.innerText = task.description;
    
    div.appendChild(input);
    div.appendChild(label);
    span1.appendChild(div);
    
    if(task.isPrivate) {
        const icon = document.createElement('i');
        icon.className = 'bi bi-person-square text-dark';
        span2.appendChild(icon);
    }

    span3.innerText = task.deadlineToString();

    taskElement.appendChild(span1);
    taskElement.appendChild(span2);
    taskElement.appendChild(span3);

    return taskElement;
}

function appendTaskElements(tl) {
    const taskListElement = document.getElementById('taskList');

    for(const task of tl.list) {
        taskListElement.appendChild(createTaskElement(task));
    }
}

function enableFilters() {
    const filterNav = document.getElementById('taskFilter');
    const filterAnchors = filterNav.children;

    for(const filterA of filterAnchors) {
        filterA.addEventListener('click', (event) => {
            event.preventDefault();            
            filterBy(filterA.innerText, event.target);
        });        
    }
}

function filterBy(parameter, target) {
    const taskListElement = document.getElementById('taskList');
    const tl = new TaskList();
    const filterNav = document.getElementById('taskFilter');
    const filterAnchors = filterNav.children;

    for(const filterA of filterAnchors) {
        filterA.classList.remove('list-group-item-success', 'bg-success', 'border-success');
    }
    target.classList.add('list-group-item-success', 'bg-success', 'border-success');

    tl.add(tasks);
    tl.filterBy(parameter);

    document.getElementById('filterTitle').innerText = parameter;
    taskListElement.innerHTML = '';    
    appendTaskElements(tl);
}

function main() {
    const tl = new TaskList();
    tl.add(tasks);
    appendTaskElements(tl);
}

main();
enableFilters();