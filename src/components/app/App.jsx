import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../../pages/homePage/homePage"));
const MoviesPage = lazy(() => import("../../pages/moviesPage/moviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/movieDetailsPage/movieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/notFoundPage/notFoundPage")
);
const MovieCast = lazy(() => import("../movieCast/movieCast"));
const MovieReviews = lazy(() => import("../movieReviews/movieReviews"));
const Navigation = lazy(() => import("../navigation/navigation"));


export default function App() {
  return (
    <header>
      <Navigation />
      <Suspense fallback={<div>Loading page code...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </header>
  );
}
