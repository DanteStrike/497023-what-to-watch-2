import React from "react";

const withTabs = (tabs) => (WrappedComponent) => {
  class WithTabs extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        curTabID: 0
      };

      this._renderTabs = this._renderTabs.bind(this);
    }

    _navLinkClickHandler(evt, id) {
      evt.preventDefault();
      this.setState({curTabID: id});
    }

    _renderTabs(film) {
      const {curTabID} = this.state;
      const OutputTabComponent = tabs[curTabID].output;

      return (
        <div className="movie-card__desc">
          <nav className="movie-nav movie-card__nav">
            <ul className="movie-nav__list">
              {tabs.map((tab, index) => (
                <li key={`${index}_${tab.name}`} className={`movie-nav__item ${index === curTabID ? `movie-nav__item--active` : ``}`}>
                  <a href="#" className="movie-nav__link" onClick={(evt) => this._navLinkClickHandler(evt, index)}>{tab.name}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>{<OutputTabComponent {...film}/>}</div>
        </div>
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          renderTabs={(film) => this._renderTabs(film)}
        />
      );
    }
  }

  WithTabs.propTypes = {};

  return WithTabs;
};


export default withTabs;
