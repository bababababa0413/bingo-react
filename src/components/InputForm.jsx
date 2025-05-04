import Input from './Input'
import Radio from './Radio';
import RangeInput from './RangeInput';
import ParticipantList from './ParticipantList';

const InputForm = ({ formData, setFormData }) => {
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleChangeParticipants = (index, value) => {
        const updateParticipants = [...formData.participants];
        updateParticipants[index] = value;

        setFormData(prev => ({ ...prev, participants: updateParticipants }));
    }

    const handleAddParticipants = () => {
        setFormData(prev => ({ ...prev, participants: [...prev.participants, ''] }));
    }

    const handleDeleteParticipants = (index) => {
        if (formData.participants.length === 1) {
            return;
        }

        const updateParticipants = formData.participants.filter((_, i) => i !== index);

        setFormData(prev => ({ ...prev, participants: updateParticipants }));
    }

    return (
        <table id="setting">
            <tbody>
                <tr>
                    <Input label="サイズ(1~10)" type="number" min="1" max="10" value={formData.size} name="size" onChange={handleChange}></Input>
                </tr>
                <tr>
                    <RangeInput label="点数の範囲(0~100)" min="0" max="100" minValue={formData.rangeMin} maxValue={formData.rangeMax} onChangeMin={handleChange} onChangeMax={handleChange}></RangeInput>
                </tr>
                <tr>
                    <Radio label="値の重複" options={[{ label: '有', value: 'duplicate' }, { label: '無', value: 'no-duplicate' }]} value={formData.duplicate} name="duplicate" onChange={handleChange}></Radio>
                </tr>
                <tr>
                    <Input label="縛りなしの割合" type="number" min="1" max="10" value={formData.rate} name="rate" onChange={handleChange}></Input>
                </tr>
                <tr>
                    <ParticipantList label="参加者" participants={formData.participants} onChange={handleChangeParticipants} onAdd={handleAddParticipants} onDelete={handleDeleteParticipants}></ParticipantList>
                </tr>
            </tbody>
        </table>
    );
}

export default InputForm;