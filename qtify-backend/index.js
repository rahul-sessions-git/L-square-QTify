const express = require("express"),
  bodyParser = require("body-parser");
const winston = require("winston"),
  expressWinston = require("express-winston");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors"); //import cors module
const { generateName, randomInteger, GENRES } = require("./helpers/helpers");
const { generateAlbums, generateData } = require("./data/albums");
const { sampleSize } = require("lodash");

const app = express();
const port = process.env.PORT || 3001;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 1 minute
  max: 30, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.disable("x-powered-by");

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false;
    }, // optional: allows to skip some log messages based on request and/or response
  })
);

app.use(cors()); //adding cors middleware to the express with above configurations
app.use(limiter);

// ---------------------- API ROUTES ------------------------

const { albums, songs } = generateData(50);
const albumIds = {};

const randomAlbumEnd = randomInteger(10, 18);
const topAlbums = albums.slice(0, randomAlbumEnd);
const newAlbums = albums.slice(randomAlbumEnd + 1, randomAlbumEnd * 2);

app.get("/albums/:type", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=600");
  const { type } = req.params;
  if (type === "top") {
    res.json(topAlbums);
    return;
  }
  if (type === "new") {
    res.json(newAlbums);
    return;
  }
  res.sendStatus(404);
});

app.get("/album/:slug", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=600");
  const { slug } = req.params;
  if (albumIds[slug]) {
    res.json(albumIds[slug]);
    return;
  } else {
    const album = albums.find((el) => el.slug === slug);
    albumIds[slug] = album;
    res.json(album || {});
    return;
  }
});

app.get("/songs", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=600");
  res.json(sampleSize(songs, randomInteger(40, 70)));
});

app.get("/genres", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=600");
  res.json({ data: GENRES });
});

app.get("/faq", (req, res) => {
  res.setHeader("Cache-Control", "public, max-age=600");
  res.json({
    data: [
      {
        question: "Is QTify free to use?",
        answer: "Yes! It is 100% free, and has 0% ads!",
      },
      {
        question: "Can I download and listen to songs offline?",
        answer:
          "Sorry, unfortunately we don't provide the service to download any songs.",
      },
      {
        question: "I am an artist, can I have my songs uploaded on QTify?",
        answer: "Yes, please reach out to us at letmesing@qtify.com",
      },
      {
        question: "On what all devices can I access QTify?",
        answer:
          "You may access QTify on your laptop, desktop, tablet and smartphones.",
      },
      {
        question: "How can I share my feedback?",
        answer:
          "On the top-right you will see button name 'Give Feedback'. Click on it and a form will appear on screen. Please fill that form and submit it, and your feedback will be shared with us.",
      },
    ],
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
