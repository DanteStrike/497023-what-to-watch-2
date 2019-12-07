import React from "react";
import renderer from "react-test-renderer";
import AddReviewForm from "./add-review-form";


it(`Render correctly Logo component`, () => {
  const component = renderer
    .create(
        <AddReviewForm
          isSubmitting={false}
          toggleFormLock={jest.fn()}
          postComment={jest.fn()}
          serverError={{
            isError: false,
            msg: ``
          }}
          score={1}
          setScore={jest.fn()}
          comment="comment"
          setComment={jest.fn()}
          validateComment={jest.fn()}
          commentValidation={{
            isValid: true,
            msg: ``
          }}
          resetValidation={jest.fn()}
        />
    ).toJSON();

  expect(component).toMatchSnapshot();
});
