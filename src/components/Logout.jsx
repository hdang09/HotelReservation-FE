import { GoogleLogout } from 'react-google-login';
import config from '../config';
import { signOut } from '../app/authSlice';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();

  const onLogoutSuccess = (response) => {
    dispatch(signOut());
  };
  return (
    <GoogleLogout
      clientId={config.CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={onLogoutSuccess}
      onFailure={(e) => console.log(e)}
      render={({ disabled, onClick }) => {
        return (
          <span onClick={onClick} disabled={disabled} className="leading-10">
            Log out
          </span>
        );
      }}
    />
  );
};

export default Logout;
