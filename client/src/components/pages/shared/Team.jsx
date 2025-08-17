import React from 'react';

const Team = () => {
    return (
         <div className="max-w-6xl mx-auto px-4 py-12">
             <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet The Team</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Alex Johnson",
              role: "Founder & CEO",
              bio: "Former collegiate sprinter with a passion for sports tech",
            },
            {
              name: "Maria Garcia",
              role: "Head of Product",
              bio: "Event organizer with 10+ years in sports management",
            },
            {
              name: "Jamal Williams",
              role: "Lead Developer",
              bio: "Full-stack developer and amateur boxer",
            },
            {
              name: "Sarah Chen",
              role: "Community Manager",
              bio: "Connects athletes with the perfect events",
            }
          ].map((member, index) => (
            <div key={index} className="text-center">
              {/* <img 
                src={member.img} 
                alt={member.name} 
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              /> */}
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-blue-600 mb-2">{member.role}</p>
              <p className="text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
        </div>
    );
};

export default Team;