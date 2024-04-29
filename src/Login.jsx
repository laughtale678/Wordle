import { useState } from 'react';


function LoginForm({ onLogin }) {

  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    onLogin(username);
  }

  return (
      <>
        <h2 className="login__title">Login</h2>
        <form className="login__form" onSubmit={onSubmit}>
          <label>
            <span>Username:</span>
            <input className="login__username" value={username} onChange={onChange}/>
          </label>
          <button className="form__button" type="submit">Login</button>
        </form>
      </>
  );

}

export default LoginForm;