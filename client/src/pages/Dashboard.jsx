import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  ArrowRight, 
  Sprout, 
  GraduationCap, 
  Users, 
  Wallet, 
  Landmark, 
  BookOpen,
  TrendingUp,
  ArrowDownRight, 
  ArrowUpRight 
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useSupabase } from '../context/SupabaseContext';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { supabase, user } = useSupabase();
  const { t } = useTranslation();
  const [stats, setStats] = React.useState([
    { title: 'Total Balance', amount: '₹0', trend: '0%', isPositive: true, icon: Wallet },
    { title: 'Active Savings', amount: '₹0', trend: '0%', isPositive: true, icon: TrendingUp },
    { title: 'Active Loans', amount: '₹0', trend: '0%', isPositive: false, icon: Landmark },
  ]);

  React.useEffect(() => {
    const fetchStats = async () => {
      if (!supabase) return;
      
      let query = supabase.from('user_stats').select('*');
      if (user) {
        query = query.eq('user_id', user.id);
      }
      
      const { data, error } = await query.limit(1).maybeSingle();
      
      if (data) {
        setStats([
          { title: 'Total Balance', amount: `₹${data.total_balance}`, trend: '+12%', isPositive: true, icon: Wallet },
          { title: 'Active Savings', amount: `₹${data.active_savings}`, trend: '+5%', isPositive: true, icon: TrendingUp },
          { title: 'Active Loans', amount: `₹${data.active_loans}`, trend: '-2%', isPositive: false, icon: Landmark },
        ]);
      }
    };
    
    fetchStats();
  }, [supabase, user]);

  return (
    <div className="dashboard-container animate-fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">{t("Namaste, User! 🙏")}</h1>
          <p className="text-muted mt-2">{t("Here's your financial overview for today.")}</p>
        </div>
        <Button variant="primary" className="voice-guide-btn">
          <Mic size={20} />
          <span>{t("Voice Guide")}</span>
        </Button>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <Card key={idx} className="stat-card">
            <CardContent className="stat-content">
              <div className="stat-icon-wrapper">
                <stat.icon size={24} className="stat-icon" />
              </div>
              <div className="stat-details">
                <p className="stat-title">{t(stat.title)}</p>
                <h3 className="stat-amount">{stat.amount}</h3>
                <div className={`stat-trend ${stat.isPositive ? 'text-success' : 'text-danger'}`}>
                  {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span>{stat.trend} {t("from last month")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="section-title mt-6 mb-4">{t("Explore FinSaathi")}</h2>

      {/* Services Grid */}
      <div className="services-grid">
        <Card className="service-card" onClick={() => navigate('/my-money')}>
          <CardContent className="service-content">
            <div className="service-icon-box bg-blue">
              <Wallet size={28} className="text-primary" />
            </div>
            <h3 className="service-title">{t("My Money")}</h3>
            <p className="service-desc">{t("Track savings, log expenses, and manage finances.")}</p>
            <div className="service-action">
              <span>{t("Explore")}</span>
              <ArrowRight size={16} />
            </div>
          </CardContent>
        </Card>

        <Card className="service-card" onClick={() => navigate('/shg')}>
          <CardContent className="service-content">
            <div className="service-icon-box bg-emerald">
              <Users size={28} className="text-success" />
            </div>
            <h3 className="service-title">{t("Women & SHGs")}</h3>
            <p className="service-desc">{t("Manage SHG ledgers and track chit fund rotations.")}</p>
            <div className="service-action text-success">
              <span>{t("Explore")}</span>
              <ArrowRight size={16} />
            </div>
          </CardContent>
        </Card>

        <Card className="service-card" onClick={() => navigate('/schemes')}>
          <CardContent className="service-content">
            <div className="service-icon-box bg-amber">
              <Sprout size={28} className="text-amber" />
            </div>
            <h3 className="service-title">{t("For Farmers")}</h3>
            <p className="service-desc">{t("Find agri loans, subsidies, and scheme matches.")}</p>
            <div className="service-action text-amber">
              <span>{t("Explore")}</span>
              <ArrowRight size={16} />
            </div>
          </CardContent>
        </Card>

        <Card className="service-card" onClick={() => navigate('/loans')}>
          <CardContent className="service-content">
            <div className="service-icon-box bg-purple">
              <GraduationCap size={28} className="text-purple" />
            </div>
            <h3 className="service-title">{t("For Youth")}</h3>
            <p className="service-desc">{t("Discover education loans and job opportunities.")}</p>
            <div className="service-action text-purple">
              <span>{t("Explore")}</span>
              <ArrowRight size={16} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="service-card" onClick={() => navigate('/schemes')}>
          <CardContent className="service-content">
            <div className="service-icon-box bg-red">
              <Landmark size={28} className="text-danger" />
            </div>
            <h3 className="service-title">{t("Govt Schemes")}</h3>
            <p className="service-desc">{t("Access state and central subsidies tailored for you.")}</p>
            <div className="service-action text-danger">
              <span>{t("Explore")}</span>
              <ArrowRight size={16} />
            </div>
          </CardContent>
        </Card>

        <Card className="service-card" onClick={() => navigate('/learn')}>
          <CardContent className="service-content">
            <div className="service-icon-box bg-teal">
              <BookOpen size={28} className="text-teal" />
            </div>
            <h3 className="service-title">{t("Learn & Earn")}</h3>
            <p className="service-desc">{t("Improve financial literacy and earn reward points.")}</p>
            <div className="service-action text-teal">
              <span>{t("Explore")}</span>
              <ArrowRight size={16} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
