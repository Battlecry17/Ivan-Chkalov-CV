const express = require("express");
const app = express();
const fs = require("fs");
const axios = require("axios");
const path = require("path");

const PORT = 3001;

// const bodyParser = require("body-parser");

app.get("/api", (req, res) => {
  console.log("Hi from server");
  res.json({ message: "Hello from server!" });
});

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Проксирование идет через Api, все запросы должны писаться через /api

app.get("/api/download/:file(*)", function (req, res) {
  const file = req.params.file;
  const fileLocation = path.join("./uploads/", file);

  // Проверяем, существует ли файл
  fs.access(fileLocation, fs.constants.F_OK, (err) => {
    if (err) {
      // Файл отсутствует, отправляем код состояния 404 и сообщение об ошибке
      res.status(404).send("Файл не найден");
    } else {
      // Файл существует, отправляем его как прикрепленный файл для скачивания
      res.download(fileLocation, file);
    }
  });

  // console.log(path.join("./uploads/", file));
  // console.log(file);
  // res.download(fileLocation, file);
});

// app.get("/api/download/:file(*)", function (req, res) {
//   console.log("Work?");
//   const file = req.params.file;
//   const fileLocation = path.join("./uploads", file);

//   // Проверяем, существует ли файл
//   fs.access(fileLocation, fs.constants.F_OK, (err) => {
//     if (err) {
//       // Файл отсутствует, отправляем код состояния 404 и сообщение об ошибке
//       res.status(404).send("Файл не найден");
//     } else {
//       // Файл существует, отправляем его как прикрепленный файл для скачивания
//       res.setHeader("Content-Disposition", `attachment; filename=${file}`);
//       res.sendFile(fileLocation);
//     }
//   });
// });

//без этой строки будет приходить undefined - доставка сообщений
app.use(express.json());

//Доставка сообщений

app.post("/api/formdata", (req, res) => {
  console.log(req.body);
  // writeFile(req.body, appendFile);
  res.status(200).send("Данные доставлены");
});

// const readFile = (obj, append) => {
//   const file = JSON.parse(fs.readFileSync("messages.json"));
//   return append(obj, file);
// };

// const appendFile = (object, array) => {
//   array.push(object);
//   return array;
// };

// const writeFile = (message, func) => {
//   fs.writeFile(
//     "./messages.json",
//     JSON.stringify(readFile(message, func), null, 2),
//     "utf-8",
//     (err) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       console.log("Данные записаны в файл");
//     }
//   );
// };

//Заполнение Hobby movies

const csvFilePath = "ratings.csv";
const csv = require("csvtojson");

let globalData = null;

// app.get("/data", (req, res) => {
//   res.send(globalData); // Отправка глобальных данных обратно клиенту
// });

app.get("/api/moviesP", (req, res) => {
  res.send(globalData);
  // csv()
  //   .fromFile(csvFilePath)
  //   .then((jsonObj) => {
  //     const movies = jsonObj.filter(
  //       (movieObj) => movieObj["Title Type"] === "movie"
  //     );
  //     const series = jsonObj.filter(
  //       (seriesObj) => seriesObj["Title Type"] === "tvSeries"
  //     );
  //     movies.sort(function (a, b) {
  //       return b["Your Rating"] - a["Your Rating"];
  //     });
  //     series.sort(function (a, b) {
  //       return b["Your Rating"] - a["Your Rating"];
  //     });

  //     movies.splice(4);
  //     series.splice(4);
  //     const globalData = [...movies, ...series];
  //     // console.log(globalData);

  //     res.send(globalData);
  //   });
});

