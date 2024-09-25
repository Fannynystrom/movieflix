import React, { useEffect, useState } from "react";
import { ref, get, child } from "firebase/database";
import { database } from "../../config/firebase"; 

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "categories"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setCategories(Object.values(data));
        } else {
          throw new Error("Inga kategorier hittades.");
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <p>Laddar kategorier...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Kategorier</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
