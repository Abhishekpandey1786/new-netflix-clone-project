import axios from "axios";
import { options } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getTrailerMovie } from '../redux/movieSlice';
import { useEffect } from "react";

const useMovieById = (movieId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!movieId) return;
    const getMovieById = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          options
        );
        const results = res?.data?.results || [];
        const trailer = results.filter((item) => item.type === "Trailer");
        dispatch(getTrailerMovie(trailer.length > 0 ? trailer[0] : results[0]));
      } catch (error) {
        console.log(error);
      }
    };
    getMovieById();
  }, [movieId, dispatch]);
};

export default useMovieById;