const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.json(posts);
});

app.get("/posts/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài đăng" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi lấy chi tiết bài đăng" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      category,
      location,
      eventTime,
      imageUrl,
      contactName,
      contactPhone,
      contactEmail,
    } = req.body;

    const newPost = await prisma.post.create({
      data: {
        type,
        title,
        description,
        category,
        location,
        eventTime: new Date(eventTime),
        imageUrl,
        contactName,
        contactPhone,
        contactEmail,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Lỗi khi tạo bài đăng" });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});