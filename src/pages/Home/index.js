import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import {
  cardsPhotosRequestAction,
  paginationChangeAction,
  filterItemValueAction,
  searchTextAction,
  searchChangeInputValueAction,
} from '../../actions';
import {
  Search,
  PhotoCard,
  NavTop,
  Spinner,
} from '../../components';
import 'antd/dist/antd.css';
import './index.scss';

class Home extends PureComponent {
  componentDidUpdate = (prevProps) => {
    const { cardsData, cardsPhotosRequestAction: handleAction } = this.props;
    if (prevProps.cardsData !== cardsData) handleAction(cardsData);
  };

  componentDidMount = () => {
    this.handleCardsPhotos();
  };

  handleCardsPhotos = () => {
    const { cardsData, cardsPhotosRequestAction: handleAction } = this.props;
    handleAction(cardsData);
  };

  handlePaginationChange = (currentPage) => {
    const { paginationChangeAction: handleAction } = this.props;
    handleAction(currentPage);
  };

  handleFilterItemValue = (itemText, itemId) => {
    const { filterItemValueAction: handleAction } = this.props;
    handleAction(itemText, itemId);
  };

  handleSearchText = (text, tags) => {
    const { searchTextAction: handleAction } = this.props;
    handleAction(text, tags);
  }

  handleChangeInputValue = (text) => {
    const { searchChangeInputValueAction: handleAction } = this.props;
    handleAction(text);
  }

  render() {
    const {
      filters,
      isListingLoading,
      cards,
      totalCards,
      cardsData,
      navTopItemActive,
      photolistingRequestError,
    } = this.props;
    if (photolistingRequestError) return <div>Error loading photolisting</div>;
    return (
      <div className="App">
        { isListingLoading && (<Spinner className="spinner" />)}
        <div className="row">
          <div className="col-12">
            <Search
              onSearchInputValue={this.handleSearchText}
              onChangeInputValue={this.handleChangeInputValue}
              queryText={cardsData.query}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <ul className="nav-top">
              {filters.map(item => (
                <li key={item.id} className={`nav-top__item ${item.border ? 'nav-top__item_border-right' : ''}`}>
                  <NavTop
                    navTopItemActive={navTopItemActive}
                    itemId={item.id}
                    onFilterItemValue={this.handleFilterItemValue}
                    key={item.id}
                    label={item.label}
                    filterValue={item.filterValue}
                  />
                </li>
              ))
              }
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {!isListingLoading && (
              <ul className="photo-list">
                {
                cards.map(item => (
                  <li key={item.id} className="photo-list__item pl-3">
                    <PhotoCard
                      photoName={item.urls.thumb}
                      photoDesc={item.description}
                      title={item.user.first_name}
                      tags={item.tags}
                      photoID={item.id}
                      userID={item.user.username}
                      userAvatar={item.user.profile_image.small}
                      onSearchTagValue={this.handleSearchText}
                    />
                  </li>
                ))
                }
              </ul>
            )
            }
            {!totalCards && (<h2 className="cards__text-empty pl-3">No images were found for your request. Try to find more.</h2>)}
          </div>
        </div>
        <div className="row">
          <div className="col-12 pagination">

            {totalCards > cardsData.per_page && (
              <Pagination
                className="ml-3"
                showSizeChanger
                onChange={this.handlePaginationChange}
                current={cardsData.page}
                defaultCurrent={1}
                total={totalCards}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  cardsPhotosRequestAction: PropTypes.func,
  paginationChangeAction: PropTypes.func,
  filterItemValueAction: PropTypes.func,
  searchTextAction: PropTypes.func,
  searchChangeInputValueAction: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    filterValue: PropTypes.string,
  })),
  cardsData: PropTypes.shape({
    query: PropTypes.string,
    page: PropTypes.number,
    per_page: PropTypes.number,
  }),
  totalCards: PropTypes.number,
  navTopItemActive: PropTypes.number,
  cards: PropTypes.arrayOf(PropTypes.object),
  isListingLoading: PropTypes.bool,
  photolistingRequestError: PropTypes.bool,
};
Home.defaultProps = {
  cardsPhotosRequestAction: () => {},
  paginationChangeAction: () => {},
  filterItemValueAction: () => {},
  searchTextAction: () => {},
  searchChangeInputValueAction: () => {},
  filters: [],
  isListingLoading: false,
  cards: [],
  cardsData: {
    query: 'wallpapers',
    page: 1,
    per_page: 6,
  },
  totalCards: 10,
  navTopItemActive: 2,
  photolistingRequestError: false,
};

const mapStateToProps = (state) => {
  const { photolisting } = state;
  return photolisting;
};

const mapDispatchToProps = ({
  cardsPhotosRequestAction,
  paginationChangeAction,
  filterItemValueAction,
  searchTextAction,
  searchChangeInputValueAction,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
