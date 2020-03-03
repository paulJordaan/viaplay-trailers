const { get } = require("lodash");

const Imdb = require("../../../libs/imdb");
const Viaplay = require("../../../libs/viaplay");

/** Helper Functions */
function contructYoutubeLink(videoKey) {
  return `https://www.youtube.com/watch?v=${videoKey}`;
}

module.exports = {
  /**
   * Returns the IMDB data for a supplied Viaplay Movie Resource
   * @param {*} url - Viaplay Movie Resource link
   */
  async getMovieImdbData(url) {
    const data = await Viaplay.getMovie(url);

    const imdbID = get(data, '_embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb');

    if (imdbID) {
      return imdbID;
    }
    throw new Error("The supplied Viaplay Url does not contain IMDB data");
  },

  /**
   * Return a Youtube Trailer for a supplied IMDB movie
   * @param {*} id - IMDB movie ID
   */
  async getYouTubeTrailer(id) {
    const videos = await Imdb.getVideosForId(id);

    // Find the first video of type === "Trailer" and site === "Youtube"
    const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");

    if (trailer) {
      return contructYoutubeLink(trailer.key);
    }
    throw new Error("No trailer found for the requested movie");
  }
};
