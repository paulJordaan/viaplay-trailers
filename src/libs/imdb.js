const axios = require('axios');

const { IMDB_API_KEY } = process.env;

module.exports = {
  /**
   * Fetches the available videos for the supplied movie ID from the IMDB api
   * @param {string} id - IMDB movie ID
   */
  async getVideosForId(id) {
    try {
      if (id) {
        const endpoint = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${IMDB_API_KEY}&language=en-US`;
        const {
          data: { results }
        } = await axios.get(endpoint);
        return results;
      }
      throw new Error('A IMDB movie id is required');
    } catch (error) {
      throw new Error(error);
    }
  }
};
