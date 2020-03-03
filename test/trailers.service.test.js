// const chai = require("chai");
// const should = require("chai").should();
const sinon = require("sinon");

const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");

const { expect } = chai;
chai.use(chaiAsPromised);

const { getMovieImdbData, getYouTubeTrailer } = require("../src/api/trailers/services/trailers.service");
const Viaplay = require("../src/libs/viaplay");
const Imdb = require("../src/libs/imdb");

describe("TrailersService", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("getMovieImdbData", () => {
    it("should return a imdb data object if it is available", async () => {
      const imdb_data = {
        id: "1234"
      };

      const stubValue = {
        _embedded: {
          "viaplay:blocks": [
            {
              _embedded: {
                "viaplay:product": {
                  content: { imdb: imdb_data }
                }
              }
            }
          ]
        }
      };

      const stub = sinon.stub(Viaplay, "getMovie").returns(stubValue);

      const data = await getMovieImdbData("https://test.com");

      sinon.assert.calledOnce(stub);
      return expect(data).to.deep.equal(imdb_data);
    });

    it("should throw an error if no imdb data is found", async () => {
      expect(getMovieImdbData("https://test.com")).to.be.rejectedWith(Error("A Viaplay content url is required"));
    });

    it("should throw an error if no url is supplied", async () => {
      expect(getMovieImdbData("https://test.com")).to.be.rejected;
    });
  });

  describe("getYouTubeTrailer", () => {
    it("should return a trailer url if it is available", async () => {
      const stubValue = [
        {
          id: "533ec655c3a368544800055b",
          iso_639_1: "en",
          iso_3166_1: "US",
          key: "9Ykn9zPnQME",
          name: "For Your Eyes Only 1981 TV trailer",
          site: "YouTube",
          size: 480,
          type: "Trailer"
        },
        {
          id: "557dcc2d9251410a32000175",
          iso_639_1: "en",
          iso_3166_1: "US",
          key: "e0iF8TCk4Fw",
          name: "For Your Eyes Only (1981) Official Trailer - Roger Moore James Bond Movie HD",
          site: "YouTube",
          size: 720,
          type: "Trailer"
        }
      ];

      const stub = sinon.stub(Imdb, "getVideosForId").returns(stubValue);
      const trailer = await getYouTubeTrailer("1234");

      sinon.assert.calledOnce(stub);
      return expect(trailer).to.equal("https://www.youtube.com/watch?v=9Ykn9zPnQME");
    });

    it("should throw an error if no trailers are founf", async () => {
      expect(getYouTubeTrailer("1234")).to.be.rejectedWith(Error("No trailer found for the requested movied"));
    });
  });
});
