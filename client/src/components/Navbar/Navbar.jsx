import './Navbar.css';
import { useEffect, useState } from 'react';
import { IoMdSettings } from 'react-icons/io';
import { BsBellFill, BsFillEnvelopeFill } from 'react-icons/bs';

const Navbar = ({ socket }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    socket.on('getNotification', (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifications);

  const displayNotification = ({ senderName, type }, index) => {
    let action;

    if (type === 1) {
      action = 'liked';
    } else if (type === 2) {
      action = 'commented on';
    } else {
      action = 'shared';
    }

    return (
      <span
        className="notification"
        key={index}
      >{`${senderName} ${action} your post.`}</span>
    );
  };

  const handleRead = () => {
    setNotifications([]);
    setOpen(false);
  };

  return (
    <div className="navbar">
      <span className="logo">Ken App</span>

      <div className="icons">
        <div className="icon" onClick={() => setOpen(!open)}>
          <BsBellFill fontSize={20} />
          {notifications.length > 0 && (
            <div className="counter">{notifications.length}</div>
          )}
        </div>
        <div className="icon">
          <BsFillEnvelopeFill fontSize={20} />
          <div className="counter">2</div>
        </div>
        <div className="icon">
          <IoMdSettings fontSize={20} />
          <div className="counter">2</div>
        </div>
      </div>

      {open && (
        <div className="notifications">
          {notifications.map((notification, index) =>
            displayNotification(notification, index)
          )}
          <button className="notificationButton" onClick={handleRead}>
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
