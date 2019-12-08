import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import AddReviewForm from "./add-review-form.jsx";

Enzyme.configure({adapter: new Adapter()});

describe(`Component AddReviewForm should work correctly`, () => {
  let component;
  const toggleFormLockMock = jest.fn();
  const postCommentMock = jest.fn();
  const setScoreMock = jest.fn();
  const setCommentMock = jest.fn();
  const validateCommentMock = jest.fn();
  const resetValidationMock = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    component = shallow(
        <AddReviewForm
          isSubmitting={false}
          toggleFormLock={toggleFormLockMock}
          postComment={postCommentMock}
          serverError={{
            isError: false,
            msg: ``
          }}
          score={-1}
          setScore={setScoreMock}
          comment=""
          setComment={setCommentMock}
          validateComment={validateCommentMock}
          commentValidation={{
            isValid: true
          }}
          resetValidation={resetValidationMock}
        />
    );
  });

  it(`Should init comment validation state`, () => {
    expect(validateCommentMock).toHaveBeenCalledTimes(1);
  });

  it(`Should unlock form correctly`, () => {
    expect(toggleFormLockMock).not.toHaveBeenCalled();
    component.setProps({isSubmitting: true});
    component.update();
    expect(toggleFormLockMock).not.toHaveBeenCalled();
    component.setProps({serverError: {
      isError: true,
      msg: ``
    }});
    expect(toggleFormLockMock).toHaveBeenCalledTimes(1);
    component.setProps({serverError: {
      isError: false,
      msg: ``
    }});
    expect(toggleFormLockMock).toHaveBeenCalledTimes(1);
  });

  it(`Should handle inputs change correctly`, () => {
    const ratingInputEvt = {
      target: {
        name: `rating`,
        value: `3`
      }
    };
    component.find(`#star-3`).simulate(`change`, ratingInputEvt);
    expect(setScoreMock).toHaveBeenCalledTimes(1);
    expect(setScoreMock).toHaveBeenLastCalledWith(3);

    const reviewInputEvt = {
      target: {
        name: `review-text`,
        value: `review`
      }
    };
    component.find(`.add-review__textarea`).simulate(`change`, reviewInputEvt);
    expect(setCommentMock).toHaveBeenCalledTimes(1);
    expect(setCommentMock).toHaveBeenLastCalledWith(`review`, validateCommentMock);
  });

  it(`Should render submit btn if all isValid`, () => {
    component.setProps({score: 0});
    component.setProps({commentValidation: {isValid: false}});
    expect(component.find(`.add-review__btn`)).toHaveLength(0);
    component.setProps({score: -1});
    component.setProps({commentValidation: {isValid: true}});
    expect(component.find(`.add-review__btn`)).toHaveLength(0);
    component.setProps({score: -1});
    component.setProps({commentValidation: {isValid: false}});
    expect(component.find(`.add-review__btn`)).toHaveLength(0);
    component.setProps({score: 0});
    component.setProps({commentValidation: {isValid: true}});
    expect(component.find(`.add-review__btn`)).toHaveLength(1);
  });

  it(`Should handle form submit correctly`, () => {
    const evt = {
      preventDefault: jest.fn()
    };
    component.setProps({score: 5});
    component.setProps({comment: `review`});
    component.find(`.add-review__form`).simulate(`submit`, evt);
    expect(evt.preventDefault).toHaveBeenCalledTimes(1);
    expect(toggleFormLockMock).toHaveBeenCalledTimes(1);
    expect(postCommentMock).toHaveBeenCalledTimes(1);
    expect(postCommentMock).toHaveBeenLastCalledWith(5, `review`);
  });
});
