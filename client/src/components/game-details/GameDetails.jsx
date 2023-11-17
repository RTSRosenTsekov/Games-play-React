import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as gameServices from "../../services/gameService";
import * as commentService from "../../services/commentService";

export default function GameDetails() {
  const [game, setGame] = useState({});
  const [comments, setComments] = useState([]);
  const { gameId } = useParams();

  useEffect(() => {
    gameServices.getOne(gameId).then(setGame);

    commentService.getAll(gameId).then(setComments);
  }, [gameId]);

  const addCommentHandler = async (e) => {
    e.preventDefault();

    const fromData = new FormData(e.currentTarget);

    const newComment = await commentService.create(
      gameId,
      fromData.get("username"),
      fromData.get("comment")
    );
    
    // Запазваме стейта и го обновяваме
    setComments(state =>[...state, newComment])
    
  };

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
            {comments.map(({_id,username,text}) => (
              <li key={_id} className="comment">
                <p>{username}: {text}</p>
              </li>
            ))}
          </ul>
          
          {comments.length===0 &&(
          
          <p className="no-comment">No comments.</p>
          )}
        </div>

        <div className="buttons">
          <Link to="#" className="button">
            Edit
          </Link>
          <Link to="#" className="button">
            Delete
          </Link>
        </div>
      </div>

      <article className="create-comment">
        <label>Add new comment:</label>
        <form className="form" onSubmit={addCommentHandler}>
          <input type="text" name="username" />
          <textarea name="comment" placeholder="Comment......"></textarea>
          <input className="btn submit" type="submit" value="Add Comment" />
        </form>
      </article>
    </section>
  );
}
