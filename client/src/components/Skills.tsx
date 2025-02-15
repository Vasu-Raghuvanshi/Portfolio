import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const skills = {
  "Programming Languages": [
    { name: "Python", level: 75, description: "Experienced in data analysis, web development, and automation scripts" },
    { name: "JavaScript", level: 60, description: "Proficient in modern ES6+, React, and Node.js development" },
    { name: "R", level: 40, description: "Basic knowledge for statistical analysis and data visualization" },
    { name: "SQL", level: 65, description: "Strong database management and query optimization skills" }
  ],
  "Data Science Tools": [
    { name: "Pandas", level: 70, description: "Advanced data manipulation and analysis" },
    { name: "Scikit-learn", level: 60, description: "Machine learning model development and evaluation" },
    { name: "TensorFlow", level: 40, description: "Basic neural network implementation and training" },
    { name: "Tableau", level: 50, description: "Data visualization and dashboard creation" }
  ],
  "Web Development": [
    { name: "HTML/CSS", level: 80, description: "Responsive design and modern CSS frameworks" },
    { name: "React", level: 65, description: "Component-based architecture and state management" },
    { name: "Node.js", level: 55, description: "RESTful API development and server-side programming" },
    { name: "Git", level: 70, description: "Version control and collaborative development" }
  ]
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const categories = Object.keys(skills);
  const filteredSkills = selectedCategory ? { [selectedCategory]: skills[selectedCategory] } : skills;

  return (
    <section id="skills" className="py-20 bg-muted/50">
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

        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="mb-2"
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || 'all'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {Object.entries(filteredSkills).map(([category, categorySkills], index) => (
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
                      <motion.div 
                        key={skill.name}
                        onHoverStart={() => setHoveredSkill(skill.name)}
                        onHoverEnd={() => setHoveredSkill(null)}
                        className="relative"
                      >
                        <div className="flex justify-between mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <motion.div className="relative">
                          <Progress 
                            value={0} 
                            className="h-2"
                            initial={{ value: 0 }}
                            animate={{ value: skill.level }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                          {hoveredSkill === skill.name && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute mt-2 p-2 bg-popover text-popover-foreground rounded-md shadow-lg text-sm w-full z-10"
                            >
                              {skill.description}
                            </motion.div>
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}