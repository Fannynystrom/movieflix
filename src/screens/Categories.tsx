import React, { useState, useEffect } from 'react';
import CategoryCard from '../components/CategoryCard';

const CategoriesPage: React.FC = () => {
  // State för att hålla kategorierna
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Hämta API-URL från miljövariabler
  const API_URL = `${process.env.REACT_APP_FIREBASE_DATABASE_URL}/categories.json`;

  useEffect(() => {
    // Hämtar kategorier från API
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Något gick fel vid hämtningen av kategorier');
        }
        const data = await response.json();

        // Om data är ett objekt, mappa till array
        const categoriesArray = Object.values(data);
        setCategories(categoriesArray);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [API_URL]); // Lägg till API_URL som beroende i useEffect

  const handleCategoryClick = (category: string) => {
    console.log(`Vald kategori: ${category}`);
    // Lägg till navigationslogik här eller visa filmer från kategorin
  };

  if (loading) {
    return <p>Laddar kategorier...</p>;
  }

  if (error) {
    return <p>Fel vid hämtning: {error}</p>;
  }

  return (
    <div className="categories-page">
      <h1>Kategorier</h1>
      <div className="categories-list">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            name={category as string}
            onClick={() => handleCategoryClick(category as string)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
