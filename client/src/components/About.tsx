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
                I am a passionate BCA (Bachelor of Computer Applications) student with a strong interest in Data Science and Software Development. Currently pursuing my degree through <b>Shri Ram College(Muzaffarnagar)</b>, I am focusing on building a strong foundation in <i>programming, data analysis, and machine learning.</i>
              </p>
              
              <p className="text-lg mb-4">
                My academic journey has equipped me with knowledge in various programming languages and tools, particularly in data science technologies. I enjoy working on projects that challenge me to learn new skills and apply my knowledge in practical scenarios. I also have experience working with various data science tools and libraries, including   <b>Python, Numpy, Pandas, Matplotlib, Seaborn, Scikit-learn, and TensorFlow.</b> I also possess strong skills in web development, particularly in  <b>HTML, CSS, and JavaScript</b>, and am familiar with various frameworks and libraries, such as<b> Bootstrap, Tailwind CSS, and React.</b>
              </p>
              
              <p className="text-lg">
                When I'm not coding or analyzing data, I enjoy reading books, playing video games, and staying updated with the latest developments in technology.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
