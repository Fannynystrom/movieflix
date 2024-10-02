export interface Movie {
  title: string;
  thumbnail: string;
  synopsis: string;
  rating: string;
  genre: string;
  year: number;
  actors: string[];
  isTrending?: boolean;
}
