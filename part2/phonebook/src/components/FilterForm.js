const FilterForm = ({filterChangeHandler, filter}) => {
    return(
        <div>
            Filter by Name: <input value={filter} onChange={filterChangeHandler}/>
        </div>
    )
}

export default FilterForm