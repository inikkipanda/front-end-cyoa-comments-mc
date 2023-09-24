import formatDistance from "date-fns/formatDistance";
import parseISO from "date-fns/parseISO";
import "./Comment.css";


const formatDate = (dateStr) => {
  const date = parseISO(dateStr);
  // To Do : Small hack to convert to EST. Can create a util method / use a lib for timezone conversion.
  date.setHours(date.getHours() - 4);
  return formatDistance(date, new Date(), { addSuffix: true });
};

const Comment = ({ comment, isYou }) => (
  <div className="comment">
    <div className="comment-header">
      <span className="comment-author">
        {isYou ? "You" : comment.name}
      </span>
      <span className="comments-time">{formatDate(comment.created)}</span>
    </div>
    <div> 
      <span className="comment-body">{comment.message} </span>
    </div>
  </div>
);

export default Comment;