import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PastePage() {
  const router = useRouter();
  const { id } = router.query;

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/pastes/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Error");
        }
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <pre style={{ whiteSpace: "pre-wrap" }}>
      {data.content}
    </pre>
  );
}
