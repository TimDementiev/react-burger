import orderDetailsStyles from "./order-details.module.css";
import doneIcon from "../../images/done.svg";
import PropTypes from "prop-types";

const OrderDetails = ({orderID}) => {
  return (
    <div className={`${orderDetailsStyles.container} pl-25 pr-25`}>
      <h3
        className={`${orderDetailsStyles.title} text text_type_digits-large pt-20 pb-8`}
      >
        {orderID}
      </h3>
      <p
        className={`${orderDetailsStyles.text} text text_type_main-medium pb-15`}
      >
        идентификатор заказа
      </p>
      <img
        className={`${orderDetailsStyles.icon} pb-15`}
        src={doneIcon}
        alt={doneIcon}
      />
      <p
        className={`${orderDetailsStyles.text} text text_type_main-default pb-2`}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className={`${orderDetailsStyles.text} text text_type_main-default text_color_inactive pb-15`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  orderID : PropTypes.number
}

export default OrderDetails;
