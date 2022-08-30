const PersonForm = ({
  submitHandler,
  nameHandler,
  numberHandler,
  newNameState,
  newNumberState,
}) => {
  return (
    <form onSubmit={submitHandler}>
      <div>
        name: <input value={newNameState} onChange={nameHandler} />
      </div>
      <div>
        number: <input value={newNumberState} onChange={numberHandler} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
