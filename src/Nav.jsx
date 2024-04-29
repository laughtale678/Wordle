

function Nav({setPage}) {

  return (
    <ul className='nav'>
        <li><a href='#' className="nav__link" onClick={()=>{setPage('game')}}>Game</a></li>
        <li><a href='#' className="nav__link" onClick={()=>{setPage('ranking')}}>Ranking</a></li>
    </ul>
  )
}

export default Nav;