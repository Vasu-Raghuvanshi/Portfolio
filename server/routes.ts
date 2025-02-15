import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBlogPostSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Blog routes
  app.get("/api/blog/posts", async (_req, res) => {
    const posts = await storage.getAllBlogPosts();
    res.json(posts);
  });

  app.get("/api/blog/posts/:slug", async (req, res) => {
    const post = await storage.getBlogPost(req.params.slug);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.json(post);
  });

  app.get("/api/blog/tags/:tag", async (req, res) => {
    const posts = await storage.getBlogPostsByTag(req.params.tag);
    res.json(posts);
  });

  // Create a test blog post
  const testPost = {
    title: "Getting Started with Data Science",
    content: "# Introduction to Data Science\n\nData science is an exciting field...",
    excerpt: "Learn the basics of data science and how to get started in this exciting field.",
    slug: "getting-started-with-data-science",
    author: "John Doe",
    tags: ["Data Science", "Python", "Machine Learning"],
    coverImage: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800",
  };

  await storage.createBlogPost(testPost);

  const httpServer = createServer(app);
  return httpServer;
}