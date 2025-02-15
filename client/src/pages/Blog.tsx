import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlogPost } from "@shared/schema";
import { Search, Tag as TagIcon } from "lucide-react";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog/posts"],
  });

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  // Get unique tags from all posts
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags || [])));

  // Get featured post (most recent)
  const featuredPost = posts[0];

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Blog</h1>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                onClick={() => setSelectedTag(null)}
                size="sm"
              >
                All
              </Button>
              {allTags.map(tag => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  onClick={() => setSelectedTag(tag)}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <TagIcon className="h-3 w-3" />
                  {tag}
                </Button>
              ))}
            </motion.div>
          </div>

          {/* Featured Post */}
          {featuredPost && !searchTerm && !selectedTag && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-semibold mb-4">Featured Post</h2>
              <BlogCard post={featuredPost} index={0} featured />
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-[400px] bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTag || "all"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredPosts
                  .filter(post => post !== featuredPost || searchTerm || selectedTag)
                  .map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                {filteredPosts.length === 0 && (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No posts found
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
}