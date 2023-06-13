import React, { useEffect, useState, useRef } from "react";
import { Section } from "./Layout";
import ReactAudioPlayer from "react-audio-player";
import { IconStar } from "./SVG";
import axios from "axios";

const Hobby = () => {
  return (
    <>
      <Section
        title={"Gaming"}
        divClass={"grid-double shadow"}
        content={<Gaming></Gaming>}
      ></Section>
      <Section
        title={"Guitar"}
        divClass={"guitar"}
        content={<Guitar></Guitar>}
      ></Section>
      <Section
        title={"Movies & Series - my top "}
        divClass={"grid-quadro"}
        content={<>{<Movies></Movies>}</>}
      ></Section>

      {/* <Section
        title={"Anime"}
        divClass={""}
        content={<p>Description</p>}
      ></Section> */}
      <Section
        title={"Game Dev"}
        divClass={""}
        content={
          <>
            <p>To be revealed...</p>
          </>
        }
      ></Section>
    </>
  );
};

const Gaming = () => {
  const [playstationP, setplaystationP] = useState([]);
  console.log("Called");
  useEffect(() => {
    axios
      .get("https://ivan-chkalov-cv.onrender.com/api/playstationP")
      .then((response) => {
        setplaystationP(response.data);
        console.log(response.data.lateGames);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      {playstationP.length === 0 ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className="flex-center">
            <div>
              <img
                src={playstationP.profile.avatar}
                id="ps_avatar"
                alt=""
              ></img>
              <div className="ps_profile">
                <div>
                  <h2 className="ps_title">
                    {playstationP.profile.name +
                      " " +
                      playstationP.profile.surname}
                  </h2>
                  <img
                    src="/trophy.png"
                    id="profile_trophy"
                    className="trophy_img"
                    alt=""
                  ></img>
                  <i>{playstationP.profile.trophiesSumm}</i>
                  <p id={playstationP.profile.onlineStatus}>
                    {playstationP.profile.onlineStatus}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-center">
            <div>
              <img src="/ps_logo.png" id="ps_logo"></img>
              <h2 className="ps_title">Sony Playstation profile</h2>
            </div>
          </div>

          <div className="flex">
            <h2 className="underline">Latest 3 games</h2>
            {playstationP.lateGames.map(
              ({
                image,
                name,
                earnedTrophies,
                definedTrophies,
                lastPlayed,
              }) => {
                return (
                  <LatestGames
                    game_image={image}
                    game_name={name}
                    trophy_earned={earnedTrophies}
                    trophy_total={definedTrophies}
                    late_launch={lastPlayed.slice(0, 10)}
                  ></LatestGames>
                );
              }
            )}
          </div>
          <div className="flex">
            <h2 className="underline">Top 3 trophies</h2>
            {playstationP.topTrophies.map(
              ({
                trophyName,
                trophyIconUrl,
                trophyDetail,
                title,
                trophyEarnedRate,
              }) => {
                return (
                  <TopTrophies
                    trophy_name={trophyName}
                    trophy_image={trophyIconUrl}
                    trophy_description={trophyDetail}
                    game_name={title}
                    trophy_rarity={trophyEarnedRate}
                  ></TopTrophies>
                );
              }
            )}
          </div>
        </>
      )}
    </>
  );
};

const LatestGames = ({
  game_image,
  game_name,
  trophy_earned,
  trophy_total,
  late_launch,
}) => {
  return (
    <>
      <div>
        <img src={game_image} className="trophy_large" alt=""></img>
        <div className="ps_profile">
          <div style={{ width: "100%" }}>
            <h2 className="ps_title">{game_name}</h2>
            <div style={{ marginTop: "5px" }}>
              <img src="/trophy2.png" className="trophy_img" alt=""></img>
              <i>{trophy_earned + " out of " + trophy_total}</i>
            </div>
            <p className="opacity_5 pblock">
              {"Latest launch: " + late_launch}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const TopTrophies = ({
  trophy_name,
  trophy_image,
  trophy_description,
  game_name,
  trophy_rarity,
}) => {
  return (
    <>
      <h2 className="ps_title">
        {trophy_name + " "}
        <img src="/frame_1.png" className="trophy_img_ps" alt=""></img>
      </h2>
      <div>
        <img src={trophy_image} className="trophy_large"></img>
        <div className="ps_profile">
          <div>
            <p>{trophy_description + " (" + game_name + ")"}</p>
            <i className="pblock">{"Rarity: " + trophy_rarity + "%"}</i>
          </div>
        </div>
      </div>
    </>
  );
};

const Guitar = () => {
  const [songN, setSongN] = useState("music/radioactive.mp3");

  const songs = [
    {
      file: "allowed-to-be-happy.mp3",
      title: "The Last of Us Part II - Allowed to be happy",
    },
    {
      file: "naruto-sadness.mp3",
      title: "Naruto - Sadness and Sorrow",
    },
    {
      file: "flowers.mp3",
      title: "Metallica - Nothing Else Matters",
    },
    {
      file: "radioactive.mp3",
      title: "Interstellar",
    },
  ];

  const Songs = ({ number, file, title }) => {
    return (
      <>
        <div className="guitar_songs">
          <p className="num">{number}</p>
          <a
            onClick={() => {
              setSongN(`music/${file}`);
            }}
          >
            {title}
          </a>
        </div>
      </>
    );
  };

  return (
    <>
      <h2>Please choose one of the tracks</h2>
      {songs.map((item, index) => {
        return (
          <Songs number={index + 1} file={item.file} title={item.title}></Songs>
        );
      })}
      {/* <div className="guitar_songs">
        <p className="num">1</p>
        <a
          onClick={() => {
            setSongN("music/radioactive.mp3");
          }}
        >
          The Last of Us Part II - Allowed to be happy
        </a>
      </div>
      <div className="guitar_songs">
        <p className="num">2</p>
        <a onClick={() => setSongN("music/wb.mp3")}>
          Naruto - Sadness and Sorrow
        </a>
      </div>
      <div className="guitar_songs">
        <p className="num">3</p>
        <a onClick={() => setSongN("music/flowers.mp3")}>
          Metallica - Nothing Else Matters
        </a>
      </div>
      <div className="guitar_songs">
        <p className="num">4</p>
        <a onClick={() => setSongN("music/flowers.mp3")}>Interstellar</a>
      </div> */}

      <ReactAudioPlayer src={songN} controls />
    </>
  );
};

const Movies = () => {
  const [moviesP, setMoviesP] = useState([]);

  useEffect(() => {
    axios
      .get("https://ivan-chkalov-cv.onrender.com/api/moviesP")
      .then((response) => {
        setMoviesP(response.data);
        // console.log(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const MovieCard = ({
    url,
    title,
    rating,
    year,
    description,
    genres,
    image,
  }) => {
    const movieContainerRef = useRef(null);
    const movieContainerParagraphRef = useRef(null);

    // Установка высоты контейнера
    const [containerHeight, setContainerHeight] = useState(0);
    // Проверяем наведена ли мышь
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    const containerStyle = {
      bottom: isHovered ? "0px" : `-${containerHeight}px`,
    };

    // Достаем высоту параграфа
    useEffect(() => {
      if (movieContainerRef.current && movieContainerParagraphRef.current) {
        const height = movieContainerParagraphRef.current.offsetHeight;
        setContainerHeight(height);
      }
    }, []);

    // Применяем к bottom элемента
    useEffect(() => {
      if (movieContainerRef.current) {
        movieContainerRef.current.style.bottom = `-${containerHeight}px`;
      }
    }, [containerHeight]);

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="moviesD"
        style={{ backgroundImage: `url(${image})` }}
      >
        {/* <img src="queen.jpg" className="moviesP"></img> */}
        <div
          ref={movieContainerRef}
          style={containerStyle}
          className="movie_contaner"
        >
          <div>
            <h3>
              <a href={url}>{title + " (" + year + ")"}</a>
            </h3>
            <div className="icons_stars">
              <IconStar grad={"3"}></IconStar>
              <IconStar grad={"3"}></IconStar>
              <IconStar grad={"3"}></IconStar>
              <IconStar
                grad={
                  Math.round(rating) <= 6
                    ? "1"
                    : Math.round(rating) === 7
                    ? "2"
                    : "3"
                }
              ></IconStar>
              <IconStar
                grad={
                  Math.round(rating) <= 8
                    ? "1"
                    : Math.round(rating) === 9
                    ? "2"
                    : "3"
                }
              ></IconStar>

              <i>{rating}</i>
              <img src="imdb.png" className="moviesIcon"></img>
            </div>
            {genres.slice(0, 3).map((item) => {
              return <h6>{item}</h6>;
            })}
            <p ref={movieContainerParagraphRef}>{description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {moviesP.length === 0 ? (
        <h2>Loading...</h2>
      ) : (
        moviesP.map((item) => {
          return (
            <MovieCard
              url={item.URL}
              title={item.Title}
              rating={item["IMDb Rating"]}
              year={item.Year}
              description={item.Plot}
              image={item.Image}
              genres={item.Genres.split(", ")}
            ></MovieCard>
          );
        })
      )}
    </>
  );
};

export { Hobby };
