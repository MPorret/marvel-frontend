import { ReactSearchAutocomplete } from "react-search-autocomplete"; // Autocomplete search

const Search = ({ search, setSearch }) => {
  const items = search;

  const handleOnSearch = (string, results) => {
    setSearch(string);
  };

  const handleOnSelect = (item) => {
    console.log(item.name);
    setSearch(item.name);
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            autoFocus
            formatResult={formatResult}
            styling={{
              backgroundColor: "#2e2c30",
              border: "none",
              color: "#d9d9d9",
              margin: "0 auto",
              zIndex: "1",
            }}
          />
        </div>
      </header>
    </div>
  );
};

export default Search;
