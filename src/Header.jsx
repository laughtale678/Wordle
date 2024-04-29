import Nav from "./Nav";

function Header({setPage}) {
  return (
    <header className="header">
      <h1 className="header__title">Wordle</h1>
      <Nav setPage={setPage}/>
    </header>
  );
}

export default Header;
