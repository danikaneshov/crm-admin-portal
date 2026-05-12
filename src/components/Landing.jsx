import { useNavigate } from 'react-router-dom';
import { ArrowRight, BarChart3, Users, PackageSearch, Smartphone, ShieldCheck } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">H</div>
          <span className="text-xl font-black tracking-tighter">HookaBase<span className="text-blue-500">.</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/login')}
            className="text-sm font-bold text-slate-300 hover:text-white transition-colors"
          >
            Вход
          </button>
          <button 
            onClick={() => navigate('/demo')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-sm font-bold backdrop-blur-md transition-all"
          >
            Попробовать Демо
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 px-6 pt-20 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-8 uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Новая версия 2026
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight max-w-4xl">
          Умная CRM для <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">современных</span> заведений
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-medium">
          Управляйте сменами, персоналом, складом и финансами в едином премиальном интерфейсе. Создано специально для контроля кальянного бизнеса.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button 
            onClick={() => navigate('/demo')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1"
          >
            Интерактивное Демо <ArrowRight size={20} />
          </button>
          <button 
            onClick={() => navigate('/admin/login')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white rounded-2xl font-bold text-lg transition-all"
          >
            Войти в систему
          </button>
        </div>

        {/* Feature Cards Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[32px] text-left hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Детальная аналитика</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Отслеживайте выручку, маржинальность и расходники в реальном времени. Принимайте решения на основе точных цифр.
            </p>
          </div>
          
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[32px] text-left hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Прозрачный расчет ЗП</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Автоматический расчет базовых окладов, ставок за чашки и процента с бара. Забудьте о ручных таблицах.
            </p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-[32px] text-left hover:border-slate-700 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
              <PackageSearch size={24} />
            </div>
            <h3 className="text-xl font-bold mb-3">Умный склад</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Точный учет табака и угля до грамма. Система сама предупредит, когда запасы подходят к концу.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 text-center py-8 text-slate-500 text-sm font-medium">
        © 2026 HookaBase. Все права защищены.
      </footer>
    </div>
  );
};

export default Landing;