app.get("/api/playstationP", async (req, res) => {
  const psApi = require("psn-api");

  // Авторизация
  const myNpsso =
    "zvTrfziJ5N1pK0YmON40fpNa80s5xlx5TpTg9DklQbdhnpevVev7J3W98vczrMtQ";

  const accessCode = await psApi.exchangeNpssoForCode(myNpsso);
  const authorization = await psApi.exchangeCodeForAccessToken(accessCode);

  // Достаем все id игр на аккаунте по профилю
  const trophyTitlesResponse = await psApi.getUserTitles(
    { accessToken: authorization.accessToken },
    "me"
  );

  // ПЕРВАЯ ЛОГИКА ------------------------------------------------------------------------

  trophyTitlesResponse.trophyTitles.splice(4);

  const responseUserName = await psApi.getProfileFromUserName(
    authorization,
    "Battle_cryFry"
  );

  const allTrophies = responseUserName.profile.trophySummary.earnedTrophies;
  const trophiesSumm =
    allTrophies.platinum +
    allTrophies.gold +
    allTrophies.silver +
    allTrophies.bronze;

  // ПЕРВЫЙ МАССИВ ------------------------------------------------------------------------

  const profileInfo = {
    name: responseUserName.profile.personalDetail.firstName,
    surname: responseUserName.profile.personalDetail.lastName,
    avatar: responseUserName.profile.avatarUrls[0].avatarUrl,
    onlineStatus: responseUserName.profile.primaryOnlineStatus,
    trophiesSumm: trophiesSumm,
  };

  //Последние 3 игры
  // ВТОРОЙ МАССИВ--------------------------------------------------------------------------

  const lateThreeGames = [];

  async function getLateThreeGames(item, index) {
    const definedTrophiesSumm =
      item.definedTrophies.bronze +
      item.definedTrophies.silver +
      item.definedTrophies.gold +
      item.definedTrophies.platinum;

    const earnedTrophiesSumm =
      item.earnedTrophies.bronze +
      item.earnedTrophies.silver +
      item.earnedTrophies.gold +
      item.earnedTrophies.platinum;

    lateThreeGames.push({
      id: item.npCommunicationId,
      name: item.trophyTitleName,
      image: item.trophyTitleIconUrl,
      lastPlayed: item.lastUpdatedDateTime,
      definedTrophies: definedTrophiesSumm,
      earnedTrophies: earnedTrophiesSumm,
    });
  }

  // console.log(lateThreeGames);
  //Надо - инфа об аккаунте

  // ТРЕТЬЯ ЛОГИКА ------------------------------------------------------------------------

  const allgames = [];
  // ТРЕТИЙ МАССИВ ------------------------------------------------------------------------
  const topTrohies = [];

  // Вытаскиваем id и name
  await trophyTitlesResponse.trophyTitles.forEach((item) => {
    const obj = { id: item.npCommunicationId, title: item.trophyTitleName };
    allgames.push(obj);
  });

  async function getAllGamesTopTrophies(item, index) {
    let responseEarnedForTitle;
    try {
      responseEarnedForTitle = await psApi.getUserTrophiesEarnedForTitle(
        authorization,
        "me",
        item.id,
        "all"
      );
    } catch (error) {
      if (error.message === "Resource not found") {
        console.log("Ресурс не найден. Продолжаем выполнение кода без ошибки.");
        return; // Остановить выполнение текущей итерации и перейти к следующей итерации цикла
      } else {
        throw error; // Пробросить другие ошибки, если это не ошибка "Resource not found"
      }
    }

    responseEarnedForTitle.trophies.sort((a, b) => {
      return a.trophyEarnedRate - b.trophyEarnedRate;
    });

    const filterEarned = responseEarnedForTitle.trophies.filter((obj) => {
      return obj.earned === true;
    });

    const filtered = filterEarned.slice(0, 1);

    if (filtered.length !== 0) {
      allgames[index].trophyId = filtered[0].trophyId;
      allgames[index].trophyEarnedRate = filtered[0].trophyEarnedRate;
    }
  }

  function filterAllGamesTopTrophies(allgames) {
    // Убираем незаполненные запросы
    const filterEarned = allgames.filter((obj) => {
      return obj.trophyId !== undefined;
    });

    // Сортировка по редкости всех трофеев всех игр
    filterEarned.sort((a, b) => {
      return a.trophyEarnedRate - b.trophyEarnedRate;
    });

    // Отбираем топ 3
    const filterReady = filterEarned.slice(0, 3);

    return filterReady;
  }

  async function gamesTopTrophies(item, index) {
    // //тут будет 3 запроса по id через foreach

    const responseTrophy = await psApi.getTitleTrophies(
      authorization,
      item.id,
      "all"
    );
    const topTrophy = responseTrophy.trophies.filter((obj) => {
      return obj.trophyId === item.trophyId;
    });
    // console.log(topTrophy);

    item.trophyName = topTrophy[0].trophyName;
    item.trophyDetail = topTrophy[0].trophyDetail;
    item.trophyIconUrl = topTrophy[0].trophyIconUrl;

    // console.log(item);
    topTrohies.push(item);
    // topTrohies.push(item);

    // console.log(trophyTitlesResponse.trophyTitles.splice(4));
    // console.log(typeof trophyTitlesResponse.trophyTitles[1]);
    // console.log(trophyTitlesResponse.trophyTitles[1]);
    // console.log(trophyTitlesResponse.trophyTitles.slice(0, 3));
  }

  async function asyncForEach(array, asyncCallback) {
    for (let index = 0; index < array.length; index++) {
      await asyncCallback(array[index], index);
    }
  }

  asyncForEach(allgames, async (item, index) => {
    await getAllGamesTopTrophies(item, index);
  })
    .then(() => {
      console.log("Все элементы обработаны");
      const filterReady = filterAllGamesTopTrophies(allgames);
      return filterReady;
    })
    .then((filterReady) => {
      return asyncForEach(filterReady, async (item, index) => {
        await gamesTopTrophies(item, index);
      });
    })
    .then(() => {
      const lateThree = trophyTitlesResponse.trophyTitles.slice(0, 3);
      return asyncForEach(lateThree, async (item, index) => {
        await getLateThreeGames(item, index);
      });
    })
    .then(() => {
      // console.log(lateThreeGames);
      const completeAccountInfo = {
        profile: profileInfo,
        topTrophies: topTrohies,
        lateGames: lateThreeGames,
      };
      res.send(completeAccountInfo);
      // console.log(completeAccountInfo);
    })
    .catch((error) => {
      console.error(error);
    });
});

