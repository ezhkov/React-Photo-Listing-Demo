import React, { Component } from 'react';
import { Row, Col, Pagination } from 'antd';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import PhotoCard from '../../components/PhotoCard';
import './index.css';

class UserLikesPhotos extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isListingLoading: false,
      cards: [],
      totalCards: 10,
      page: 1,
      per_page: 6,
    };
  }

  componentDidMount = () => {
    this.handleUserLikesPhotosQuery();
  };

  handlePaginationChange = (current) => {
    this.setState({
      page: current,
      per_page: 6,
    }, this.handleUserLikesPhotosQuery);
  };

  handleUserLikesPhotosQuery = () => {
    const { history, userId } = this.props;
    const { page, per_page } = this.state;
    this.setState({ isListingLoading: true });
    axios.get(`${process.env.REACT_APP_UNSPLASH_API_NAME}users/${userId}/likes?`, {
      params: {
        page,
        per_page,
        client_id: process.env.REACT_APP_UNSPLASH_API_KEY,
      },
    }).then((res) => {
      const cards = res.data;
      const totalCards = parseInt(res.headers['x-total'], 10);
      this.setState({
        cards,
        isListingLoading: false,
        totalCards,
      });
    })
      .catch(() => {
        history.push('/');
      });
  }

  render() {
    const {
      isListingLoading,
      cards,
      totalCards,
      page,
      per_page,
    } = this.state;
    return (
      <div>
        { isListingLoading && (<Spinner />)}
        <div>
          <Row justify="center" style={{ margin: '20px 0' }}>
            <Col span={24}>
              {!isListingLoading && (
                <ul className="photo-list user-photos">
                  {cards.map(item => (
                    <li key={item.id} className="photo-list__item pl-3">
                      <PhotoCard
                        photoName={item.urls.regular}
                        title=""
                        tags={item.photo_tags}
                        photoID={item.id}
                        userID={item.user.username}
                        userAvatar={item.user.profile_image.small}
                        onSearchTagValue={this.handleSearchText}
                      />
                    </li>))
                  }
                </ul>)}
            </Col>
          </Row>
          <Row justify="center" style={{ display: 'flex', justifyContent: 'center' }}>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              {totalCards > per_page && (
                <Pagination
                  className="ml-3 mb-5"
                  onChange={this.handlePaginationChange}
                  showSizeChanger
                  current={page}
                  defaultCurrent={1}
                  total={totalCards}
                />)}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default UserLikesPhotos;
