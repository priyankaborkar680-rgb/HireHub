import Hero from "../../components/Hero/Hero";
import TrustedCompanies from "../../components/TrustedCompanies/TrustedCompanies";
import FeaturedJobs from "../../components/FeaturedJobs/FeaturedJobs";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import Categories from "../../components/Categories/Categories";
import Testimonials from "../../components/Testimonials/Testimonials";
import DownloadApp from "../../components/DownloadApp/DownloadApp";
import Newsletter from "../../components/Newsletter/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <TrustedCompanies />
      <FeaturedJobs />
      <WhyChoose />
      <Categories />
      <Testimonials />
      <DownloadApp />
      <Newsletter />
    </>
  );
};

export default Home;