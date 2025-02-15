import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const skills = {
  "Programming Languages": [
    { name: "Python", level: 75 },
    { name: "JavaScript", level: 60 },
    { name: "R", level: 40 },
    { name: "SQL", level: 65 }
  ],
  "Data Science Tools": [
    { name: "Pandas", level: 70 },
    { name: "Scikit-learn", level: 60 },
    { name: "TensorFlow", level: 40 },
    { name: "Tableau", level: 50 }
  ],
  "Web Development": [
    { name: "HTML/CSS", level: 80 },
    { name: "React", level: 65 },
    { name: "Node.js", level: 55 },
    { name: "Git", level: 70 }
  ]
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, categorySkills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
