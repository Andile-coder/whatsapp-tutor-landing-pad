
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  BookOpen, 
  Atom,

  Globe,
  Code, 
  FileText,
  BarChart3,
  PenTool,
  FlaskConical,
  BookMarked,
  Languages,
  History
} from "lucide-react";

const Subjects = () => {
  const subjects = [
    {
      icon: <Calculator className="h-6 w-6" />,
      name: "Mathematics",
      topics: ["Algebra", "Calculus", "Statistics", "Geometry"]
    },
    {
      icon: <Atom className="h-6 w-6" />,
      name: "Physics",
      topics: ["Mechanics", "Electromagnetism", "Thermodynamics", "Quantum Physics"]
    },
    {
      icon: <FlaskConical className="h-6 w-6" />,
      name: "Chemistry",
      topics: ["Organic", "Inorganic", "Physical", "Biochemistry"]
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      name: "English",
      topics: ["Literature", "Writing", "Grammar", "ESL"]
    },
    {
      icon: <Languages className="h-6 w-6" />,
      name: "Languages",
      topics: ["Spanish", "French", "German", "Mandarin"]
    },
    {
      icon: <Code className="h-6 w-6" />,
      name: "Computer Science",
      topics: ["Programming", "Data Structures", "Web Development", "Algorithms"]
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      name: "Business",
      topics: ["Economics", "Accounting", "Marketing", "Finance"]
    },
    {
      icon: <History className="h-6 w-6" />,
      name: "Social Studies",
      topics: ["History", "Geography", "Sociology", "Political Science"]
    },
    {
      icon: <BookMarked className="h-6 w-6" />,
      name: "Test Prep",
      topics: ["SAT", "ACT", "GRE", "AP Exams"]
    }
  ];

  return (
    <section id="subjects" className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Subjects We Cover</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our expert tutors can help with virtually any subject. Here are some of our most popular areas:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-tutoring-blue mr-3">
                  {subject.icon}
                </div>
                <h3 className="text-xl font-semibold">{subject.name}</h3>
              </div>
              <ul className="space-y-2">
                {subject.topics.map((topic, topicIndex) => (
                  <li key={topicIndex} className="flex items-center text-gray-600">
                    <span className="w-1.5 h-1.5 bg-whatsapp rounded-full mr-2"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-600 mb-4">Don't see your subject? No problem!</p>
          <Button className="bg-tutoring-blue hover:bg-tutoring-darkblue text-white">
            Ask About Any Subject
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Subjects;
