import { useState } from 'react';
import FilmRating from './components/FilmRating';
import Filters from './components/filters';
import useFilter from './hooks/useFilter';
import useMoviesData from './hooks/useMoviesData';

function App() {
  const [dropType, setDropType] = useState<string>('');
  const [isDropFilterActive, setIsDropFilterActive] = useState<boolean>(false);
  const { movies, genres } = useMoviesData();

  const { searchQuery, setSearchQuery, filteredMovies } = useFilter(movies);

  return (
    <div
      className="w-[795px] mx-auto border-2  mt-4 flex items-center justify-between"
      style={{
        paddingTop: '22px',
        paddingLeft: '21px',
        paddingRight: '80px',
        paddingBottom: '22px',
      }}>
      <div className="search-wrapper relative">
        <input
          type="text"
          placeholder="Enter movie name"
          className="w-[441px] h-[48px] pl-4 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery.length > 0 && filteredMovies.length > 0 && (
          <div className="absolute w-full drop pt-3 pl-3 pb-4 pr-3 top-[calc(100%_+_4px)]">
            {filteredMovies.map((film) => (
              <div className="relative mb-2" key={film.id}>
                <h1 className="text-black text-sm font-semibold">{film.title}</h1>
                <span className="absolute right-0 top-0 text-[#777] text-sm font-semibold">
                  {film.category}
                </span>
                <FilmRating rating={film.rating} />
              </div>
            ))}
          </div>
        )}
      </div>
      {movies.length > 0 && (
        <Filters
          dropType={dropType}
          setDropType={setDropType}
          setIsDropFilterActive={setIsDropFilterActive}
          isDropFilterActive={isDropFilterActive}
          genres={genres}
        />
      )}
    </div>
  );
}

export default App;
