import PropTypes from "prop-types";

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const dataType = { data: PropTypes.arrayOf(ingredientType).isRequired };

export const modalType = {
  onClose: PropTypes.func.isRequired,
};

export const ingredientCategoryType = {
  tabRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
