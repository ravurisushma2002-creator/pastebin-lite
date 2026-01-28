import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { content, maxViews,expiresAt } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    const paste = await prisma.paste.create({
  data: {
    content,
    maxViews: maxViews ?? null,
    expiresAt: expiresAt ? new Date(expiresAt) : null,
  },
});


    return res.status(201).json({
  id: paste.id,
  url: `${process.env.BASE_URL || "http://localhost:3000"}/p/${paste.id}`
});

} catch (error) {
    console.error("POST /api/paste error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
