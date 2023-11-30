import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as gameServices from "../../services/gameService";
import * as commentService from "../../services/commentService";
import AuthContext from "../../contexts/authContext";
import reducer from "./commentReducer";
import useForm from "../../hooks/useForm";

export default function GameDetails() {
  const { email, userId } = useContext(AuthContext);
  const [game, setGame] = useState({});
  // const [comments, setComments] = useState([]);
  const [comments, dispatch] = useReducer(reducer, []);
  const { gameId } = useParams();

  useEffect(() => {
    gameServices.getOne(gameId).then(setGame);

    commentService.getAll(gameId).then((result) => {
      dispatch({
        type: "GET_ALL_COMMENT",
        payload: result,
      });
    });
  }, [gameId]);

  const addCommentHandler = async (values) => {
    const newComment = await commentService.create(gameId, values.comment);

    newComment.owner = { email };
    // Запазваме стейта и го обновяваме
    // setComments(state =>[...state, {newComment, author:{email}}])
    dispatch({
      type: "ADD_COMMENT",
      payload: newComment,
    });
  };

  const { values, onChange, onSubmit } = useForm(addCommentHandler, {
    comment: "",
  });

  const isOwner =   userId === game._ownerId;

  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="game-header">
          <img className="game-img" src={game.imageUrl} alt={game.title} />
          <h1>{game.title}</h1>
          <span className="levels">MaxLevel: {game.maxLevel}</span>
          <p className="type">{game.category}</p>
        </div>

        <p className="text">{game.summary}</p>

        <div className="details-comments">
          <h2>Comments:</h2>
          <ul>
            {comments.map(({ _id, text, owner: { email } }) => (
              <li key={_id} className="comment">
                <p>
                  {email}: {text}
                </p>
              </li>
            ))}
          </ul>

          {comments.length === 0 && <p className="no-comment">No comments.</p>}
        </div>

        {isOwner && (
          <div className="buttons">
            <Link to="#" className="button">
              Edit
            </Link>
            <Link to="#" className="button">
              Delete
            </Link>
          </div>
        )}
      </div>

      <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form" onSubmit={onSubmit}>
          <textarea
            name="comment"
            value={values.comment}
            onChange={onChange}
            placeholder="Comment......"
          ></textarea>
          <input className="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>
    </section>
  );
}
