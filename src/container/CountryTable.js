import { useEffect, useState } from "react";
import CountryTableLayout from "../components/CountryTable";
import { Country } from "../lib/agents";

function CountryTable() {
  const [countryInfoList, setCountryInfoList] = useState([]);

  const getCountryInfoHandler = async () => {
    try {
      const result = await Country.getCountryInfo();
      const { data, status } = result;
      if (status === 200) setCountryInfoList(data);
    } catch (error) {
      console.log(
        "[container/CountryTable] getCountryInfoHandler error: ",
        error
      );
    }
  };

  useEffect(() => {
    getCountryInfoHandler();
  }, []);

  return <CountryTableLayout countryInfoList={countryInfoList} />;
}

export default CountryTable;
