import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

type Skill = {
  name: string;
  level: number;
  description: string;
};

type SkillCategory = {
  [key: string]: Skill[];
};

const skills: SkillCategory = {
  "Programming Languages": [
    { name: "Python", level:85, description: "Experienced in data analysis, web development, and automation scripts" },
    { name: "JavaScript", level: 60, description: "Proficient in modern ES6+, React, and Node.js development" },
    { name: "C++", level: 70, description: "Basic knowledge for efficient programs and algorithm design" },
    { name: "SQL", level: 1, description: "Strong database management and query optimization skills" }
  ],
  "Data Science Tools": [
    { name: "Numpy", level: 70, description: "Numerical operations and data manipulation" },
    { name: "Pandas", level: 70, description: "Advanced data manipulation and analysis" },
    { name: "Matplotlib", level: 70, description: "Basic plotting and visualization" },
    { name: "Seaborn", level: 70, description: "Advanced data visualization" },
    { name: "Scikit-learn", level: 1, description: "Machine learning model development and evaluation" },
    { name: "TensorFlow", level: 1, description: "Basic neural network implementation and training" },
    // { name: "Tableau", level: 1, description: "Data visualization and dashboard creation" }
  ],
  "Web Development": [
    { name: "HTML/CSS", level: 80, description: "Responsive design and modern CSS frameworks" },
    { name: "React", level: 65, description: "Component-based architecture and state management" },
    { name: "Node.js", level: 55, description: "RESTful API development and server-side programming" },
    { name: "Git", level: 70, description: "Version control and collaborative development" }
  ]
};

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section 
      id="skills" 
      className="py-20 bg-muted/50 scroll-mt-16"
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, categorySkills], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform duration-300"
            >
              <Card className="h-full backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categorySkills.map((skill) => (
                    <motion.div 
                      key={skill.name}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                      className="relative group"
                    >
                      <div className="flex justify-between mb-1">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress 
                          value={skill.level} 
                          className="h-2 group-hover:h-3 transition-all duration-300"
                        />
                        <AnimatePresence>
                          {hoveredSkill === skill.name && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute mt-2 p-2 bg-popover/95 backdrop-blur-sm text-popover-foreground rounded-md shadow-lg text-sm w-full z-10"
                            >
                              {skill.description}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
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