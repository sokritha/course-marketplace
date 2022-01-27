import { Button, Message } from "@components/ui/commons";
import { Dialog } from "@headlessui/react";
import { useEthPrice } from "@components/hooks/useEthPrice";
import { useEffect, useState } from "react";

const defaultOrder = {
  price: "",
  email: "",
  confirmationEmail: "",
};

const _createFormState = (isDisabled = false, message = "") => ({
  isDisabled,
  message,
});

const createFormState = (
  { price, email, confirmationEmail },
  hasAgreedTOS,
  isNewPurchase
) => {
  if (!price || Number(price) <= 0)
    return _createFormState(true, "Price is not valid.");

  if (isNewPurchase) {
    if (confirmationEmail.length === 0 || email.length === 0)
      return _createFormState(true, "");
    else if (email !== confirmationEmail)
      return _createFormState(true, "Email are not matching.");
  }

  if (!hasAgreedTOS)
    return _createFormState(
      true,
      "You need to agree with terms of service in order to submi the form."
    );
  return _createFormState;
};

export default function OrderModal({
  course,
  handleOnClose,
  handleOnSubmit,
  isNewPurchase,
}) {
  const [order, setOrder] = useState(defaultOrder);
  const { eth } = useEthPrice();
  const [enablePrice, setEnablePrice] = useState(false);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);

  useEffect(() => {
    setOrder({
      ...defaultOrder,
      price: eth.perItem,
    });

    return () => {
      setOrder(defaultOrder);
      setEnablePrice(false);
      setHasAgreedTOS(false);
    };
  }, []);

  const formState = createFormState(order, hasAgreedTOS, isNewPurchase);

  return (
    <div className="inline-block align-bottom rounded-sm text-left overflow-hidden phone:align-middle phone:max-w-lg phone:w-full">
      <div className="px-4 phone:p-6 phone:pb-4">
        <div className="phone:flex phone:items-start">
          <div className="mt-3 phone:mt-0 phone:ml-4 phone:text-left">
            <Dialog.Title
              className="mb-7 text-lg font-bold leading-6 text-gray-900"
              id="modal-title"
            >
              {course.title}
            </Dialog.Title>
            <div className="mt-1 relative rounded-md">
              <div className="mb-1">
                <label className="mb-2 font-bold">Price(eth)</label>
                <div className="text-xs text-gray-700 flex">
                  <label className="flex items-center mr-2">
                    <input
                      checked={enablePrice}
                      onChange={({ target: { checked } }) => {
                        setOrder({
                          ...order,
                          price: checked ? order.price : eth.perItem,
                        });
                        setEnablePrice(checked);
                      }}
                      type="checkbox"
                      className="form-checkbox"
                    />
                  </label>
                  <span>Adjust Price - only when the price is not correct</span>
                </div>
              </div>
              <input
                disabled={!enablePrice}
                value={order.price}
                onChange={({ target: { value } }) => {
                  if (isNaN(value)) return;
                  setOrder({
                    ...order,
                    price: value,
                  });
                }}
                type="text"
                name="price"
                id="price"
                className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
              />
              <p className="text-xs text-gray-700">
                Price will be verified at the time of the order. If the price
                will be lower, order can be declined (+- 2% slipage is allowed)
              </p>
            </div>

            {isNewPurchase && (
              <>
                <div className="mt-2 relative rounded-md">
                  <div className="mb-1">
                    <label className="mb-2 font-bold">Email</label>
                  </div>
                  <input
                    onChange={({ target: { value } }) => {
                      setOrder({
                        ...order,
                        email: value.trim(),
                      });
                    }}
                    type="email"
                    name="email"
                    id="email"
                    className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 phone:text-sm border-gray-300 rounded-md"
                    placeholder="x@y.com"
                  />
                  <p className="text-xs text-gray-700 mt-1">
                    It&apos;s important to fill a correct email, otherwise the
                    order cannot be verified. We are not storing your email
                    anywhere
                  </p>
                </div>
                <div className="my-2 relative rounded-md">
                  <div className="mb-1">
                    <label className="mb-2 font-bold">Repeat Email</label>
                  </div>
                  <input
                    onChange={({ target: { value } }) => {
                      setOrder({
                        ...order,
                        confirmationEmail: value.trim(),
                      });
                    }}
                    type="email"
                    name="confirmationEmail"
                    id="confirmationEmail"
                    className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 phone:text-sm border-gray-300 rounded-md"
                    placeholder="x@y.com"
                  />
                </div>
              </>
            )}

            <div className="text-xs text-gray-700 flex mt-5">
              <label className="flex items-center mr-2">
                <input
                  checked={hasAgreedTOS}
                  onChange={({ target: { checked } }) => {
                    setHasAgreedTOS(checked);
                  }}
                  type="checkbox"
                  className="form-checkbox"
                />
              </label>
              <span>
                I accept CourseHub &apos;terms of service&apos; and I agree that
                my order can be rejected in the case data provided above are not
                correct
              </span>
            </div>
            {formState.message && (
              <>
                <div className="mt-3" />
                <Message type="danger">{formState.message}</Message>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 px-4 py-3 phone:px-6 phone:flex">
        <Button
          disabled={formState.isDisabled}
          type="primary"
          label="Submit"
          size="big"
          handleOnAction={() => {
            handleOnSubmit(order);
          }}
        />
        <div className="w-2" />
        <Button
          type="red"
          label="Cancel"
          size="big"
          handleOnAction={handleOnClose}
        />
      </div>
    </div>
  );
}
