import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withTabs from "./with-tabs.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withTabs should work correctly`, () => {
  let component;

  const tabs = [
    {
      name: `tab1`,
      output: React.createElement(() => (<div className="tab1__Output">1</div>))
    }, {
      name: `tab2`,
      output: React.createElement(() => (<div className="tab2__Output">2</div>))
    }, {
      name: `tab3`,
      output: React.createElement(() => (<div className="tab3__Output">3</div>))
    }
  ];

  const MockComponent = () => (<div/>);
  const MockComponentWrapped = withTabs(tabs)(MockComponent);

  beforeEach(() => {
    component = shallow(<MockComponentWrapped/>);
  });

  it(`Default Tab should be first`, () => {
    expect(component.state().curTabID).toBe(0);
    expect(shallow(component.instance()._renderTabs()).contains(tabs[0].output)).toEqual(true);
  });

  it(`Should preventDefault on navLink click and set new active tab`, () => {
    const evt = {preventDefault: jest.fn()};
    expect(component.instance()._navLinkClickHandler(evt, 2));
    expect(evt.preventDefault).toBeCalledTimes(1);
    expect(component.state().curTabID).toBe(2);
  });

  it(`Should render nav correctly`, () => {
    const renderedComponent = shallow(component.instance()._renderTabs());
    expect(renderedComponent.find(`.movie-nav__item`)).toHaveLength(3);
    expect(renderedComponent.find(`.movie-nav__item--active`)).toHaveLength(1);
    expect(renderedComponent.find(`.movie-nav__link`)).toHaveLength(3);
    expect(renderedComponent.find(`.movie-nav__item`).at(0).props().className).toEqual(`movie-nav__item movie-nav__item--active`);
  });

  it(`Should switch tabs`, () => {
    component.setState({curTabID: 2});
    expect(shallow(component.instance()._renderTabs()).contains(tabs[2].output)).toEqual(true);
  });
});
