import LoginForm from './components/LoginForm';
import LoginBranding from './components/LoginBranding';

export default function SignUpLoginPage() {
  return (
    <div className="min-h-screen bg-background flex">
      <LoginBranding />
      <LoginForm />
    </div>
  );
}