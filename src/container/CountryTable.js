import { useEffect, useState } from "react";
import CountryTableLayout from "../components/CountryTable";
import { Country } from "../lib/agents";

function CountryTable() {
  const [countryInfoList, setCountryInfoList] = useState([]);

  const splitArrayHandler = (data) => {
    const tempArray = [];
    for (let i = 0, j = data.length; i < j; i += 25) {
      const arr = data.slice(i, i + 25);
      tempArray.push(arr);
    }
    setCountryInfoList(tempArray);
  };

  const getCountryInfoHandler = async () => {
    try {
      const result = await Country.getCountryInfo();
      const { data, status } = result;
      if (status === 200) splitArrayHandler(data);
    } catch (error) {
      console.log(
        "[container/CountryTable] getCountryInfoHandler error: ",
        error
      );
    }
  };

  const filterCountryHandler = async (text) => {
    try {
      const result = await Country.filterCountryInfo(text);
      const { data, status } = result;
      if (status === 200) setCountryInfoList(data);
    } catch (error) {
      console.log(
        "[container/CountryTable] filterCountryHandler error: ",
        error
      );
    }
  };

  useEffect(() => {
    getCountryInfoHandler();
  }, []);

  return (
    <CountryTableLayout
      countryInfoList={countryInfoList}
      setCountryInfoList={setCountryInfoList}
      getCountryInfoHandler={getCountryInfoHandler}
      filterCountryHandler={filterCountryHandler}
    />
  );
}

export default CountryTable;
