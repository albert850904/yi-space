import CountryTableRow from "./CountryTableRow";
import SearchBar from "./SearchBar";
import "./CountryTable.sass";
import { useEffect, useState } from "react";

function CountryTable(props) {
  const {
    countryInfoList,
    setCountryInfoList,
    filterCountryHandler,
    getCountryInfoHandler,
  } = props;
  const [sortDirection, setSortDireciton] = useState(false);

  const sortCountryHandler = () => {
    if (!Array.isArray(countryInfoList)) return;
    countryInfoList.sort((a, b) => {
      if (sortDirection) return a.name.localeCompare(b.name, "en");
      return b.name.localeCompare(a.name, "en");
    });
    setCountryInfoList(countryInfoList);
  };

  useEffect(() => {
    sortCountryHandler();
  }, [sortDirection]);

  return (
    <>
      <SearchBar
        handleSearch={filterCountryHandler}
        getAll={getCountryInfoHandler}
      />
      <table className="table-style">
        <thead>
          <tr>
            <th>國旗</th>
            <th onMouseDown={() => setSortDireciton((prevState) => !prevState)}>
              國家名稱
            </th>
            <th>2位國家代碼</th>
            <th>3位國家代碼</th>
            <th>母語名稱</th>
            <th>替代國家名稱</th>
            <th>國際電話區號</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(countryInfoList) &&
            countryInfoList.map((country, index) => {
              return (
                <CountryTableRow
                  key={`${country.flag}-${index}`}
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
    </>
  );
}

export default CountryTable;
