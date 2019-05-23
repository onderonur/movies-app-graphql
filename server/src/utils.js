import models from "./models";
import { AuthenticationError } from "apollo-server";
import jwt from "jsonwebtoken";

const { Director, Movie, User } = models;

export const seedData = async () => {
  const admin = await User.create({
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    firstname: process.env.ADMIN_FIRSTNAME,
    lastname: process.env.ADMIN_LASTNAME,
    role: "ADMIN"
  });

  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    await User.create({
      username: process.env.TESTUSER_USERNAME,
      password: process.env.TESTUSER_PASSWORD,
      firstname: process.env.TESTUSER_FIRSTNAME,
      lastname: process.env.TESTUSER_LASTNAME
    });
  }

  const directors = [
    { name: "Joss Whedon" },
    { name: "Edgar Wright" },
    { name: "David Fincher" },
    { name: "Christopher Nolan" },
    { name: "Peter Jackson" },
    { name: "George Lucas" },
    { name: "Robert Zemeckis" }
  ];

  const savedDirectors = await Director.bulkCreate(directors, {
    // To get generatted id values
    returning: true
  });

  const Whedon = savedDirectors.find(
    director => director.name === "Joss Whedon"
  );
  const Wright = savedDirectors.find(
    director => director.name === "Edgar Wright"
  );
  const Fincher = savedDirectors.find(
    director => director.name === "David Fincher"
  );
  const Nolan = savedDirectors.find(
    director => director.name === "Christopher Nolan"
  );
  const Jackson = savedDirectors.find(
    director => director.name === "Peter Jackson"
  );
  const Lucas = savedDirectors.find(
    director => director.name === "George Lucas"
  );
  const Zemeckis = savedDirectors.find(
    director => director.name === "Robert Zemeckis"
  );

  const movies = [
    {
      title: "The Avengers",
      description:
        "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "eOrNdBpGMv8",
      directorId: Whedon.id
    },
    {
      title: "Scott Pilgrim vs. the World",
      description:
        "Scott Pilgrim must defeat his new girlfriend's seven evil exes in order to win her heart.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTkwNTczNTMyOF5BMl5BanBnXkFtZTcwNzUxOTUyMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "7wd5KEaOtm4",
      directorId: Wright.id
    },
    {
      title: "Baby Driver",
      description:
        "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjM3MjQ1MzkxNl5BMl5BanBnXkFtZTgwODk1ODgyMjI@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "z2z857RSfhk",
      directorId: Wright.id
    },
    {
      title: "Shaun of the Dead",
      description:
        "A man's uneventful life is disrupted by the zombie apocalypse.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "LIfcaZ4pC-4",
      directorId: Wright.id
    },
    {
      title: "Fight Club",
      description:
        "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjJmYTNkNmItYjYyZC00MGUxLWJhNWMtZDY4Nzc1MDAwMzU5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "qtRKdVHc-cE",
      directorId: Fincher.id
    },
    {
      title: "The Girl with the Dragon Tattoo",
      description:
        "Journalist Mikael Blomkvist is aided in his search for a woman who has been missing for forty years by Lisbeth Salander, a young computer hacker.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTczNDk4NTQ0OV5BMl5BanBnXkFtZTcwNDAxMDgxNw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "DqQe3OrsMKI",
      directorId: Fincher.id
    },
    {
      title: "The Social Network",
      description:
        "Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea, and the co-founder who was later squeezed out of the business.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "lB95KLmpLR4",
      directorId: Fincher.id
    },
    {
      title: "Avengers: Age of Ultron",
      description:
        "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "tmeOjFno6Do",
      directorId: Whedon.id
    },
    {
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "zSWdZVtXT7E",
      directorId: Nolan.id
    },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      description:
        "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "V75dMMIW2B4",
      directorId: Jackson.id
    },
    {
      title: "Star Wars: Episode IV - A New Hope",
      description:
        "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "vZ734NWnAHA",
      directorId: Lucas.id
    },
    {
      title: "Back to the Future",
      description:
        "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "qvsgGtivCgs",
      directorId: Zemeckis.id
    },
    {
      title: "The World's End",
      description:
        "Five friends who reunite in an attempt to top their epic pub crawl from twenty years earlier unwittingly become humanity's only hope for survival.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNzA1MTk1MzY0OV5BMl5BanBnXkFtZTgwNjkzNTUwMDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "hFo7eJR2cvc",
      directorId: Wright.id
    },
    {
      title: "Hot Fuzz",
      description:
        "A skilled London police officer is transferred to a small town with a dark secret.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMzg4MDJhMDMtYmJiMS00ZDZmLThmZWUtYTMwZDM1YTc5MWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "674Ka18uFuA",
      directorId: Wright.id
    },
    {
      title: "The Prestige",
      description:
        "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "ijXruSzfGEc",
      directorId: Nolan.id
    },
    {
      title: "The Dark Knight Rises",
      description:
        "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City, now on the edge of total annihilation, from the brutal guerrilla terrorist Bane.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "g8evyE9TuYk",
      directorId: Nolan.id
    },
    {
      title: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "Qwe6qXFTdgc",
      directorId: Nolan.id
    },
    {
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "EXeTwQWrcwY",
      directorId: Nolan.id
    },
    {
      title: "Batman Begins",
      description:
        "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_UY268_CR9,0,182,268_AL_.jpg",
      youtubeId: "neY2xVmOfUM",
      directorId: Nolan.id
    },
    {
      title: "Back to the Future Part II",
      description:
        "After visiting 2015, Marty McFly must repeat his visit to 1955 to prevent disastrous changes to 1985...without interfering with his first trip.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZTMxMGM5MjItNDJhNy00MWI2LWJlZWMtOWFhMjI5ZTQwMWM3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
      youtubeId: "MdENmefJRpw",
      directorId: Zemeckis.id
    }
  ];

  const savedMovies = await Movie.bulkCreate(movies, {
    // To get generatted id values
    returning: true
  });

  // Get random movies for admin to like
  // Shuffle array
  const shuffled = shuffleArray(savedMovies);

  // Get sub-array of first n elements after shuffled
  let selected = shuffled.slice(0, 12);

  await admin.addMovies(selected);
};

const shuffleArray = array => {
  return array.sort(() => 0.5 - Math.random());
};

export const getViewer = async req => {
  let token = req.headers["authorization"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    try {
      return await jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};
