import "./Categories.css";
import {
  FaLaptopCode,
  FaPaintBrush,
  FaChartLine,
  FaBullhorn,
  FaDatabase,
  FaUserTie,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    icon: <FaLaptopCode />,
    title: "Development",
    jobs: "320 Jobs",
  },
  {
    id: 2,
    icon: <FaPaintBrush />,
    title: "Design",
    jobs: "145 Jobs",
  },
  {
    id: 3,
    icon: <FaChartLine />,
    title: "Finance",
    jobs: "180 Jobs",
  },
  {
    id: 4,
    icon: <FaBullhorn />,
    title: "Marketing",
    jobs: "210 Jobs",
  },
  {
    id: 5,
    icon: <FaDatabase />,
    title: "Data Science",
    jobs: "98 Jobs",
  },
  {
    id: 6,
    icon: <FaUserTie />,
    title: "HR",
    jobs: "110 Jobs",
  },
];

const Categories = () => {
  return (
    <section className="categories">

      <div className="category-heading">
        <h2>Browse Jobs by Category</h2>

        <p>
          Discover thousands of opportunities across different industries.
        </p>
      </div>

      <div className="category-grid">

        {categories.map((item) => (

          <div className="category-card" key={item.id}>

            <div className="category-icon">
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <span>{item.jobs}</span>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Categories;