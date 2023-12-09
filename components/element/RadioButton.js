function RadioButton({status , setStatus , value , title , children}) {
  return (
    <div className={value}>
      <lable htmlFor={value}>
        {children}
        {title}
      </lable>
      <input
        id={value}
        type="radio"
        value={value}
        checked={status === value}
        onChange={(e) => setStatus(e.target.value)}
      />
    </div>
  );
}

export default RadioButton;