const getFullMedia = () => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      const movies = jsonObj.filter(
        (movieObj) => movieObj["Title Type"] === "movie"
      );
      const series = jsonObj.filter(
        (seriesObj) => seriesObj["Title Type"] === "tvSeries"
      );
      movies.sort(function (a, b) {
        return b["Your Rating"] - a["Your Rating"];
      });
      series.sort(function (a, b) {
        return b["Your Rating"] - a["Your Rating"];
      });

      movies.splice(4);
      series.splice(4);
      globalData = [...movies, ...series];
      // console.log(globalData);

      // res.send(page);
      return globalData;
    })
    .then((globalData) => {
      const detailsKey = "9ea1eb2dd8msh541cb11e21d8a29p105cf6jsn1d4e16f4dd12";

      globalData.forEach((item, index) => {
        const images = {
          method: "GET",
          url: "https://imdb8.p.rapidapi.com/title/get-details",
          params: {
            tconst: item.Const,
          },
          headers: {
            "X-RapidAPI-Key": detailsKey,
            "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
          },
        };

        const plots = {
          method: "GET",
          url: "https://movie-database-alternative.p.rapidapi.com/",
          params: {
            r: "json",
            i: item.Const,
          },
          headers: {
            "X-RapidAPI-Key": detailsKey,
            "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
          },
        };

        setTimeout(async () => {
          const responseImages = await axios.request(images);
          const responsePlots = await axios.request(plots);
          globalData[index].Image = responseImages.data.image.url;
          globalData[index].Plot = responsePlots.data.Plot;
          globalData[index]["IMDb Rating"] = responsePlots.data.imdbRating;
          // console.log(globalData);

          // Задержка из-за того, что нельзя посылать более 5 запросов в секунду
        }, (index + 1) * 550);
      });
    });
};

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  getFullMedia();
});
