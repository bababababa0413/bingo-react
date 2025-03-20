const RangeInput = ({label, min, max, minValue, maxValue, onChangeMin, onChangeMax}) => {
    return (
        <>
            <th>
                {label}：
            </th>
            <td>
                <input type="number" min={min} max={max} value={minValue} name="rangeMin" onChange={onChangeMin}/>
                ~
                <input type="number" min={min} max={max} value={maxValue} name="rangeMax" onChange={onChangeMax}/>
            </td>
        </>
    );
}

export default RangeInput;