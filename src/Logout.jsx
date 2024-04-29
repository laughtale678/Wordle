function Logout({ username, onLogout}) {
    function onSubmit(event) {
        event.preventDefault();
        onLogout();
    }

  return (
    <div className="logout__head">
      <h2>Welcome! {username}.</h2>
      <form className="logout__form" onSubmit={onSubmit}>
        <button type="submit" className="form__button">
          Logout
        </button>
      </form>
    </div>
  );
}

export default Logout;
