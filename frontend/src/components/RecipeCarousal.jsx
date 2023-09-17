import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import time from "../assets/time.png";
import likes from "../assets/likes.png";
import score from "../assets/score.png";
import { Link } from 'react-router-dom';
import "../styles/RecipeCarousal.css";

export default function RecipeCarousel({ data }) {

  if (!data || data.length === 0) {
    return null;
  }

  const recipe = data?.map((item) => (
    <div key={item.id} className="div">
      <Link to={`/recipe/${item.id}`} className='result-link'>
      <img src={item.image} alt={item.title} className="image" />
      <div className="details">
        <h2>{item.title}</h2>
        {item.aggregateLikes && <div className="flex-div">
          <div>
            <img src={likes} alt="icon" />
            <p className="left-p">{item.aggregateLikes} Likes</p>
          </div>
          <div>
            <img src={time} alt="icon" />
            <p>Ready in {item.readyInMinutes} Minutes</p>
          </div>
          <div>
            <img src={score} alt="icon" />
            <p>Health Score {item.healthScore}</p>
          </div>
        </div>}
      </div>
      </Link>
    </div>
  ));

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel showDots={false} responsive={responsive} >
        {recipe}
      </Carousel>
    </>
  );
}