import './Card.css';
import { useState } from 'react';
import { BiComment } from 'react-icons/bi';
import { MdOutlineShare } from 'react-icons/md';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    setLiked(true);
    socket.emit('sendNotification', {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  const handleUnlike = () => {
    setLiked(false);
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="avatar" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="post" className="postImg" />
      <div className="interaction">
        {!liked ? (
          <BsHeart className="cardIcon" onClick={() => handleNotification(1)} />
        ) : (
          <BsHeartFill className="cardIcon" onClick={handleUnlike} />
        )}
        <BiComment className="cardIcon" onClick={() => handleNotification(2)} />
        <MdOutlineShare
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
      </div>
    </div>
  );
};

export default Card;
