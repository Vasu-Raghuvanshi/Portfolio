import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" required />
                  </div>
                  <div>
                    <Input type="email" placeholder="Your Email" required />
                  </div>
                  <div>
                    <Textarea placeholder="Your Message" required />
                  </div>
                  <Button type="submit">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <a
                    href="https://github.com/Vasu-Raghuvanshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Github className="h-5 w-5" /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vasu-raghuvanshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Linkedin className="h-5 w-5" /> LinkedIn
                  </a>
                  <a
                    href="mailto:vasuraghuvanshi001@gmail.com"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Mail className="h-5 w-5" /> vasuraghuvanshi001@gmail.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
