import './Header.css';
import MenuHamburgesa from '../assets/hamburger.svg'

function Header() {

  return (
     <>
    <header className='main'>
        <nav className='nav'>
            <ul className='lista'>
              <a className='logo__header' href="">TomasH</a>
                <li><a className='izdadcha' href="">Peliculas</a></li>
                <li><a className='izdadcha' href="">Favoritos</a></li>
                <li><a className='izdadcha' href="">Contacto</a></li>
            </ul>
            <img src={MenuHamburgesa} className='MenuHamburgesa' alt="" />
        </nav>
    </header>
     </>
  );
}

export default Header;
