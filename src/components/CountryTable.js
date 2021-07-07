import { useEffect, useState } from "react";
import CountryTableRow from "./CountryTableRow";
import SearchBar from "./SearchBar";
import "./CountryTable.sass";
import Spinner from "./UI/Spinner";
import Modal from "./UI/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
const classNames = require("classnames");

const ASCENT = 1;
const DECENT = 0;

function CountryTable(props) {
  const {
    isWaiting,
    setIsWaiting,
    countryInfoList,
    filterCountryHandler,
    getCountryInfoHandler,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [tablePage, setTablePage] = useState(0);
  const [sortDirection, setSortDireciton] = useState(DECENT);
  const [splitCountryList, setSplitCountryList] = useState(null);

  const sortCountryHandler = () => {
    setIsWaiting(true);
    splitCountryList.sort((a, b) => {
      if (sortDirection === DECENT) return a.name.localeCompare(b.name, "en");
      return b.name.localeCompare(a.name, "en");
    });
    setSplitCountryList(splitCountryList);
  };

  const handleFilter = (text) => {
    setTablePage(0);
    filterCountryHandler(text);
  };

  const modalOpenHandler = (name) => {
    let chosenCountry;
    for (const section of countryInfoList) {
      const temp = section.find((country) => country.name === name);
      if (temp) chosenCountry = temp;
    }
    setSelectedCountry(chosenCountry);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isWaiting) return;
    const timer = setTimeout(() => {
      setIsWaiting(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isWaiting]);

  useEffect(() => {
    if (!Array.isArray(countryInfoList)) return;
    setIsWaiting(true);
    setSplitCountryList(countryInfoList[tablePage]);
  }, [countryInfoList, tablePage]);

  useEffect(() => {
    if (!Array.isArray(splitCountryList)) return;
    sortCountryHandler();
  }, [sortDirection, splitCountryList]);

  return (
    <>
      <SearchBar handleSearch={handleFilter} getAll={getCountryInfoHandler} />
      <table className="table-style">
        <thead>
          <tr>
            <th>國旗</th>
            <th
              onMouseDown={() =>
                setSortDireciton((prevState) =>
                  prevState === DECENT ? ASCENT : DECENT
                )
              }
              className="clickable"
            >
              國家名稱
              {sortDirection === ASCENT ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
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
                  onPressCountry={modalOpenHandler}
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
      <Modal
        show={isModalOpen}
        closed={() => setIsModalOpen(false)}
        info={selectedCountry}
      />
      <Spinner show={isWaiting} />
    </>
  );
}

export default CountryTable;
