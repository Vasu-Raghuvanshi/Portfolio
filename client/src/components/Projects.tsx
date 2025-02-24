import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
}

const projects: Project[] = [
  {
    title: "Sales Data Analysis",
    description: " Analysed Sales Data using Python and obtained insights into customer behavior and trends.",
    image: "https://cdn.pixabay.com/photo/2016/06/03/13/57/digital-marketing-1433427_1280.jpg",
    technologies: ["Python","Numpy","Pandas","Matplotlib","Seaborn"],
    github: "https://github.com/Vasu-Raghuvanshi/Data-Analysis-1/blob/main/DataAnalysisDemo.ipynb"
  },
  {
    title: "HakerRank Clone Website",
    description: "Created a clone of HackerRank website using HTML, CSS, and JavaScript.",
    image: "https://cdn.pixabay.com/photo/2015/12/04/14/05/code-1076536_1280.jpg",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Vasu-Raghuvanshi/HackerRank-Clone-Project-CWH-"
  },
  {
    title: "Jarvis Personal Assistant",
    description: "A personal assistant using Python with speech recognition and API integration.(Under Development)",
    image: "https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg",
    technologies: ["Python", "OpenAIAPI",],
    github: "https://github.com/Vasu-Raghuvanshi/Python-Code-Repo-/blob/main/Python/Python-Projects/Assistant/assistant.py"
  },
  {
    title: "Personal Portfolio Website",
    description: "A personal portfolio website using AI Agents, built with React, Next.js, and TypeScript.",
    image: "https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg",
    technologies: ["React", "Node.js", "Typescript"],
    github: "https://github.com/Vasu-Raghuvanshi/Portfolio-Website"
  }
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className="transition-all duration-300"
    >
      <Card className="overflow-hidden border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-colors h-full">
        <CardHeader className="p-0 relative overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={project.image}
              alt={project.title}
              className={`w-full h-48 object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <motion.div
            animate={{ y: isHovered ? -5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardTitle className="mb-2 text-primary group-hover:text-primary/80 transition-colors">
              {project.title}
            </CardTitle>
            <p className="text-muted-foreground mb-4 group-hover:text-foreground transition-colors">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: isHovered ? -2 : 0 
                  }}
                  transition={{ 
                    duration: 0.2,
                    delay: isHovered ? i * 0.1 : 0 
                  }}
                  className="px-2 py-1 bg-primary/10 rounded-full text-sm text-primary hover:bg-primary/20 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <motion.div
              animate={{ 
                y: isHovered ? 0 : 5,
                opacity: isHovered ? 1 : 0.8 
              }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                variant="outline" 
                className="w-full border-primary/20 hover:bg-primary/10 group" 
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> 
                  View on GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8"
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}