const PlatformStats = ({ stats = {} }) => {
    const defaultStats = {
        students: 10,
        tutors: 5,
        courses: 3,
        sessions: 8,
    };
  return (
    <section className="bg-secondary-gray3 dark:bg-secondary-black1 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div>
          <h3 className="text-3xl font-bold text-primary">{stats.students || defaultStats.students}</h3>
          <p className="text-secondary-gray4 dark:text-secondary-gray5">Students</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-primary">{stats.tutors || defaultStats.tutors}</h3>
          <p className="text-secondary-gray4 dark:text-secondary-gray5">Tutors</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-primary">{stats.courses || defaultStats.courses}</h3>
          <p className="text-secondary-gray4 dark:text-secondary-gray5">Courses</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-primary">{stats.sessions || defaultStats.sessions}</h3>
          <p className="text-secondary-gray4 dark:text-secondary-gray5">Sessions</p>
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
