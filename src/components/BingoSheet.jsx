import Select from "./Select";

const BingoSheet = ({ bingoData, participants, onChange}) => {
    return (
        <table>
            <tbody>
                {bingoData.map((dataArr, i) => {
                    return (
                        <tr key={i}>
                            {dataArr.map((data, j) => {
                                return (
                                    <td key={j}>
                                        <div>
                                            <span>
                                                {data.score}
                                            </span>
                                            <span>
                                                {data.condition}
                                            </span>
                                            <Select options={participants} i={i} j={j} onChange={onChange}></Select>
                                        </div>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

export default BingoSheet;