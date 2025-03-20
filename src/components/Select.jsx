const Select = ({ options, i, j, onChange}) => {
    return (
        <select onChange={(e) => onChange(i, j, e)}>
            {options.map((option, index) => {
                return (
                    <option key={index}>{option}</option>
                )
            })}
        </select>
    )
}

export default Select;