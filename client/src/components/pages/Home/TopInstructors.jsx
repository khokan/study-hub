const TopInstructors = ({ instructors = [] }) => {
    const instructors = [
        {
            id: 1,
            name: "John Doe",
            photoURL: "https://i.ibb.co/XYZ1234/john-doe.png",
            bio: "Expert in Mathematics with over 10 years of teaching experience.",
        },
        {
            id: 2,  
            name: "Jane Smith",
            photoURL: "https://i.ibb.co/XYZ1234/jane-smith.png",
            bio: "Specializes in Physics and has a passion for helping students excel.",
        },
    ];
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">
        Top Instructors
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {instructors.map((inst) => (
          <div
            key={inst.id}
            className="bg-secondary-gray3 dark:bg-secondary-black1 rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition"
          >
            <img
              src={inst.photoURL}
              alt={inst.name}
              className="w-24 h-24 mx-auto rounded-full object-cover mb-3"
            />
            <h3 className="text-md font-semibold text-secondary-black1 dark:text-white">
              {inst.name}
            </h3>
            <p className="text-sm text-secondary-gray4 dark:text-secondary-gray5">
              {inst.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopInstructors;
