import { useState, useEffect, useMemo } from 'react';
import { TMovie } from '../types';
import { useLocation } from 'react-router-dom';
import { generateSlug } from '../helpers';

const useFilter = (initialMovies: TMovie[]) => {
  const [filteredMovies, setFilteredMovies] = useState<TMovie[]>(initialMovies);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const location = useLocation();

  const ratingFilters = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('rating')?.split(',') || [];
  }, [window.location.search]);

  const genreFilters = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('genres')?.split(',') || [];
  }, [window.location.search]);

  useEffect(() => {
    const query = searchQuery.toLocaleLowerCase();

    let filteredBySearch = initialMovies;

    if (query) {
      filteredBySearch = filteredBySearch.filter((m) =>
        m.title.toLocaleLowerCase().includes(query),
      );
    }

    let filteredByRating = filteredBySearch;
    if (ratingFilters.length && !ratingFilters.includes('any')) {
      filteredByRating = filteredByRating.filter((movie) =>
        ratingFilters.includes(movie.rating.toString()),
      );
    }

    let filteredByGenres = filteredByRating;
    if (genreFilters.length && !genreFilters.includes('any')) {
      filteredByGenres = filteredByGenres.filter((movie) =>
        genreFilters.includes(generateSlug(movie.category)),
      );
    }

    setFilteredMovies(filteredByGenres);
  }, [location.search, searchQuery, initialMovies, ratingFilters, genreFilters]);

  return {
    searchQuery,
    setSearchQuery,
    filteredMovies,
  };
};

export default useFilter;
