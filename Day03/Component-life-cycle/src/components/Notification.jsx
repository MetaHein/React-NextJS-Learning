import "react";

function Notification({ messageCount }) {
  return <>{messageCount > 0 && <p>You have {messageCount} messages.</p>}</>;
}

export default Notification;
