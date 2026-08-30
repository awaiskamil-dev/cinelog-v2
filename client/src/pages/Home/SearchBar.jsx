import { useEffect, useState } from 'react';
import './SearchBar.css';
import API_URL from '../../config';

function SearchBar({
  searchInput, setSearchInput,
  genreSelect, setGenreSelect,
  yearSelect, setYearSelect,
  formatSelect, setFormatSelect,
  setResults, setLoading
}){
  const [filtersOpen, setFiltersOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const startYear = 1970;
  const endYear = currentYear + 2;

  const years = [];
  for(let year = endYear; year >= startYear; year--){
    years.push(year);
  }

  useEffect(() => {
    if(
      searchInput === '' &&
      genreSelect === 'Any' &&
      yearSelect === 'Any' &&
      formatSelect === 'Any'
    ){
      setLoading(false);
      return;
    }
    const timeout = setTimeout(async () => {
      try{
        setLoading(true);
        let url;
        const genreValue = genreSelect === 'Any' ? '' : genreSelect.toLowerCase();
        const yearValue = yearSelect === 'Any' ? '' : yearSelect;
        const formatValue = formatSelect === 'Any' ? '' : (
          formatSelect === 'Movie' ? 'movie' : 'tv'
        );

        if(searchInput !== ''){
          url = `${API_URL}/movies/search?query=${searchInput}&genre=${genreValue}&year=${yearValue}&format=${formatValue}`;  
        }
        else if(
          genreSelect !== 'Any' ||
          yearSelect !== 'Any' ||
          formatSelect !== 'Any'
        ){
          url = `${API_URL}/movies/discover?genre=${genreValue}&year=${yearValue}&format=${formatValue}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setResults(data.results);
      }
      catch(err){
        console.log(err);
      }
      finally{
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchInput, genreSelect, yearSelect, formatSelect, setResults, setLoading]);

  return (
    <div className="search-bar">
      <div className="search-group">
        <label>Search</label>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input 
          type="text"
          className="search-input"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        {searchInput !== '' && (
          <i className="fa-solid fa-xmark"
            onClick={() => setSearchInput('')}
          />
        )}
      </div>

      <div className='filters-btn-container' onClick={() => setFiltersOpen(!filtersOpen)}>
        <button className='filters-btn'>
          <i className="fa-solid fa-sliders"></i>
        </button>
      </div>

      <div className={`genre-group ${filtersOpen? 'filters active' : 'filters'}`}>
        <label>Genre</label>
        <select className="genre-select"
          value={genreSelect}
          onChange={(event) => setGenreSelect(event.target.value)}
        >
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
        {genreSelect !== 'Any'?
          (<i className="fa-solid fa-xmark" onClick={() => setGenreSelect('Any')}/>)
          :(<i className="fa-solid fa-angle-down"/>)
        }
      </div>      
      
      <div className={`year-group ${filtersOpen? 'filters active' : 'filters'}`}>
        <label>Year</label>
        <select className="year-select"
          value={yearSelect}
          onChange={(event) => setYearSelect(event.target.value)}
        >
          <option>Any</option>
          {
            years.map((year) => {
              return (
                <option key={year}>{year}</option>
              );
            })
          }
        </select>
        {yearSelect === 'Any' ? 
          (<i className="fa-solid fa-angle-down"/>) 
          :(<i className="fa-solid fa-xmark" onClick={() => setYearSelect('Any')}/>)
        }
      </div>

      <div className={`format-group ${filtersOpen? 'filters active' : 'filters'}`}>
        <label>Format</label>
        <select className="format-select"
          value={formatSelect}
          onChange={(event) => setFormatSelect(event.target.value)}
        >
          <option>Any</option>
          <option>Movie</option>
          <option>Series</option>
        </select>
        {formatSelect === 'Any' ? 
          ( <i className="fa-solid fa-angle-down"/>)
          :(<i className="fa-solid fa-xmark" onClick={() => setFormatSelect('Any')}/>)
        }
      </div>
    </div>
  );
};

export default SearchBar;