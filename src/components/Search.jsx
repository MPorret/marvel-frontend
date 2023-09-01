import { ReactSearchAutocomplete } from "react-search-autocomplete"; // Autocomplete search

const Search = ({ search, setSearch }) => {
  const items = search;

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results);
    setSearch(string);
  };

  //   const handleOnHover = (result) => {
  //     // the item hovered
  //     console.log(result.name);
  //     setSearch(result.name);
  //   };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item.name);
    setSearch(item.name);
  };

  //   const handleOnFocus = () => {
  //     console.log("Focused");
  //   };

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
            // onHover={handleOnHover}
            onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{
              backgroundColor: "#2e2c30",
              border: "none",
              color: "#d9d9d9",
              margin: "0 auto",
            }}
          />
        </div>
      </header>
    </div>
  );
};

export default Search;
