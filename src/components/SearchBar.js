import { useEffect, useRef, useState } from "react";

function SearchBar(props) {
  const { handleSearch } = props;
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef();

  const _handleSearch = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    if (typeof value === "string" && value.trim() === "") {
      setErrorMsg("請輸入欲搜尋國家");
      return;
    }
    handleSearch(value);
  };

  return (
    <div>
      <form onSubmit={_handleSearch}>
        <input
          type="text"
          name="country"
          placeholder="Countries..."
          onFocus={() => setErrorMsg("")}
          ref={inputRef}
        />
        <button type="submit">搜尋</button>
        {!!errorMsg && <div>{errorMsg}</div>}
      </form>
    </div>
  );
}

export default SearchBar;
