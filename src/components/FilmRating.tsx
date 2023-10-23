import HalfStarIcon from '../icons/HalfStarIcon';
import SolidStarIcon from '../icons/SolidStarIcon';
import TransStarIcon from '../icons/TransStarIcon';

interface FilmRatingProps {
  rating: number;
}

const FilmRating = ({ rating }: FilmRatingProps) => {
  const solidStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const transStars = 10 - solidStars - (hasHalfStar ? 1 : 0);

  const stars = [];
  for (let i = 0; i < solidStars; i++) {
    stars.push(<SolidStarIcon key={`solid-star-${i}`} />);
  }
  if (hasHalfStar) {
    stars.push(<HalfStarIcon key="half-star" />);
  }
  for (let i = 0; i < transStars; i++) {
    stars.push(<TransStarIcon key={`trans-star-${i}`} />);
  }

  return <div className="flex">{stars}</div>;
};

export default FilmRating;
