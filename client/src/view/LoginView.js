import AppLayout from '../components/AppLayout/AppLayout';

export const LoginView = () => (
  <AppLayout>
    <div>
      Just nu kan du endast logga in på följande vis:
      <a href="/auth/google">Login with Google</a>
    </div>
  </AppLayout>
);

export default LoginView;
