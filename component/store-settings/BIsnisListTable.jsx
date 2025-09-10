const BisnisListTable = ({ bisnisList }) => {
  return (
    <div>
      <strong>List Of Bisnis</strong>
      <hr />
      <ul>
        {bisnisList.map((bisnis, idx) => {
          return (
            <li key={bisnis.id} className="py-1">
              {bisnis.businnessName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BisnisListTable;
