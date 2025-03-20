const Radio = ({ label, options, value, name, onChange }) => {
    return (
        <>
            <th>
                {label}：
            </th>
            <td>
                {options.map((option, index) => {
                    return (
                        <div key={index}>
                            <input type="radio" name={name} value={option.value} onChange={onChange} checked={value === option.value} />
                            <label>{option.label}</label>
                        </div>
                    )

                })}
            </td>
        </>
    );
}

export default Radio;