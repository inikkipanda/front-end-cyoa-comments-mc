import { Fragment, useEffect, useState } from "react";
import { MdNotifications } from 'react-icons/md';

import "./Header.css";


const RefreshIcon = () => {
  return (
    <MdNotifications />
  );
};
const Header = ({ socket, selectedUserId }) => {

  const [count, setCount ] = useState(0);
  const clearNotificaitons = () => {
    setCount(0);
  };


  useEffect(() => {
      socket.on("new-comment", (comment) => {
        if(selectedUserId !== comment.name)
          setCount(count+1);
      });
    }, [socket, count, selectedUserId]);

  
  useEffect(() => {
    socket.on("delete-comments", () => {
      setCount(0);

      return () => {
        socket.off("delete-comments");
      };
    });
  }, [socket]);

  return (
    <header className="header" key={selectedUserId}>
      <h3 className="header-user">
        Hello, {selectedUserId} !!
      </h3>
      {
        count>0 &&
        <Fragment>
        <button className="header-notifications__btn" data-testid="clearNotifications" onClick={() => clearNotificaitons()}> Mark Read </button>
        <p data-testid="headerNotification">
          <RefreshIcon className="header-notifications__icon" data-testid="iconNotifications"  />  You have {count} new comment(s).
        </p>
        </Fragment>
      }
    </header>
  );
};
  
  export default Header;

