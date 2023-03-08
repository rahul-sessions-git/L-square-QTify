const crypto = require("crypto");
const { faker } = require("@faker-js/faker");
const { generateName, randomInteger, GENRES } = require("../helpers/helpers");

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function generateSingleAlbum() {
  return {
    id: crypto.randomUUID(),
    title: generateName(),
    description: faker.lorem.lines(),
    follows: randomInteger(1000, 15000),
    image: faker.image.unsplash.technology(),
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
    image: faker.image.unsplash.buildings(),
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
  const songs = generateSongs(5000);

  const usedSongs = {};
  albums.forEach((album) => {
    album["songs"] = [];
    for (let i = 0; i < randomInteger(50, 500); i++) {
      const songIndex = randomInteger(0, 5000);
      if (!usedSongs[songIndex]) {
        album["songs"].push(songs[songIndex]);
        usedSongs[songIndex] = true;
      }
    }
  });
  return { albums, songs };
}

module.exports = { generateData };
