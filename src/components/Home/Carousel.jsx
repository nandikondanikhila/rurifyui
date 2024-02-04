/* eslint-disable react/prop-types */
import Slider from "react-slick";

const HomeCarosel = () => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block",background: "gray",borderRadius:'20px' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray",borderRadius:'20px' }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="w-11/12 m-auto my-5">
      <Slider {...settings} className="slider-container">
        <div>
          <img
            className="h-[80vh] w-full m-auto"
            src="https://res.cloudinary.com/dnqcxtdsy/image/upload/v1707036354/images/toshcrrn8kxab0jxs4m4.jpg"
          />
        </div>
        <div>
          <img
            className="h-[80vh] w-full m-auto"
            src="https://res.cloudinary.com/dnqcxtdsy/image/upload/v1707036332/images/rggrfc8mpkvrpdlhk4zb.jpg"
          />
        </div>
        <div>
          <img
            className="h-[80vh] w-full m-auto"
            src="https://res.cloudinary.com/dnqcxtdsy/image/upload/v1707036346/images/g6uycvlhmz0lq6rltjti.jpg"
          />
        </div>
        <div>
          <img
            className="h-[80vh] w-full m-auto"
            src="https://res.cloudinary.com/dnqcxtdsy/image/upload/v1707036319/images/pixucclqfxyei3o2vewr.jpg"
          />
        </div>
      </Slider>
    </div>
  );
};
export default HomeCarosel;
