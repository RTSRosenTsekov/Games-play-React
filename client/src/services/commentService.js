import * as request from "../lib/recuest";

const baseUrl = "http://localhost:3030/data/comments";

export const create = async (gameId, text) => {
  const newComment = await request.post(baseUrl, {
    gameId,
    text,
  });

  return newComment;
};

export const getAll = async (gameId) => {
  const query = new URLSearchParams({
    where: `gameId="${gameId}"`,
    load:`owner=_ownerId:users`,
  });
  const result = await request.get(`${baseUrl}?${query.toString()}?${query}`);

  //return result.filter(comment=> comment.gameId ===gameId);

  return result;
};
