const SelectInputLabeled = ({ labelName, id, name, stateValue, onStateChange, data }) => {
    const onChangeHandler = (e) => {
        console.log(e.target.value)
        onStateChange(e.target.value);
    };

    return (
        <div>
            <label htmlFor={id}>{labelName}</label>
            <select
                id={id}
                name={name}
                value={stateValue}
                onChange={(e) => onChangeHandler(e)}
            >
                <option value='default' disabled>----select----</option>
                {data.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectInputLabeled;
