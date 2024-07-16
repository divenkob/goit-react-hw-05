import { lazy, Suspense, useEffect, useState } from "react";
import { fetchFilmOnSearchQuery } from "../../tmdb-api";

const ErrorMessage = lazy(() =>
  import("../../components/errorMessage/errorMessage")
);
const Loader = lazy(() => import("../../components/loader/loader"));
const MovieList = lazy(() => import("../../components/movieList/movieList"));
import css from "./moviesPage.module.css";
import SearchForm from "../../components/searchForm/searchForm";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [film, setFilm] = useState([]);
  const [query, setQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const changeFilter = (newRequest) => {
    setSearchParams({ request: newRequest });
    setQuery(newRequest);
  };

  useEffect(() => {
    const currentQuery = searchParams.get("request") || "";
    setQuery(currentQuery);
  }, [searchParams]);

  useEffect(() => {
    async function getImages() {
      if (query.trim() === "") {
        return;
      }
      try {
        setLoader(true);
        setError(false);
        const promise = await fetchFilmOnSearchQuery(query);
        setFilm(promise.results);
      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    getImages();
  }, [query]);

  return (
    <section className={css.search}>
      <SearchForm setQuery={setQuery} onFilter={changeFilter} />
      <Suspense fallback={<div>Loading page code...</div>}>
        {loader && <Loader />}
        {error && <ErrorMessage />}
        {film.length > 0 && <MovieList films={film} />}
      </Suspense>
    </section>
  );
}