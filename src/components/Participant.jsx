const Participant = ({ participant, onChange, onDelete, index}) => {
    return (
        <div>
            <input type="text" className="participant" value={participant} onChange={(e) => onChange(index, e.target.value)}/>
            <button className="delete" onClick={() => onDelete(index)}>×</button>
        </div>
    );
}

export default Participant;