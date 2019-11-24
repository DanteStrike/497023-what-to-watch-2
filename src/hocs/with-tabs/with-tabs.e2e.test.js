import React from "react";
import Enzyme, {mount, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withTabs from "./with-tabs.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`HoC withTabs should work correctly`, () => {
  let component;
  const ComponentOne = () => (<div className="tab1__Output">1</div>);
  const ComponentTwo = () => (<div className="tab2__Output">2</div>);
  const ComponentThree = () => (<div className="tab3__Output">3</div>);

  const tabs = [
    {
      name: `tab1`,
      output: ComponentOne
    }, {
      name: `tab2`,
      output: ComponentTwo
    }, {
      name: `tab3`,
      output: ComponentThree
    }
  ];

  const MockComponent = () => (<div/>);
  const MockComponentWrapped = withTabs(tabs)(MockComponent);

  beforeEach(() => {
    component = shallow(<MockComponentWrapped/>);
  });

  it(`Default Tab should be first`, () => {
    expect(component.state().curTabID).toBe(0);
    const renderedComponent = mount(component.instance()._renderTabs());
    expect(renderedComponent.find(ComponentTwo)).toHaveLength(0);
    expect(renderedComponent.find(ComponentThree)).toHaveLength(0);
    expect(renderedComponent.find(ComponentOne)).toHaveLength(1);
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
    const renderedComponent = mount(component.instance()._renderTabs());
    expect(renderedComponent.find(ComponentThree)).toHaveLength(1);
  });

  it(`Should transfer render ...arg to output component`, () => {
    const renderedComponent = mount(component.instance()._renderTabs({any: `any`, some: `some`}));
    expect(renderedComponent.find(ComponentOne).props().any).toEqual(`any`);
    expect(renderedComponent.find(ComponentOne).props().some).toEqual(`some`);
  });

  it(`Should reset state on resetTabs`, () => {
    component.setState({curTabID: 2});
    component.instance()._resetTabs();
    expect(component.state().curTabID).toBe(0);
  });
});
