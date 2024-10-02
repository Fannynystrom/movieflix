import { useState, useEffect } from "react";
import { ref, onValue, DataSnapshot, Unsubscribe } from "firebase/database";
import { database } from "../../config/firebase";

interface Movie {
  title: string;
  genre: string;
  rating: string;
  synopsis: string;
  thumbnail: string;
  year: number;
  actors: string[];
  ageRating?: string; // Nytt fält för åldersgräns, som är valfritt

}

interface FirebaseMovieData {
  [key: string]: {
    title: string;
    genre: string;
    rating: string;
    synopsis: string;
    thumbnail: string;
    year: number;
    actors?: string[];
    ageRating?: string; // Lägg till åldersgräns här också

  };
}

interface UseFetchMoviesResult {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

const useFetchMovies = (randomize: boolean = false): UseFetchMoviesResult => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const moviesRef = ref(database, "movies");

    const handleData = (snapshot: DataSnapshot) => {
      if (snapshot.exists()) {
        const data: FirebaseMovieData = snapshot.val();
        let moviesArray: Movie[] = Object.keys(data).map((key) => ({
          title: data[key].title,
          genre: data[key].genre,
          rating: data[key].rating,
          synopsis: data[key].synopsis,
          thumbnail: data[key].thumbnail,
          year: data[key].year,
          actors: data[key].actors || [],
          ageRating: data[key].ageRating || 'Ej specificerad', // Hantera åldersgränsen

        }));

        if (randomize) {
          moviesArray = moviesArray.sort(() => Math.random() - 0.5); // Slumpmässig ordning
        }

        setMovies(moviesArray);
        setLoading(false);
      } else {
        setMovies([]);
        setLoading(false);
      }
    };

    const handleError = (error: Error) => {
      setError(error.message);
      setLoading(false);
    };

    const unsubscribe: Unsubscribe = onValue(
      moviesRef,
      handleData,
      handleError,
    );

    return () => unsubscribe();
  }, [randomize]);

  return { movies, loading, error };
};

export default useFetchMovies;

//När du anropar onValue (eller andra abonnemangsfunktioner) från Firebase, upprättas ett abonnemang på datan som skickas till din komponent. Detta innebär att Firebase kommer att fortsätta att skicka datauppdateringar till din komponent så länge abonnemanget är aktivt.
// unsubscribe är en funktion som returneras av onValue och används för att ta bort abonnemanget. Det innebär att din komponent inte längre kommer att ta emot uppdateringar från Firebase när abonnemanget har avbrutits.
// Förhindra minnesläckor:

// Om du inte tar bort abonnemanget när komponenten avmonteras, kan det leda till minnesläckor eftersom Firebase fortfarande försöker uppdatera en komponent som inte längre är i DOM (Document Object Model).
// Genom att returnera unsubscribe-funktionen från useEffect, säkerställer du att abonnemanget tas bort när komponenten avmonteras. Detta gör att Firebase inte längre försöker uppdatera en komponent som inte längre finns, vilket sparar resurser och förhindrar potentiella fel.
// Sammanfattning
// Koden return () => unsubscribe(); är en del av det så kallade "clean-up"-mönstret i React
// useEffect hook. Den ser till att när komponenten tas bort från DOM (t.ex. användaren navigerar bort från sidan eller komponenten tas bort), så tas även abonnemanget bort, vilket förhindrar att onödiga uppdateringar och resurser fortsätter att användas.

// Det är en bra praxis att alltid rensa upp abonnemang och eventuella asynkrona operationer i useEffect för att undvika minnesläckor och andra problem som kan uppstå när komponenter avmonteras.
