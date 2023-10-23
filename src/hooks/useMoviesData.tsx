import { useEffect, useState } from 'react';
import { moviesList } from '../data';
import { TMovie, TGenre } from '../types';
import { generateSlug } from '../helpers';

const useMoviesData = () => {
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [genres, setGenres] = useState<TGenre[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const moviesWithId = moviesList.reduce<TMovie[]>((acc, movie, index) => {
        acc.push({ id: index + 1, ...movie });
        return acc;
      }, []);
      setMovies(moviesWithId);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchedGenres = movies.reduce<TGenre[]>((acc, movie) => {
      if (movie.category && !acc.some((genre) => genre.name === movie.category)) {
        acc.push({
          name: movie.category,
          slug: generateSlug(movie.category),
        });
      }
      return acc;
    }, []);
    setGenres([{ name: 'Any genre', slug: 'any' }, ...fetchedGenres]);
  }, [movies]);

  return { movies, genres };
};

export default useMoviesData;
