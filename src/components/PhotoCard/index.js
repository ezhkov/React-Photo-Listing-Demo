import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Card,
  Avatar,
  Tag,
  Popover,
} from 'antd';
import './index.scss';

const { Meta } = Card;

const PhotoCard = memo(({
  tags,
  photoName,
  photoDesc,
  title,
  photoID,
  userID,
  userAvatar,
  onSearchTagValue,
}) => (
  <div className="photo-card-self">
    <Card
      style={{ width: '100%' }}
      cover={(
        <Link
          className="photo-card__photo-link"
          to={`/photo/${photoID}`}
        >
          <img
            className="photo-card__img"
            alt="example"
            src={photoName}
          />
        </Link>
        )}
    >
      { title && (
        <Link
          className="photo-card-self__link-ava"
          to={`/users/${userID}`}
        >
          <Meta
            avatar={
              <Avatar src={userAvatar} />
            }
            title={title}
          />
        </Link>
      )}
      <p className="photo-card-self__desc">
        {`${photoDesc || 'No Description'}`}
      </p>
      <div className="photo-card-self__badge-wrap">
        {tags.map((item, i) => {
          if (i < 3) {
            return (
              <Tag
                key={item.title}
                onClick={() => onSearchTagValue(item.title, 'tags')}
                className="photo-card-self__badge"
              >
                {item.title}
              </Tag>
            );
          }
          return null;
        })}
        {tags.length > 3 && (
          <Popover
            placement="top"
            title="Remaining tags"
            content={(
              <div>
                {tags.map((item, i) => {
                  if (i > 2) {
                    return (
                      <Tag
                        key={item.title}
                        onClick={() => onSearchTagValue(item.title, 'tags')}
                        className="photo-card-self__badge"
                      >
                        {item.title}
                      </Tag>
                    );
                  }
                  return null;
                })}
              </div>
            )}
            trigger="click"
          >
            <Tag className="photo-card-self__badge">more tags...</Tag>
          </Popover>
        )}
      </div>
    </Card>
  </div>
));

PhotoCard.propTypes = {
  photoName: PropTypes.string,
  photoDesc: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object),
  userAvatar: PropTypes.string,
  onSearchTagValue: PropTypes.func,
  photoID: PropTypes.string,
  userID: PropTypes.string,
};
PhotoCard.defaultProps = {
  photoName: '',
  photoDesc: '',
  title: 'Noname',
  tags: [],
  userAvatar: '',
  photoID: '',
  userID: '',
  onSearchTagValue: () => {},
};

export default PhotoCard;
