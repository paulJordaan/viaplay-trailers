const axios = require('axios');

module.exports = {
  /**
   * Fetched the movie resource from the Viaplay Content API
   * @param {string} url - Viaplay Movie Resource link
   */
  async getMovie(url) {
    try {
      if (url) {
        const { data } = await axios.get(url);
        return data;
      }
      throw new Error('A Viaplay content url is required');
    } catch (error) {
      throw new Error(error);
    }
  }
};
