import useURLParams from '../../hooks/useURLParams';
import { TGenre } from '../../types';

interface GenreFilterProps {
  genres: TGenre[];
}

const GenreFilter = ({ genres }: GenreFilterProps) => {
  const { selectedValues, handleItemClick } = useURLParams('genres');

  return (
    <div className="drop w-[50%] right-[-6px] absolute pt-5 pl-3 pb-5">
      {genres.map((item, index) => (
        <div key={index} className="flex items-center" onClick={() => handleItemClick(item.slug)}>
          <input
            type="checkbox"
            id={`genre-${index}`}
            className="mr-2"
            checked={selectedValues.includes(item.slug)}
            onChange={() => {}}
          />
          <label htmlFor={`genre-${index}`}>{item.name}</label>
        </div>
      ))}
    </div>
  );
};

export default GenreFilter;
