"use strict"

function Tasks(id, description, urgent=false, priv=true, deadline="")
{
    this.id=id;
    this.description=description;
    this.urgent=urgent;
    this.priv=priv;
    this.deadline=deadline&&dayjs(deadline);

    this.getDescription=() =>{ return this.description; };
    this.getDeadline=() =>{ return this.deadline; };
    this.getUrgent=() => { return this.urgent; };
    this.getPrivate=() =>{ return this.priv; };
}

function Methods()
{
    this.taskList=[];

    this.add=(task) =>
    {
        this.taskList.push(task);
    }

    this.sortAndPrint=() =>
    {
        const newList=[...this.taskList];
        newList.filter(task=>task.deadline).sort( (x,y ) =>
        {
            if(x.deadline.isAfter(y.deadline)) return 1;
            else return -1;
        } );
        return newList;
    }

    this.filterUrgent=() =>
    {
        return [...this.taskList].filter( e => e.urgent);
    }

    this.filterPrivate=() =>
    {
        return [...this.taskList].filter( e=> e.priv);
    }

    this.filterToday=() =>
    {
        return [...this.taskList].filter(e => e.deadline)
                                 .filter(e => e.deadline.format("YYYY-MM-DD")==dayjs().format("YYYY-MM-DD"));
    }

    this.filterAfter7Days=() =>
    {
        return [...this.taskList].filter(e => e.deadline)
                                 .filter(e => {
                                     if(e.deadline.isAfter(dayjs().add(7, 'day'))) return e.deadline;
                                 });
    }

    this.returnList=() =>
    {
        return [...this.taskList];
    }
}

const methods=new Methods();
methods.add(new Tasks(1, "Buy groceries", true, false, "2021-04-15 17:45"));
methods.add(new Tasks(2, "Web app. lectures", false, false, "2021-05-01 10:00"));
methods.add(new Tasks(3, "Read a book", true, false, ""));  
methods.add(new Tasks(4, "Get amazon package", false, true, ""));
methods.add(new Tasks(5, "Team reunion", true, true, "2021-04-20 14:30"));

function selectFilter(n)
{
    const head=document.getElementById('filters');  //select of filters DOM
    for(let h of head.children)
    {   //removing active highlight
        h.classList.remove('active');
        h.style.backgroundColor='initial';
    }
    head.children[n].classList.add('active');  
    head.children[n].style.backgroundColor='green';
}

function headerCreator(ul, val)
{
    const elem=document.createElement('span');
    elem.className="size_2";

    switch(val){
        case 0:
            elem.innerText="All";
            break;
        case 1:
            elem.innerText="Important";
            break;
        case 2:
            elem.innerText="Today";
            break;
        case 3:
            elem.innerText="After 7 Days";
            break;
        case 4:
            elem.innerText="Private";
            break;
        default:
            break;
    }

    const e=document.createElement('li');
    e.className="list-group-item";
    e.appendChild(elem);
    ul.appendChild(e);
}

function listCreator(list, ul)
{
    list.forEach(el =>{
        //element wrapper -> list item
        const elem1 = document.createElement('li');
        elem1.className="list-group-item d-flex justify-content-between";

        //checkbox
        const elem2= document.createElement('input');
        elem2.className="form-check-input me-2";
        elem2.type="checkbox";
        elem2.value="";
        elem1.appendChild(elem2);

        //task ddescription
        const elem3=document.createElement('span');
        if(el.getUrgent()===true) elem3.className="text-danger";
        elem3.innerText=el.getDescription();
        elem1.appendChild(elem3);

        //personal icon
        if(el.getPrivate()===true){
            const elem4=document.createElement('i');
            elem4.className="bi bi-person-square c_black";
            elem1.appendChild(elem4);
        }

        //task deadline
        const elem5=document.createElement('span');
        elem5.innerText=el.getDeadline()/*||"YYYY-MM-DDTHH:mm"*/;      
        elem1.appendChild(elem5); 
        ul.appendChild(elem1);      
    });
}

function All() 
{
    const list = methods.returnList();

    //Managing filtes selection
    selectFilter(0);

    //removing all children nodes of <ul>
    const ul=document.getElementById("taskList");   
    [...ul.children].forEach( (el) => { el.remove(); } );  

    //header <li>
    headerCreator(ul, 0);
    
    //body <li>
    listCreator(list, ul);

}

function Important ()
{
    const list = methods.filterUrgent();

    selectFilter(1);

    const ul=document.getElementById("taskList");   
    [...ul.children].forEach( (el) => { el.remove(); } );

    headerCreator(ul, 1);

    listCreator(list, ul);
}

function Today()
{
    const list = methods.filterToday();

    selectFilter(2);

    const ul=document.getElementById("taskList");   
    [...ul.children].forEach( (el) => { el.remove(); } );

    headerCreator(ul, 2);

    listCreator(list, ul);
}

function After7Days()
{
    const list = methods.filterAfter7Days();

    selectFilter(3);

    const ul=document.getElementById("taskList");   
    [...ul.children].forEach( (el) => { el.remove(); } );

    headerCreator(ul, 3);

    listCreator(list, ul);
}

function Private()
{
    const list = methods.filterPrivate();

    selectFilter(4);

    const ul=document.getElementById("taskList");   
    [...ul.children].forEach( (el) => { el.remove(); } );  //removing all children nodes of <ul>

    headerCreator(ul, 4);

    listCreator(list, ul);
}

window.addEventListener('load', event =>{
    All();

    const e_all=document.getElementById('All');
    const e_important=document.getElementById('Important');
    const e_private=document.getElementById('Private');
    const e_today=document.getElementById('Today');
    const e_a7d=document.getElementById('After7Days');

    e_all.addEventListener('click', event => { All(); });
    e_important.addEventListener('click',event => { Important(); });
    e_private.addEventListener('click', event =>{  Private(); });
    e_today.addEventListener('click', event => { Today(); });
    e_a7d.addEventListener('click', event => { After7Days(); });
    
});
