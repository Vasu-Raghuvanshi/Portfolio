import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "Customer Churn Prediction",
    description: "Developed a machine learning model to predict customer churn for a telecom company using Python and Scikit-learn.",
    image: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=400&q=80",
    technologies: ["Python", "Pandas", "Scikit-learn"],
    github: "#"
  },
  {
    title: "Interactive Dashboard",
    description: "Created an interactive dashboard for visualizing sales data using React and D3.js.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
    technologies: ["React", "D3.js", "Tailwind CSS"],
    github: "#"
  },
  {
    title: "Data Analysis Tool",
    description: "Built a web application for analyzing and visualizing dataset patterns.",
    image: "https://images.unsplash.com/photo-1739514984003-330f7c1d2007?w=400&q=80",
    technologies: ["Python", "Flask", "PostgreSQL"],
    github: "#"
  },
  {
    title: "Task Management App",
    description: "Developed a full-stack task management application with authentication.",
    image: "https://images.unsplash.com/photo-1510759395231-72b17d622279?w=400&q=80",
    technologies: ["React", "Node.js", "MongoDB"],
    github: "#"
  }
];

const ProjectCard = ({ project, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
        <CardHeader className="p-0 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-48 object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="mb-2 text-primary">{project.title}</CardTitle>
          <p className="text-muted-foreground mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-primary/10 rounded-full text-sm text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
          <Button variant="outline" className="border-primary/20 hover:bg-primary/10" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" /> View on GitHub
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-background via-background/50 to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}