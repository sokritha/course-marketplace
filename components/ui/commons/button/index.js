export default function Button({
  type,
  label,
  size,
  Icon,
  handleOnAction,
  ...otherProps
}) {
  const variant = {
    primary: "btn-primary shadow-sm hover:bg-black hover:text-white",
    secondary: "btn-secondary shadow-sm hover:bg-black hover:text-white",
    red: "btn-red shadow-sm hover:bg-red-500 hover:text-white",
    green: "btn-green shadow-sm hover:bg-green-500 hover:text-white",
  };

  const SIZES = {
    big: "py-3 px-6",
    small: "py-2 px-4",
  };
  
  return (
    <>
      {Icon ? (
        <button
          type="button"
          className={`flex items-center justify-center btn disabled:opacity-50 disabled:cursor-not-allowed ${variant[type]} ${SIZES[size]}`}
          onClick={handleOnAction}
          {...otherProps}
        >
          <span>{label}</span>
          <Icon className="w-6 ml-2" />
        </button>
      ) : (
        <button
          type="button"
          className={`btn disabled:opacity-50 disabled:cursor-not-allowed ${variant[type]} ${SIZES[size]}`}
          onClick={handleOnAction}
          {...otherProps}
        >
          {label}
        </button>
      )}
    </>
  );
}
