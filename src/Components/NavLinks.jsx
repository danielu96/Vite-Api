import { NavLink } from 'react-router-dom';
const links = [
    { id: 1, url: '/', text: 'home' },    
    { id: 2, url: 'users', text: 'users' },
    { id: 3, url: 'jobs', text: 'jobs' },
    { id: 4, url: 'tasks', text: 'tasks' },
    { id: 5, url: 'test', text: 'test' },   
    { id: 6, url: 'newsletter', text: 'newsletter' },
    { id: 7, url: 'stat', text: 'stat' },
    { id: 8, url: 'calendar', text: 'calendar' },
    { id: 9, url: 'appointments', text: 'appointments' },
    { id: 10, url: 'visits', text: 'visits' },
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