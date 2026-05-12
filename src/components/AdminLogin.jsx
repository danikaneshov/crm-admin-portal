import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Стейт для вывода ошибок
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const performLogin = async (loginEmail, loginPassword) => {
    setError('');
    setIsLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCred.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().role === 'superadmin') {
        navigate('/superadmin');
        return;
      }

      const q = query(collection(db, 'outlets'), where('ownerUid', '==', user.uid));
      const snap = await getDocs(q);
      
      if (!snap.empty) {
        const outletsList = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        if (outletsList.length > 1) {
          navigate('/select-outlet');
        } else {
          const outlet = outletsList[0];
          if (outlet.slug) {
            navigate(`/${outlet.slug}/admin`);
          } else {
            setError('Ошибка: точка не настроена (нет slug).');
          }
        }
      } else {
        setError('У вас нет привязанных точек. Обратитесь к суперадмину.');
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError('Неверный email или пароль');
      } else {
        setError('Произошла ошибка при входе');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    performLogin(email, password);
  };

  const handleDemoLogin = () => {
    performLogin('demo@hookabase.com', 'hookabase2026');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-50 px-4 py-2 rounded-lg mb-4 border border-blue-100">
            <span className="font-bold text-xl tracking-wide text-blue-600">HookaBase Admin</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Вход в панель</h2>
        </div>

        {/* Блок вывода ошибки */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="admin@unitu.kz"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl shadow-sm transition-colors mt-4 disabled:bg-slate-300"
          >
            {isLoading ? 'Вход...' : 'Войти в свой аккаунт'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">или</span>
            </div>
          </div>

          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full mt-6 bg-blue-50 hover:bg-blue-100 text-blue-600 font-black py-3 rounded-xl shadow-sm border border-blue-200 transition-colors disabled:opacity-50"
          >
            🚀 Попробовать Демо-доступ
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;