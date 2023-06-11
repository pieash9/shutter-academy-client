import SectionTitle from "../../../components/Shared/SectionTitle";
import book1 from "../../../assets/books/book1.jpg";
import book2 from "../../../assets/books/book2.jpg";
import book3 from "../../../assets/books/book3.jpg";
import book4 from "../../../assets/books/book4.jpg";
import book5 from "../../../assets/books/book5.jpg";
import book6 from "../../../assets/books/book6.jpg";
const Courses = () => {
  const coursesBook = [
    {
      name: "Beginners Photography Course",
      image: book1,
    },
    {
      name: "Lightroom Course Online",
      image: book2,
    },
    {
      name: "Photoshop Course for Photographers",
      image: book3,
    },
    {
      name: "Fine Art Landscape Photography ",
      image: book4,
    },
    {
      name: "Wildlife photography Course",
      image: book5,
    },
    {
      name: "Pro Landscape Photography Course",
      image: book6,
    },
  ];
  return (
    <div className="mx-3">
      <SectionTitle
        heading={"Our Courses and Books"}
        subHeading={"Unlock Your Potential with Our Courses and Books"}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {coursesBook.map((course) => (
          <div
            key={course.name}
            className="card   shadow-2xl group bg-white"
          >
            <figure>
              <img
                className="rounded-t-sm w-full group-hover:scale-105 transition-all duration-500"
                src={course.image}
                alt="course photo"
              />
            </figure>
            <div className="px-5 py-5">
              <h2 className="text-gray-800 text-lg font-medium text-center">
                {course.name}
              </h2>

              <div className="card-actions mt-3 ">
                <button className="button-primary !py-1 w-3/4 mx-auto rounded-full">
                  Preview & More Info
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
