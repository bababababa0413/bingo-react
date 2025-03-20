import Input from './Input'
import Radio from './Radio';
import RangeInput from './RangeInput';
import ParticipantList from './ParticipantList';

const InputForm = ({ formData, onChange, onChangeParticipants, onAddParticipants, onDeleteParticipants}) => {
    return (
        <table id="setting">
            <tbody>
                <tr>
                    <Input label="サイズ(1~10)" type="number" min="1" max="10" value={formData.size} name="size" onChange={onChange}></Input>
                </tr>
                <tr>
                    <RangeInput label="点数の範囲(0~100)" min="0" max="100" minValue={formData.rangeMin} maxValue={formData.rangeMax} onChangeMin={onChange} onChangeMax={onChange}></RangeInput>
                </tr>
                <tr>
                    <Radio label="値の重複" options={[{label: '有', value: 'duplicate'}, {label: '無', value: 'no-duplicate'}]} value={formData.duplicate} name="duplicate" onChange={onChange}></Radio>
                </tr>
                <tr>
                    <Input label="縛りなしの割合" type="number" min="1" max="10" value={formData.rate} name="rate" onChange={onChange}></Input>
                </tr>
                <tr>
                    <ParticipantList label="参加者" participants={formData.participants} onChange={onChangeParticipants} onAdd={onAddParticipants} onDelete={onDeleteParticipants}></ParticipantList>
                </tr>
            </tbody>
        </table>
    );
}

export default InputForm;