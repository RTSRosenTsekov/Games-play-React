import * as request from "../lib/recuest";

const baseUrl = "http://localhost:3030/data/games";

export const create = async (gameData) => {
  //   const response = await fetch(baseUrl, {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(gameData),
  //   });

  //   const result = await response.json();
  const result = await request.post(baseUrl, gameData);
  return result;
};

export const getAll = async () => {
  const result = await request.get(baseUrl);

  return result;
};

export const getOne = async (gameId) => {
  const result = await request.get(`${baseUrl}/${gameId}`);
  return result;
};
