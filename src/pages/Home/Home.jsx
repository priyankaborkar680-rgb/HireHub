import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import TrustedCompanies from "../../components/TrustedCompanies/TrustedCompanies";
import FeaturedJobs from "../../components/FeaturedJobs/FeaturedJobs";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import Categories from "../../components/Categories/Categories";
import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedCompanies />
      <FeaturedJobs />
      <WhyChoose />
      <Categories />
      <Testimonials />
    </>
  );
};

export default Home;