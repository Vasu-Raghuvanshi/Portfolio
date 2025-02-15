import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Tag, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: [`/api/blog/posts/${slug}`],
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Share functionality
  const sharePost = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded w-2/3" />
            <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
            <div className="h-[400px] bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Post not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="max-w-4xl mx-auto">
            {post.coverImage && (
              <div className="relative h-[400px] w-full overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <motion.h1 
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {post.title}
              </motion.h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.publishedAt)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {calculateReadingTime(post.content)}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto"
                  onClick={sharePost}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags?.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center px-3 py-1 bg-primary/10 rounded-full text-sm text-primary"
                  >
                    <Tag className="h-3 w-3 mr-2" />
                    {tag}
                  </div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {post.content}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
