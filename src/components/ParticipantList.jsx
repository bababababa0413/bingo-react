import Participant from "./Participant";

const ParticipantList = ({ label, participants, onChange, onAdd, onDelete}) => {
    return (
        <>
            <th>
                {label}：
            </th>
            <td>
                {participants.map((participant, index) => {
                    return (
                        <Participant participant={participant} onChange={onChange} onDelete={onDelete} index={index} key={index}></Participant>
                    )
                })}
                <button id="plus" onClick={onAdd}>+</button>
            </td>
        </>
    )
}

export default ParticipantList;