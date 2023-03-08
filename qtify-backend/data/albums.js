const crypto = require("crypto");
const { faker } = require("@faker-js/faker");
const {
  generateName,
  randomInteger,
  GENRES,
  convertToSlug,
} = require("../helpers/helpers");
const { IMAGES } = require("./images");

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

const usedImageIndex = [];
const usedSongsIndex = [];

function getUniqueImage() {
  const randomIndex = randomInteger(0, IMAGES.length - 1, usedImageIndex);
  usedImageIndex.push(randomIndex);
  return IMAGES[randomIndex].src.portrait;
}

function generateSingleAlbum() {
  const title = generateName();
  return {
    id: crypto.randomUUID(),
    title: title,
    description: faker.lorem.lines(),
    follows: randomInteger(1000, 15000),
    image: getUniqueImage(),
    slug: convertToSlug(title),
  };
}
function generateAlbums(number) {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push(generateSingleAlbum());
  }
  return result;
}

function generateSingleSong() {
  const numberOfArtists = randomInteger(1, 3);
  const artists = [];
  for (let i = 0; i < numberOfArtists; i++) {
    artists.push(faker.name.fullName());
  }
  return {
    id: crypto.randomUUID(),
    title: faker.music.songName(),
    artists: artists,
    genre: GENRES.random(),
    likes: randomInteger(5000, 100000),
    image: getUniqueImage(),
    durationInMs: randomInteger(60000, 24000),
  };
}
function generateSongs(number) {
  const result = [];
  for (let i = 0; i < number; i++) {
    result.push(generateSingleSong());
  }
  return result;
}

function generateData(number) {
  const albums = generateAlbums(number);
  const songs = generateSongs(500);

  albums.forEach((album) => {
    album["songs"] = [];
    for (let i = 0; i < randomInteger(30, 100); i++) {
      const randomIndex = randomInteger(0, songs.length - 1);
      album["songs"].push(songs[randomIndex]);
    }
  });
  return { albums, songs };
}

module.exports = { generateData };
