const Header: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
> = (props) => {
  return (
    <h1 {...props} className="text-black text-6xl font-medium">
      {props.children}
    </h1>
  );
};

export default Header;
