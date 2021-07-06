function CountryTableRow(props) {
  const {
    flag,
    name,
    alpha2Code,
    alpha3Code,
    nativeName,
    altSpellings,
    callingCodes,
  } = props;

  return (
    <tr>
      <td>
        <img src={flag} alt={name} />
      </td>
      <td>{name}</td>
      <td>{alpha2Code}</td>
      <td>{alpha3Code}</td>
      <td>{nativeName}</td>
      <td>{altSpellings}</td>
      <td>{callingCodes}</td>
    </tr>
  );
}

export default CountryTableRow;
