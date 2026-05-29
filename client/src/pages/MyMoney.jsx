import React from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Plus, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useSupabase } from '../context/SupabaseContext';
import { useTranslation } from 'react-i18next';
import AddTransactionModal from '../components/shared/AddTransactionModal';

const MyMoney = () => {
  const { supabase, user } = useSupabase();
  const { t } = useTranslation();
  const [transactions, setTransactions] = React.useState([]);
  const [stats, setStats] = React.useState({ total_balance: 0, total_income: 0, total_expenses: 0 });
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const fetchData = async () => {
    if (!supabase) return;
    
    let txQuery = supabase.from('transactions').select('*').order('date', { ascending: false });
    
    if (user) {
      txQuery = txQuery.eq('user_id', user.id);
    }
    
    const { data: txData } = await txQuery;
    if (txData) {
      setTransactions(txData);
      
      // Calculate totals dynamically
      let totalIncome = 0;
      let totalExpenses = 0;
      
      txData.forEach(tx => {
        if (tx.is_credit) {
          totalIncome += parseFloat(tx.amount || 0);
        } else {
          totalExpenses += parseFloat(tx.amount || 0);
        }
      });
      
      setStats({
        total_balance: totalIncome - totalExpenses,
        total_income: totalIncome,
        total_expenses: totalExpenses
      });
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [supabase, user]);

  return (
    <div className="animate-fade-in flex-col gap-6" style={{ display: 'flex' }}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{t("My Money")}</h1>
          <p className="text-muted mt-2">{t("Track your daily income and expenses.")}</p>
        </div>
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} /> {t("Add Transaction")}
        </button>
      </div>

      <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted font-medium mb-2">{t("Total Balance")}</p>
            <h2 className="text-3xl font-bold text-primary">₹{stats.total_balance.toFixed(2)}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted font-medium mb-2">{t("Total Income")}</p>
                <h2 className="text-2xl font-bold text-success">₹{stats.total_income.toFixed(2)}</h2>
              </div>
              <div style={{ background: 'var(--color-secondary-subtle)', padding: '0.5rem', borderRadius: '50%', color: 'var(--color-secondary)' }}>
                <ArrowUpRight size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted font-medium mb-2">{t("Total Expenses")}</p>
                <h2 className="text-2xl font-bold text-danger">₹{stats.total_expenses.toFixed(2)}</h2>
              </div>
              <div style={{ background: 'var(--color-danger-subtle)', padding: '0.5rem', borderRadius: '50%', color: 'var(--color-danger)' }}>
                <ArrowDownRight size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center" style={{ flexDirection: 'row', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
          <CardTitle>{t("Recent Transactions")}</CardTitle>
          <button className="btn btn-ghost btn-sm">{t("View All")}</button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex-col" style={{ display: 'flex' }}>
            {transactions.length === 0 ? (
              <div className="p-6 text-center text-muted">
                {t("No transactions yet. Add one to get started!")}
              </div>
            ) : null}
            {transactions.map((tx, idx) => (
              <div key={tx.id} className="flex justify-between items-center flex-wrap" style={{ padding: '1rem 1.5rem', borderBottom: idx !== transactions.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <div className="flex items-center gap-4">
                  <div style={{ 
                    background: tx.is_credit ? 'var(--color-secondary-subtle)' : 'var(--color-danger-subtle)', 
                    color: tx.is_credit ? 'var(--color-secondary)' : 'var(--color-danger)', 
                    padding: '0.75rem', 
                    borderRadius: '50%' 
                  }}>
                    {tx.is_credit ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  </div>
                  <div>
                    <p className="font-semibold">{tx.title}</p>
                    <p className="text-xs text-muted flex items-center gap-1 mt-1"><Calendar size={12} /> {new Date(tx.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  {tx.audio_data && (
                    <audio src={tx.audio_data} controls style={{ height: '30px', maxWidth: '150px' }} />
                  )}
                  <span className={`font-bold ${tx.is_credit ? 'text-success' : 'text-danger'}`}>
                    {tx.is_credit ? '+' : '-'}₹{parseFloat(tx.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <AddTransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchData} 
      />
    </div>
  );
};

export default MyMoney;
