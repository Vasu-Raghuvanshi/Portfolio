import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-lg mb-4">
                I am a passionate BCA (Bachelor of Computer Applications) student with a strong interest in Data Science and Software Development. Currently pursuing my degree, I am focusing on building a strong foundation in programming, data analysis, and machine learning.
              </p>
              
              <p className="text-lg mb-4">
                My academic journey has equipped me with knowledge in various programming languages and tools, particularly in data science technologies. I enjoy working on projects that challenge me to learn new skills and apply my knowledge in practical scenarios.
              </p>
              
              <p className="text-lg">
                When I'm not coding or analyzing data, I enjoy participating in hackathons, contributing to open-source projects, and staying updated with the latest developments in technology.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
