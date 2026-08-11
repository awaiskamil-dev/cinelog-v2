import './SearchBar.css';

function SearchBar(){
  return (
    <div className="search-bar">
      <div className="search-group">
        <label>Search</label>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" className="search-input" />
        <i className="fa-solid fa-xmark js-clear-search hidden"></i>
      </div>

      <div className="genre-group">
        <label>Genre</label>
        <select className="genre-select">
          <option>Any</option>
          <option>Action</option>
          <option>Romance</option>
          <option>Comedy</option>
          <option>Drama</option>
          <option>Horror</option>
          <option>Sci-Fi</option>
          <option>Animation</option>
          <option>Thriller</option>
        </select>
        <i className="fa-solid fa-angle-down js-angle-down-genre"></i>
        <i className="fa-solid fa-xmark js-clear-genre hidden"></i>
      </div>      
      
      <div className="year-group">
        <label>Year</label>
        <select className="year-select">
          <option>Any</option>
        </select>
        <i className="fa-solid fa-angle-down js-angle-down-year"></i>
        <i className="fa-solid fa-xmark js-clear-year hidden"></i>
      </div>

      <div className="format-group">
        <label>Format</label>
        <select className="format-select">
          <option>Any</option>
          <option>Movie</option>
          <option>Series</option>
        </select>
        <i className="fa-solid fa-angle-down js-angle-down-format"></i>
        <i className="fa-solid fa-xmark js-clear-format hidden"></i>
      </div>
    </div>
  );
};

export default SearchBar;