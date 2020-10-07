import SignUpEntity from '../SignUpEntity';
import AuthEntity from '../AuthEntity';

interface RegistrationState {
  signup: SignUpEntity;
  authInfo: AuthEntity;
}

export default RegistrationState;
