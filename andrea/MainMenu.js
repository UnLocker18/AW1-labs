import Task from "./Task.js"

const MainMenu = (props) => {
    return(
        <main className="p-3">
            <h3>
                <b>Filter: </b>{props.currentFilterName.toLowerCase()}
            </h3>
            <ul className="list-group">
                <Task title="task1" isPrivate={true} date="lun 22 mar 12:43" isImportant={true}/>
                <Task title="task2"/>
                <Task title="task3"/>
                <Task title="task4"/>
            </ul>
        </main>
    )
}

export default MainMenu