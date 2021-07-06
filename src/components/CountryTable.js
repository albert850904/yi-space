import CountryTableRow from "./CountryTableRow";

function CountryTable(props) {
  const { countryInfoList } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>國旗 (flag)</th>
          <th>國家名稱（name）</th>
          <th>2位國家代碼(alpha2Code)</th>
          <th>3位國家代碼(alpha3Code)</th>
          <th>母語名稱(nativeName)</th>
          <th>替代國家名稱(altSpellings)</th>
          <th>國際電話區號(callingCodes)</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(countryInfoList) &&
          countryInfoList.map((country) => {
            return (
              <CountryTableRow
                flag={country.flag}
                name={country.name}
                alpha2Code={country.alpha2Code}
                alpha3Code={country.alpha3Code}
                nativeName={country.nativeName}
                altSpellings={country.altSpellings}
                callingCodes={country.callingCodes}
              />
            );
          })}
      </tbody>
    </table>
  );
}

export default CountryTable;
