import ChevronIcon from '../../icons/ChevronIcon';
import GenreFilter from './GenreFilter';
import RatingFilter from './RatingFilter';

type Genre = {
  name: string;
  slug: string;
};

interface FiltersProps {
  dropType: string;
  setDropType: (value: string) => void;
  setIsDropFilterActive: (value: boolean) => void;
  isDropFilterActive: boolean;
  genres: Genre[];
}

const Filters = ({
  dropType,
  setDropType,
  setIsDropFilterActive,
  isDropFilterActive,
  genres,
}: FiltersProps) => {
  const onFilterItemClick = (type: string) => {
    if (dropType === type) {
      return setDropType(''), setIsDropFilterActive(false);
    }
    setDropType(type);
    setIsDropFilterActive(true);
  };

  return (
    <div className="relative">
      <div className="actions flex gap-3">
        <button
          className="w-[113px] h-[48px] flex items-center justify-center gap-4"
          onClick={() => onFilterItemClick('rating')}>
          Rating
          <span className={`chevron ${dropType === 'rating' ? 'active' : ''}`}>
            <ChevronIcon />
          </span>
        </button>
        <button
          className="w-[113px] h-[48px] flex items-center justify-center gap-4"
          onClick={() => onFilterItemClick('genre')}>
          Genre
          <span className={`chevron ${dropType === 'genre' ? 'active' : ''}`}>
            <ChevronIcon />
          </span>
        </button>
      </div>

      <div className={`absolute  drop-wrapper w-full ${isDropFilterActive && 'active'}`}>
        {dropType === 'genre' && <GenreFilter genres={genres} />}
        {dropType === 'rating' && <RatingFilter />}
      </div>
    </div>
  );
};

export default Filters;
