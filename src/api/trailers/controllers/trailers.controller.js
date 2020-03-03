const TrailerService = require('../services/trailers.service');

module.exports = {
  async getTrailers(request, response) {
    const { query } = request;

    if (!query.link) {
      return response.status(400).json({ message: 'Please provide a Viaplay movie link' });
    }

    try {
      const imdb_data = await TrailerService.getMovieImdbData(query.link);
      const trailer_link = await TrailerService.getYouTubeTrailer(imdb_data.id);

      return response.json({ link: trailer_link });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
};
