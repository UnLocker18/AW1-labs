import Filter from "./Filter.js"

const FilterMenu = (props) => {
    return(
        <aside className="h-100 bg-light">
            <ul className="list-group p-3">
                <Filter key="all" title="All" active={true}/>
                <Filter key="important" title="Important" />
                <Filter key="today" title="Today" />
                <Filter key="next_7_days" title="Next 7 Days" />
                <Filter key="private" title="Private" />
            </ul>
        </aside>
    )
}

export default FilterMenu