const SIZES = {
  lg: "mt-16 mb-16",
  md: "mt-8 mb-8",
  sm: "mt-4 mb-4",
};

export default function Divider({ size = "lg" }) {
  const dividerSize = SIZES[size];

  return <div className={`w-full ${dividerSize}`} />;
}
