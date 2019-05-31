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

  // TODO: IMDB'deki türkçe film isimleri vsleri kaldır buralardan
  const directors = [
    {
      name: "Joss Whedon",
      bio: `Joss Whedon is the middle of five brothers - his younger brothers are Jed Whedon and Zack Whedon. Both his father, Tom Whedon and his grandfather, John Whedon were successful television writers. Joss' mother, Lee Stearns, was a history teacher and she also wrote novels as Lee Whedon. Whedon was raised in New York and was educated at Riverdale Country School, where his mother also taught. He also attended Winchester College in England for two years, before graduating with a film degree from Wesleyan University.

    After relocating to Los Angeles, Whedon landed his first TV writing job on "Roseanne", and moved on to script a season of "Parenthood". He then developed a film script which went on to become Buffy the Vampire Slayer (1992). Whedon was very unhappy with the final film - his original script was extensively re-written and made lighter in tone. After this he earned screenwriting credits on such high profile productions as Alien Resurrection (1997) and Toy Story (1995), for which he was Oscar nominated. He also worked as a 'script doctor' on various features, notably Speed (1994). 
    
    In 1997, Whedon had the opportunity to resurrect his character Buffy in a television series on The WB Network. This time, as showrunner and executive producer, he retained full artistic control. The series, "Buffy the Vampire Slayer" was a popular and critical hit, which ran for several seasons, the last two on UPN. Whedon also produced a spin-off series, "Angel", which was also successful. A foray in to sci-fi television followed with "Firefly", which developed a cult following, but did not stay on air long. It did find an audience on DVD and through re-runs, and a spin-off feature film Serenity (2005) was released in 2005.
    
    Other projects have included comic book writing, the sci-fi drama "Dollhouse" and the screenplay for Marvel blockbuster The Avengers (2012).`,
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTg5MzQ0MDA4MF5BMl5BanBnXkFtZTcwNzUwOTk4OQ@@._V1_SY1000_CR0,0,754,1000_AL_.jpg"
    },
    {
      name: "Edgar Wright",
      bio: `Edgar Howard Wright (born 18 April 1974) is an English director, screenwriter, producer, and actor. He is best known for his comedic Three Flavours Cornetto film trilogy consisting of Shaun of the Dead (2004), Hot Fuzz (2007), and The World's End (2013), made with recurrent collaborators Simon Pegg, Nira Park and Nick Frost. He also collaborated with them as the director of the television series Spaced.`,
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTMxMjgyMjQ4NF5BMl5BanBnXkFtZTcwMTU0ODk2Mw@@._V1_.jpg"
    },
    {
      name: "David Fincher",
      bio: `David Fincher was born in 1962 in Denver, Colorado, and was raised in Marin County, California. When he was 18 years old he went to work for John Korty at Korty Films in Mill Valley. He subsequently worked at ILM (Industrial Light and Magic) from 1981-1983. Fincher left ILM to direct TV commercials and music videos after signing with N. Lee Lacy in Hollywood. He went on to found Propaganda in 1987 with fellow directors Dominic Sena, Greg Gold and Nigel Dick. Fincher has directed TV commercials for clients that include Nike, Coca-Cola, Budweiser, Heineken, Pepsi, Levi's, Converse, AT&T and Chanel. He has directed music videos for Madonna, Sting, The Rolling Stones, Michael Jackson, Aerosmith, George Michael, Iggy Pop, The Wallflowers, Billy Idol, Steve Winwood, The Motels and, most recently, A Perfect Circle.

      As a film director, he has achieved huge success with Se7en (1995), Fight Club (1999) and, Panic Room (2002).`,
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTc1NDkwMTQ2MF5BMl5BanBnXkFtZTcwMzY0ODkyMg@@._V1_.jpg"
    },
    {
      name: "Christopher Nolan",
      bio: `Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970 in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.

      At 7 years old, Nolan began making short movies with his father's Super-8 camera. While studying English Literature at University College London, he shot 16-millimetre films at U.C.L.'s film society, where he learned the guerrilla techniques he would later use to make his first feature, Following (1998), on a budget of around $6,000. The noir thriller was recognized at a number of international film festivals prior to its theatrical release, and gained Nolan enough credibility that he was able to gather substantial financing for his next film.
      
      Nolan's second film was Memento (2000), which he directed from his own screenplay based on a short story by his brother Jonathan. Starring Guy Pearce, the film brought Nolan numerous honors, including Academy Award and Golden Globe Award nominations for Best Original Screenplay. Nolan went on to direct the critically acclaimed psychological thriller, Insomnia (2002), starring Al Pacino, Robin Williams and Hilary Swank.
      
      The turning point in Nolan's career occurred when he was awarded the chance to revive the Batman franchise in 2005. In Batman Begins (2005), Nolan brought a level of gravitas back to the iconic hero, and his gritty, modern interpretation was greeted with praise from fans and critics alike. Before moving on to a Batman sequel, Nolan directed, co-wrote, and produced the mystery thriller The Prestige (2006), starring Christian Bale and Hugh Jackman as magicians whose obsessive rivalry leads to tragedy and murder.
      
      In 2008, Nolan directed, co-wrote, and produced The Dark Knight (2008) which went on to gross more than a billion dollars at the worldwide box office. Nolan was nominated for a Directors Guild of America (D.G.A.) Award, Writers Guild of America (W.G.A.) Award and Producers Guild of America (P.G.A.) Award, and the film also received eight Academy Award nominations.
      
      In 2010, Nolan captivated audiences with the sci-fi thriller Inception (2010), which he directed and produced from his own original screenplay. The thought-provoking drama was a worldwide blockbuster, earning more than $800,000,000 dollars and becoming one of the most discussed and debated films of the year. Among its many honors, Inception received four Academy Awards and eight nominations, including Best Picture and Best Screenplay. Nolan was recognized by his peers with D.G.A. and P.G.A. Award nominations, as well as a W.G.A. Award for his work on the film.
      
      One of the best-reviewed and highest-grossing movies of 2012, The Dark Knight Rises (2012) concluded Nolan's Batman trilogy. Due to his success rebooting the Batman character, Warner Bros. enlisted Nolan to produce their revamped Superman movie Man of Steel (2013), which opened in the summer of 2013. In 2014, Nolan directed, wrote, and produced the science fiction epic Interstellar (2014), starring Matthew McConaughey, Anne Hathaway and Jessica Chastain. Paramount Pictures and Warner Bros. released the film on November 5, 2014 to positive reviews and strong box-office results, grossing over $670 million dollars worldwide.
      
      Nolan resides in Los Angeles, California with his wife, producer Emma Thomas, and their children. Nolan and Thomas also have their own production company, Syncopy.`,
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNjE3NDQyOTYyMV5BMl5BanBnXkFtZTcwODcyODU2Mw@@._V1_.jpg"
    },
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
        "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
      youtubeId: "eOrNdBpGMv8",
      directorId: Whedon.id
    },
    {
      title: "Scott Pilgrim vs. the World",
      description:
        "Scott Pilgrim must defeat his new girlfriend's seven evil exes in order to win her heart.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTkwNTczNTMyOF5BMl5BanBnXkFtZTcwNzUxOTUyMw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
      youtubeId: "7wd5KEaOtm4",
      directorId: Wright.id
    },
    {
      title: "Baby Driver",
      description:
        "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjM3MjQ1MzkxNl5BMl5BanBnXkFtZTgwODk1ODgyMjI@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
      youtubeId: "z2z857RSfhk",
      directorId: Wright.id
    },
    {
      title: "Shaun of the Dead",
      description:
        "A man's uneventful life is disrupted by the zombie apocalypse.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,669,1000_AL_.jpg",
      youtubeId: "LIfcaZ4pC-4",
      directorId: Wright.id
    },
    {
      title: "Fight Club",
      description:
        "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjJmYTNkNmItYjYyZC00MGUxLWJhNWMtZDY4Nzc1MDAwMzU5XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,676,1000_AL_.jpg",
      youtubeId: "qtRKdVHc-cE",
      directorId: Fincher.id
    },
    {
      title: "The Girl with the Dragon Tattoo",
      description:
        "Journalist Mikael Blomkvist is aided in his search for a woman who has been missing for forty years by Lisbeth Salander, a young computer hacker.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTczNDk4NTQ0OV5BMl5BanBnXkFtZTcwNDAxMDgxNw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
      youtubeId: "DqQe3OrsMKI",
      directorId: Fincher.id
    },
    {
      title: "The Social Network",
      description:
        "Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea, and the co-founder who was later squeezed out of the business.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BOGUyZDUxZjEtMmIzMC00MzlmLTg4MGItZWJmMzBhZjE0Mjc1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
      youtubeId: "lB95KLmpLR4",
      directorId: Fincher.id
    },
    {
      title: "Avengers: Age of Ultron",
      description:
        "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's mightiest heroes to stop the villainous Ultron from enacting his terrible plan.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SY1000_SX675_AL_.jpg",
      youtubeId: "tmeOjFno6Do",
      directorId: Whedon.id
    },
    {
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX675_AL_.jpg",
      youtubeId: "zSWdZVtXT7E",
      directorId: Nolan.id
    },
    {
      title: "The Lord of the Rings: The Fellowship of the Ring",
      description:
        "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SY999_CR0,0,673,999_AL_.jpg",
      youtubeId: "V75dMMIW2B4",
      directorId: Jackson.id
    },
    {
      title: "Star Wars: Episode IV - A New Hope",
      description:
        "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SY999_SX666_AL_.jpg",
      youtubeId: "vZ734NWnAHA",
      directorId: Lucas.id
    },
    {
      title: "Back to the Future",
      description:
        "Marty McFly, a 17-year-old high school student, is accidentally sent thirty years into the past in a time-traveling DeLorean invented by his close friend, the maverick scientist Doc Brown.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SY1000_CR0,0,643,1000_AL_.jpg",
      youtubeId: "qvsgGtivCgs",
      directorId: Zemeckis.id
    },
    {
      title: "The World's End",
      description:
        "Five friends who reunite in an attempt to top their epic pub crawl from twenty years earlier unwittingly become humanity's only hope for survival.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BNzA1MTk1MzY0OV5BMl5BanBnXkFtZTgwNjkzNTUwMDE@._V1_SY1000_CR0,0,674,1000_AL_.jpg",
      youtubeId: "hFo7eJR2cvc",
      directorId: Wright.id
    },
    {
      title: "Hot Fuzz",
      description:
        "A skilled London police officer is transferred to a small town with a dark secret.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMzg4MDJhMDMtYmJiMS00ZDZmLThmZWUtYTMwZDM1YTc5MWE2XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY999_CR0,0,672,999_AL_.jpg",
      youtubeId: "674Ka18uFuA",
      directorId: Wright.id
    },
    {
      title: "The Prestige",
      description:
        "After a tragic accident, two stage magicians engage in a battle to create the ultimate illusion while sacrificing everything they have to outwit each other.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjA4NDI0MTIxNF5BMl5BanBnXkFtZTYwNTM0MzY2._V1_.jpg",
      youtubeId: "ijXruSzfGEc",
      directorId: Nolan.id
    },
    {
      title: "The Dark Knight Rises",
      description:
        "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City, now on the edge of total annihilation, from the brutal guerrilla terrorist Bane.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_.jpg",
      youtubeId: "g8evyE9TuYk",
      directorId: Nolan.id
    },
    {
      title: "Inception",
      description:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
      youtubeId: "Qwe6qXFTdgc",
      directorId: Nolan.id
    },
    {
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_CR0,0,675,1000_AL_.jpg",
      youtubeId: "EXeTwQWrcwY",
      directorId: Nolan.id
    },
    {
      title: "Batman Begins",
      description:
        "After training with his mentor, Batman begins his fight to free crime-ridden Gotham City from corruption.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZmUwNGU2ZmItMmRiNC00MjhlLTg5YWUtODMyNzkxODYzMmZlXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SY1000_SX750_AL_.jpg",
      youtubeId: "neY2xVmOfUM",
      directorId: Nolan.id
    },
    {
      title: "Back to the Future Part II",
      description:
        "After visiting 2015, Marty McFly must repeat his visit to 1955 to prevent disastrous changes to 1985...without interfering with his first trip.",
      imageUrl:
        "https://m.media-amazon.com/images/M/MV5BZTMxMGM5MjItNDJhNy00MWI2LWJlZWMtOWFhMjI5ZTQwMWM3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
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
