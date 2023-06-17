import jwt_decode from 'jwt-decode';

const Header = () => {
  const isCalendarPath = window.location.pathname === '/calendar';
  const display = isCalendarPath ? 'hidden' : 'flex';

  const tokenFromLocal = JSON.stringify(localStorage.getItem('token'));
  const token = tokenFromLocal ? jwt_decode(tokenFromLocal) : null;

  const hour = new Date().getHours();
  const greetings =
    hour >= 5 && hour < 12 ? 'morning' : hour >= 12 && hour < 18 ? 'afternoon' : 'evening';

  return (
    <header className={`${display} dark:bg-slate-900 justify-between items-center p-6 md:px-12`}>
      <div className="text-black dark:text-white">
        <h1 className="text-3xl font-bold">Good {greetings}!</h1>
        <h3>Welcome back and explore our hotel</h3>
      </div>
      {/* <Input className="hidden w-[25rem] lg:block" /> */}
      <div className="hidden sm:flex items-center">
        <img src={token.picture} className="w-10 h-10 rounded-full mr-2" />
        <div>
          <h2 className="font-bold">{token.given_name}</h2>
          <p>Receptionist</p>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
