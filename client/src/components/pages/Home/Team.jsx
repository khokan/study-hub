import React from 'react';

const Team = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Educators</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Dr. Sarah Chen",
              role: "Founder & Lead Educator",
              bio: "PhD in Education with 15+ years teaching experience",
            },
            {
              name: "Prof. Jamal Williams",
              role: "STEM Director",
              bio: "Mathematics professor and curriculum specialist",
            },
            {
              name: "Lisa Rodriguez",
              role: "Head Tutor",
              bio: "Specializes in language arts and college prep",
            },
            {
              name: "David Kim",
              role: "Technology Lead",
              bio: "Develops interactive learning tools and platforms",
            },
            {
              name: "Amira Hassan",
              role: "Student Success",
              bio: "Focuses on personalized learning strategies",
            },
            {
              name: "Michael Brown",
              role: "Test Prep Specialist",
              bio: "Expert in SAT/ACT and graduate exams",
            },
            {
              name: "Emily Wilson",
              role: "Admissions Coach",
              bio: "Helps students navigate college applications",
            },
            {
              name: "Carlos Mendez",
              role: "Community Manager",
              bio: "Connects learners with peer study groups",
            }
          ].map((member, index) => (
            <div key={index}   className="bg-secondary-gray3 border border-base-300 dark:bg-secondary-black1 rounded-2xl p-6 shadow-md hover:shadow-lg transition"
               style={{
              transition: "box-shadow 0.3s ease",
            }}>
              {/* Placeholder for team member photo */}
              {/* <div className="w-24 h-24 rounded-full bg-secondary-gray6 mx-auto mb-4 flex items-center justify-center">
                <span className="text-secondary-gray6 text-xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div> */}
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <p className="text-muted-foreground text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;