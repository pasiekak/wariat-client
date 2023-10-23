const Checkbox = (props) => {
    return (
        <div className="select-checkbox">
            <label>
                <input type="checkbox" 
                value={props.id} 
                checked={props.checked}
                onChange={props.handleChange} />
                {props.text}
            </label>
        </div>
    )
}

export default Checkbox;