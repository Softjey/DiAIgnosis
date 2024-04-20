import logoUrl from "/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="flex w-full justify-start items-center gap-3 absolute top-0 left-0 px-10 py-5 header">
      <img src={logoUrl} alt="" />

      <h3 className="text-black text-3xl">DiAIgnosis</h3>
    </header>
  );
};

export default Header;
