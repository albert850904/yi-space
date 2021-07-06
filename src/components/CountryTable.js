import CountryTableRow from "./CountryTableRow";
import SearchBar from "./SearchBar";
import "./CountryTable.sass";
import { useEffect, useState } from "react";
const classNames = require("classnames");

function CountryTable(props) {
  const { countryInfoList, filterCountryHandler, getCountryInfoHandler } =
    props;
  const [tablePage, setTablePage] = useState(0);
  const [sortDirection, setSortDireciton] = useState(false);
  const [splitCountryList, setSplitCountryList] = useState(null);

  const sortCountryHandler = () => {
    splitCountryList.sort((a, b) => {
      if (sortDirection) return a.name.localeCompare(b.name, "en");
      return b.name.localeCompare(a.name, "en");
    });
    setSplitCountryList(splitCountryList);
  };

  useEffect(() => {
    if (!Array.isArray(countryInfoList)) return;
    setSplitCountryList(countryInfoList[tablePage]);
  }, [countryInfoList, tablePage]);

  useEffect(() => {
    if (!Array.isArray(splitCountryList)) return;
    sortCountryHandler();
  }, [sortDirection, splitCountryList]);

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
            <th
              onMouseDown={() => setSortDireciton((prevState) => !prevState)}
              className="clickable"
            >
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
          {Array.isArray(splitCountryList) &&
            splitCountryList.map((country, index) => {
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
      <ul className="pages">
        {Array.isArray(countryInfoList) &&
          Object.keys(countryInfoList)?.map((item) => {
            return (
              <li
                onClick={() => setTablePage(Number(item))}
                className={classNames(tablePage === Number(item) && "selected")}
              >
                {Number(item) + 1}
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default CountryTable;
