import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  loginSchema, 
  registerSchema
} from '../schemas/auth.ts';
import { useAuth } from '../contexts/useAuth';
import { useTheme } from '../contexts/ThemeContext.tsx';
import { Input, Button } from '../components/ui';

type AuthFormData = {
  email:    string;
  password: string;
  username?: string;
};

function Auth() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { checkAuth } = useAuth();
  const from = location.state?.from?.pathname || '/';
  const [isRegister, setRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
    
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('');
     
  // async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
  //     event.preventDefault();
      
  //     if (isRegister && username.trim() === '') {
  //         alert('You must enter a username.');
  //         return ;
  //     }
  //     if (email.trim() === '' || password === '') {
  //         alert('You must fill in all the fields.')
  //         return;
  //     }
  //     if (password.length < 8) {
  //         alert('Your password must contain at least 8 characters.');
  //         return ;
  //     }
            
  const currentSchema = isRegister ? registerSchema : loginSchema;

  const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
      resolver: zodResolver(currentSchema) as Resolver<AuthFormData>,
  });


  const toggleMode = (registerMode: boolean) => {
    setRegister(registerMode);
    setServerError(null);
    reset();//vide champs + erreurs precedentes
  }

  const onSubmit = async (data: AuthFormData) => {
      //  console.log(data);
    setServerError(null);
    try {
      
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const body = isRegister 
      ? { email: data.email, userName: data.username, password: data.password } 
      : { email: data.email, password: data.password };
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include', //to save jwt in the front 
        body: JSON.stringify(body),
      });
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || 'Authentification failed');
      }
      
      if (isRegister) {
        toggleMode(false);
        alert('Account created! Please sign in.');
        return;
      }
	  
      await checkAuth();

      navigate(from, { replace: true });
    }
    catch (err: unknown) {
      if (err instanceof Error)  {
        setServerError(err.message);
      }
      else {
        setServerError('An error occured');
      }
    }
  };
          
  return (
  <main className={`min-h-screen px-4 py-16 ${isDark ?
    "bg-gradient-to-r from-violet-700 via-indigo-700 to-cyan-700" :
    "bg-gradient-to-r bg-blue-200 via-cyan-200 to-emerald-200"}`}>
    <div className="mx-auto max-w-md text-center">
      <h1 className="mb-6 text-3xl font-bold">
        {isRegister ? 'Create an account' : 'Welcome!'}
      </h1>
    </div>

    {/* Onglets  SIgn IN/ Regiter*/}
    <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg bg-indigo-950
    p-1 w-150 mx-auto max-w-md">
      <button
        type="button"
         /*onClick={() => setRegister(false)}*/
        onClick={() => toggleMode(false)}
        className={`rounded-md px-4 py-2 font-medium transition ${
          !isRegister
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        Sign in
      </button>
      <button
        type="button"
        /*onClick={() => setRegister(true)}*/
        onClick={() => toggleMode(true)}
        className={`rounded-md px-4 py-2 font-medium transition ${
          isRegister
            ? 'bg-blue-600 text-white'
            : 'text-slate-400 hover:text-white'
        }`}
      >
        Register
      </button>
    </div>

    {/* Affichage erreur serveur */}
    {serverError && (
      <div className="mx-auto mt-4 max-w-md rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-center text-sm text-red-400">
          {serverError}
        </div>
      )}

    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5 text-center">
    {isRegister && (
      <div className='mx-auto w-50'>
        <Input { ... register('username')}
          label='Username'
          type="text"
          // value={username}
          // onChange={(event) => setUsername(event.target.value)}
          placeholder="Your username"
        />
        {errors.username && (
        <p className="mt-1 text-xs text-red-400">{errors.username.message}</p>
        )}
      </div>
    )}

      <div className='mx-auto w-50'>
        <Input 
        { ... register('email')}
        label='Email'
        id="email"
        type="text"
        // value={email}
        // onChange={(event) => setEmail(event.target.value)}
        placeholder="Your email"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
      )}
      </div>

      <div className='mx-auto w-120 flex pl-35'>
        <Input 
        { ... register('password')}
        label='Password'
        id="password"
        type={showPassword ? 'text' : 'password'}
        // value={password}
        // onChange={(event) => setPassword(event.target.value)}
        placeholder="Your password" 
        />
        <Button
          type="button" variant='ghost'
          onClick={() => setShowPassword((visible) => !visible)}
          className='mt-7 text-xl pl-3'
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </Button>
          {errors.password && (
            <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      <Button
         type="submit" variant='primary'
         disabled={isSubmitting}
         className='mt-4'
      >
        {isSubmitting
        ? 'Loading...'
        : isRegister ? 'Create an account' : 'Login'}
      </Button>
    </form>
  </main>
  );
}

export default Auth;