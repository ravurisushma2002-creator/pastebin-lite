import { prisma } from "../../lib/prisma";

export async function getServerSideProps({ params }) {
  const { id } = params;

  const paste = await prisma.paste.findUnique({
    where: { id },
  });

  if (!paste) {
    return { notFound: true };
  }

  const now = new Date();

  if (paste.expiresAt && paste.expiresAt <= now) {
    return { notFound: true };
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return { notFound: true };
  }

  await prisma.paste.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  return {
    props: {
      content: paste.content,
    },
  };
}

export default function PastePage({ content }) {
  return (
    <main style={{ padding: "20px", fontFamily: "monospace" }}>
      <pre>{content}</pre>
    </main>
  );
}
