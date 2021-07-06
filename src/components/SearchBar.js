import { useRef } from "react";

function SearchBar(props) {
  const { handleSearch } = props;
  const inputRef = useRef();

  const _handleSearch = (e) => {
    e.preventDefault();
    const value = inputRef.current.value;
    handleSearch(value);
  };

  return (
    <div>
      <form onSubmit={_handleSearch}>
        <input
          type="text"
          name="country"
          placeholder="Countries..."
          ref={inputRef}
        />
        <button type="submit">搜尋</button>
      </form>
    </div>
  );
}

export default SearchBar;
