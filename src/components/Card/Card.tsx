// src/components/Card/Card.tsx
import styles from './Card.module.css';

interface CardProps {
  id: number;
  name: string;
  imageUrl?: string;
  country?: string;
  onClick?: (id: number) => void;
}

export const Card = ({ id, name, imageUrl, country, onClick }: CardProps) => {
  const handleClick = () => {
    if (onClick) onClick(id);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        {country && <p className={styles.country}>{country}</p>}
      </div>
    </div>
  );
};