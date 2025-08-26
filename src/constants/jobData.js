export function generateJobs(n = 8) {
  const depts = [
    "Engineering",
    "Product",
    "Marketing",
    "Sales",
    "Operations",
    "HR", 
    "IT",
  ];
  const titles = [
    "Senior Frontend Engineer",
    "BackEnd Developer",
    "DevOps Engineer",
    "Mobile App Developer",
    "Senior Product Manager",
    "Product Owner",
    "Technical Product Manager",
    "Product Analyst",
  ];
  const locations = ["Hybrid", "Remote", "Office"];
  const types = ["Full-time", "Part-time", "Internship"];
  const skillsPool = [
    "React",
    "TypeScript",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "SQL",
    "UI/UX",
    "Python",
    "Microservices",
    "Next.js",
    "GraphQL",
    "Figma",
  ];

  // Use deterministic mongoIds so IDs remain stable across renders
  function deterministicMongoId(i) {
    // simple stable id: job-1, job-2, ... (you can replace with real ObjectId strings if needed)
    return `job-${i + 1}`;
  }

  const out = Array.from({ length: n }).map((_, i) => {
    const title = titles[i % titles.length];
    const keySkills = [
      skillsPool[i % skillsPool.length],
      skillsPool[(i + 3) % skillsPool.length],
      skillsPool[(i + 5) % skillsPool.length],
    ];
    return {
      id: i + 1,
      mongoId: deterministicMongoId(i),
      title,
      department: depts[i % depts.length],
      workType: locations[i % locations.length],
      keySkills,
      experienceRequired: (i % 6) + 1,
      vacancies: (i % 3) + 1,
      interviewSlots: [
        {
          date: new Date(Date.now() + 86400000 * (i + 1)).toISOString(),
          startTime: "10:00",
          endTime: "11:00",
        },
        {
          date: new Date(Date.now() + 86400000 * (i + 2)).toISOString(),
          startTime: "14:00",
          endTime: "15:00",
        },
      ],
      jobDescription:
        "We are looking for an experienced engineer to join our team and help us build scalable systems.",
      additionalNotes: "Competitive salary and benefits package",
      checkboxQuestions: [
        "Are you available to start immediately?",
        "Do you have experience with remote work?",
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      applications: [],
    };
  });
  return out;
}
