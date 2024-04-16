import { NavLink } from 'react-router-dom';
const links = [
    { id: 1, url: '/', text: 'home' },
    { id: 2, url: 'login', text: 'login' },
    { id: 3, url: 'users', text: 'users' },
    { id: 4, url: 'comments', text: 'comments' },
    { id: 5, url: 'tasks', text: 'tasks' },
    { id: 6, url: 'test', text: 'test' },   
    { id: 7, url: 'newsletter', text: 'newsletter' },
    { id: 8, url: 'stat', text: 'stat' },
  ];
  
  
  const NavLinks = () => {
       
    return (
      <>
      {links.map((link) => {
        const { id, url, text } = link;       
        return (
          <li key={id}>
            <NavLink className='capitalize' to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
    
    );
  };
  export default NavLinks;