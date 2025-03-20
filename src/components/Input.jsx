const Input = ({label, type, min, max, value, name, onChange}) => {
    return (
        <>
            <th>
                {label}：
            </th>
            <td>
                <input type={type} min={min} max={max} value={value} name={name} onChange={onChange}/>
            </td>
        </>
    );
}

export default Input;