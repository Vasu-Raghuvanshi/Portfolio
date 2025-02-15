import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
}

export default function BlogCard({ post, index, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={featured ? "col-span-full" : ""}
    >
      <Card className={`overflow-hidden h-full flex flex-col group ${
        featured ? 'md:grid md:grid-cols-2 md:gap-6' : ''
      }`}>
        {post.coverImage && (
          <div className={`relative ${featured ? 'h-64 md:h-full' : 'h-48'} overflow-hidden`}>
            <motion.img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
        <div className="flex flex-col flex-1">
          <CardHeader className="flex-1">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{calculateReadingTime(post.content)}</span>
              </div>
            </div>
            <motion.h3 
              className={`${featured ? 'text-2xl' : 'text-xl'} font-semibold mb-2`}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {post.title}
            </motion.h3>
            <p className="text-muted-foreground mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags?.map((tag) => (
                <motion.span
                  key={tag}
                  className="px-2 py-1 bg-primary/10 rounded-full text-sm text-primary"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              variant="outline" 
              className="w-full group" 
              asChild
            >
              <Link href={`/blog/${post.slug}`}>
                <span className="flex items-center justify-center gap-2">
                  Read More
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
              </Link>
            </Button>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}