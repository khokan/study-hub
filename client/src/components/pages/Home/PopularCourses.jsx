const PopularCourses = ({ courses = [] }) => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Popular Courses
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-secondary-gray3 dark:bg-secondary-black1 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-lg font-semibold text-secondary-black1 dark:text-white mb-2">
              {course.title}
            </h3>
            <p className="text-sm text-secondary-gray4 dark:text-secondary-gray5 mb-4 line-clamp-3">
              {course.description}
            </p>
            <button className="btn btn-primary w-full">Enroll Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCourses;
