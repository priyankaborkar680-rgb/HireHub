import "./Testimonials.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


import {
  FaStar,
} from "react-icons/fa";

import user1 from "../../assets/testimonials/user1.svg";
import user2 from "../../assets/testimonials/user2.svg";
import user3 from "../../assets/testimonials/user3.svg";

const reviews = [

{
id:1,
name:"Priya Sharma",
role:"Frontend Developer",
company:"Google",
image:user1,
review:"HireHub helped me get my dream React Developer job within just two weeks. Amazing experience!"
},

{
id:2,
name:"Rahul Verma",
role:"Software Engineer",
company:"Microsoft",
image:user2,
review:"Very smooth application process and great companies. Highly recommended."
},

{
id:3,
name:"Sneha Patil",
role:"UI/UX Designer",
company:"Adobe",
image:user3,
review:"Beautiful interface and lots of quality jobs. Loved using HireHub."
},

{
  id: 4,
  name: "Amit Singh",
  role: "Backend Developer",
  company: "Spotify",
  image: user1,
  review: "Excellent platform for developers."
},
{
  id: 5,
  name: "Neha Patel",
  role: "Full Stack Developer",
  company: "Meta",
  image: user2,
  review: "Found my dream job in just a few days."
}

];

const Testimonials = () => {

return (

<section className="testimonials">

<div className="testimonial-heading">

<h2>What Our Users Say</h2>

<p>
Trusted by thousands of job seekers worldwide.
</p>

</div>

<Swiper
  modules={[Autoplay, Navigation]}
  navigation={true}
  spaceBetween={30}
  slidesPerView={3}

  loop={true}

  grabCursor={true}
  simulateTouch={true}
  touchRatio={1}

  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}

  breakpoints={{
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
>

{

reviews.map((item)=>(

<SwiperSlide key={item.id}>

<div className="review-card">

<img src={item.image} alt={item.name} />

<h3>{item.name}</h3>

<h4>{item.role}</h4>

<span>{item.company}</span>

<div className="stars">

<FaStar/>

<FaStar/>

<FaStar/>

<FaStar/>

<FaStar/>

</div>

<p>{item.review}</p>

</div>

</SwiperSlide>

))

}

</Swiper>

</section>

);

};

export default Testimonials;