import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  try {
    const paste = await prisma.paste.findUnique({
      where: { id },
    });

    // Not found
    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    // Expiry check
    const now = new Date();
    if (paste.expiresAt && paste.expiresAt <= now) {
      return res.status(404).json({ message: "Paste expired" });
    }

    // View limit check
    if (paste.maxViews !== null && paste.views >= paste.maxViews) {
      return res.status(404).json({ message: "View limit exceeded" });
    }

    // Increment views
    const updatedPaste = await prisma.paste.update({
      where: { id },
      data: {
        views: { increment: 1 },
      },
    });

    const remainingViews =
      updatedPaste.maxViews === null
        ? null
        : updatedPaste.maxViews - updatedPaste.views;

    return res.status(200).json({
      content: updatedPaste.content,
      remaining_views: remainingViews,
      expires_at: updatedPaste.expiresAt,
    });
  } catch (error) {
    console.error("GET /api/pastes/:id error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
