import { useEffect, useRef, useState, Fragment } from "react";
import Comment from "./Comment";
import { Api } from "../api";
import { FaTrash } from 'react-icons/fa';

import "./Comment.css";

const Comments = ({ socket, selectedUserId }) => {
  const [comments, setComments] = useState([]);
  const [noInputError , setNoInputError] = useState(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendComment = async () => {
    if(input.trim() !== "") {
      const data = {
        name: selectedUserId.toString(),
        message : input,
      }
      const result = await Api.post("http://localhost:3001/createComment", data);
      const comment = await result.json();
      setComments((comments) => [...comments, comment]);
    } else {
      setNoInputError(' Please input valid text to send. ');
    }
    
  };

  const fetchComments = async () => {
    const result = await Api.get("http://localhost:3001/getComments");
    const comments = await result.json();
    setComments(comments);
  };

  const deleteAllComments = async() =>{
    await Api.delete("http://localhost:3001/deleteComments");
    setComments([]);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [comments]);

  useEffect(() => {
    socket.on("new-comment", (comment) => {
      if (comment.name !== selectedUserId) {
        setComments((comments) => [...comments, comment]);
      }
    });
    return () => {
      socket.off("new-comment");
    };
  }, [socket, setComments, selectedUserId]);

  return (
    <Fragment>
      <div className="comments">
      <h3 className="comments-title" data-testid="commentsHeader">
      <span>
        {comments.length < 1 ? `Add a comment`
          : comments.length === 1 ? `1 comment` : `${comments.length} comments`}
      </span> 
      <span className="comments-title-icon"> <FaTrash title="Delete All Comments" onClick={() => deleteAllComments()} /> </span>
      </h3>

      <div className="comments-list">
        {comments.length >=1 && comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            isYou={selectedUserId === comment.name}
          />
        ))}
         <div ref={messagesEndRef} />
      </div>
      
      <div className="comments-box">
        <form
          className=""
          onSubmit={(e) => {
            e.preventDefault();
            sendComment(input);
            setInput("");
          }}
        >
          {
            noInputError && <span className="error-text" data-testid="commentSubmitError"> {noInputError} </span>
          }
          <textarea
            aria-multiline="true"
            className="comments-box__input"
            data-testid="commentInput"
            onChange={(e) => { setInput(e.target.value); setNoInputError(null) }}
            placeholder="Post a comment"
            value={input}
            name="body"
            maxLength={250}
          />
          <button
            aria-label="Submit Comment"
            type="submit"
            className="comments-box__btn"
            data-testid="submitComment"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </Fragment>
    
  );
};

export default Comments;