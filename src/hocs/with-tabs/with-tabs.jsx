import React from "react";

const withTabs = (tabs) => (WrappedComponent) => {
  class WithTabs extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        curTabID: 0
      };

      this._renderTabs = this._renderTabs.bind(this);
      this._resetTabs = this._resetTabs.bind(this);
    }

    _handleNavLinkClick(evt, id) {
      evt.preventDefault();
      this.setState({curTabID: id});
    }

    _resetTabs() {
      this.setState({curTabID: 0});
    }

    _renderTabs(tabsProps) {
      const {curTabID} = this.state;

      const curTab = tabs[curTabID];
      const OutputTabComponent = curTab.Output;
      const tabProps = {[curTab.requiredPropName]: tabsProps[curTabID]};

      return (
        <div className="movie-card__desc">
          <nav className="movie-nav movie-card__nav">
            <ul className="movie-nav__list">
              {tabs.map((tab, index) => (
                <li key={`${index}_${tab.name}`} className={`movie-nav__item ${index === curTabID ? `movie-nav__item--active` : ``}`}>
                  <a href="#" className="movie-nav__link" onClick={(evt) => this._handleNavLinkClick(evt, index)}>{tab.name}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>{<OutputTabComponent {...tabProps}/>}</div>
        </div>
      );
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          resetTabs={this._resetTabs}
          renderTabs={(...arg) => this._renderTabs(...arg)}
        />
      );
    }
  }

  WithTabs.propTypes = {};

  return WithTabs;
};


export default withTabs;
