const FilterForm = ({value, handleFilterChange}) => {
    return(
        <div>
        <p>Find Countries: <input value={value} onChange={handleFilterChange}/></p>
        </div>
    )
}

export default FilterForm