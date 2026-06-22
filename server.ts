import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "blogs-db.json");

// Middleware to parse JSON bodies
app.use(express.json());

// Helper to check administrative authentication
function getAdminUsername(): string {
  return process.env.BLOG_ADMIN_USERNAME || "admin";
}

function getAdminPassword(): string {
  return process.env.BLOG_ADMIN_PASSWORD || "admin123";
}

function verifyAdmin(req: express.Request): boolean {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return false;
  
  const token = authHeader.replace("Bearer ", "").trim();
  return token === getAdminPassword();
}

// REST API setup
// 1. Get all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    let data = "[]";
    try {
      data = await fs.readFile(DB_FILE, "utf-8");
    } catch (err) {
      // If file doesn't exist, write empty array or use defaults
      await fs.writeFile(DB_FILE, "[]", "utf-8");
    }
    
    const blogs = JSON.parse(data);
    
    // Check if requester is authenticated admin
    const isAdmin = verifyAdmin(req);
    
    if (isAdmin) {
      // Admin sees everything, including drafts
      res.json(blogs);
    } else {
      // Users only see published posts
      const publishedBlogs = blogs.filter((b: any) => b.published !== false);
      res.json(publishedBlogs);
    }
  } catch (err: any) {
    res.status(500).json({ error: "Failed to read blogs", details: err.message });
  }
});

// 2. Verify admin credentials
app.post("/api/admin/verify", (req, res) => {
  const { username, password } = req.body;
  const adminUsername = getAdminUsername();
  const adminPassword = getAdminPassword();
  
  if (username === adminUsername && password === adminPassword) {
    res.json({ success: true, message: "Valid credentials" });
  } else {
    res.status(401).json({ success: false, error: "Invalid username or password" });
  }
});

// 3. Create a new blog post
app.post("/api/blogs", async (req, res) => {
  if (!verifyAdmin(req)) {
    return res.status(403).json({ error: "Unauthorized access" });
  }
  
  try {
    const { title, content, category, date, readTime, published, excerpt } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: "Title and Content are required field parameters" });
    }
    
    let blogs = [];
    try {
      const data = await fs.readFile(DB_FILE, "utf-8");
      blogs = JSON.parse(data);
    } catch (e) {
      // Use empty
    }
    
    const newPost = {
      id: "blog-" + Date.now(),
      title,
      content,
      category: category || "General",
      date: date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      readTime: readTime || "3 min read",
      published: published !== undefined ? published : true,
      excerpt: excerpt || content.substring(0, 160).replace(/[#*`]/g, "") + "..."
    };
    
    blogs.unshift(newPost);
    await fs.writeFile(DB_FILE, JSON.stringify(blogs, null, 2), "utf-8");
    
    res.status(201).json(newPost);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to save blog post", details: err.message });
  }
});

// 4. Update an existing blog post
app.put("/api/blogs/:id", async (req, res) => {
  if (!verifyAdmin(req)) {
    return res.status(403).json({ error: "Unauthorized access" });
  }
  
  try {
    const { id } = req.params;
    const { title, content, category, date, readTime, published, excerpt } = req.body;
    
    let blogs = [];
    try {
      const data = await fs.readFile(DB_FILE, "utf-8");
      blogs = JSON.parse(data);
    } catch (e) {
      return res.status(404).json({ error: "Database not initialized" });
    }
    
    const index = blogs.findIndex((b: any) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    
    const updatedPost = {
      ...blogs[index],
      title: title !== undefined ? title : blogs[index].title,
      content: content !== undefined ? content : blogs[index].content,
      category: category !== undefined ? category : blogs[index].category,
      date: date !== undefined ? date : blogs[index].date,
      readTime: readTime !== undefined ? readTime : blogs[index].readTime,
      published: published !== undefined ? published : blogs[index].published,
      excerpt: excerpt !== undefined ? excerpt : (content ? content.substring(0, 160).replace(/[#*`]/g, "") + "..." : blogs[index].excerpt)
    };
    
    blogs[index] = updatedPost;
    await fs.writeFile(DB_FILE, JSON.stringify(blogs, null, 2), "utf-8");
    
    res.json(updatedPost);
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update blog post", details: err.message });
  }
});

// 5. Delete a blog post
app.delete("/api/blogs/:id", async (req, res) => {
  if (!verifyAdmin(req)) {
    return res.status(403).json({ error: "Unauthorized access" });
  }
  
  try {
    const { id } = req.params;
    
    let blogs = [];
    try {
      const data = await fs.readFile(DB_FILE, "utf-8");
      blogs = JSON.parse(data);
    } catch (e) {
      return res.status(404).json({ error: "Database not initialized" });
    }
    
    const filteredBlogs = blogs.filter((b: any) => b.id !== id);
    
    if (blogs.length === filteredBlogs.length) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    
    await fs.writeFile(DB_FILE, JSON.stringify(filteredBlogs, null, 2), "utf-8");
    res.json({ success: true, message: "Blog post successfully deleted" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to delete blog post", details: err.message });
  }
});

// Serve frontend application via Vite or Static Files
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupViteOrStatic().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully started. Running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Vite/Static server integration failed:", err);
});
