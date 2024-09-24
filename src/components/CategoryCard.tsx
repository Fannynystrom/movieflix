import React from 'react';

interface CategoryCardProps {
  name: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className="category-card">
      <h3>{name}</h3>
    </div>
  );
};

export default CategoryCard;
