import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SupabaseContext = createContext({});

export const SupabaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Custom login helper
  const login = (token, userProfile) => {
    localStorage.setItem('finsaathi_token', token);
    localStorage.setItem('finsaathi_user', JSON.stringify(userProfile));
    setUser(userProfile);
    setSession({ access_token: token, user: userProfile });
  };

  // Custom logout helper
  const logout = () => {
    localStorage.removeItem('finsaathi_token');
    localStorage.removeItem('finsaathi_user');
    setUser(null);
    setSession(null);
  };

  useEffect(() => {
    // 1. Check custom JWT authentication session first
    const storedToken = localStorage.getItem('finsaathi_token');
    const storedUser = localStorage.getItem('finsaathi_user');

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setSession({ access_token: storedToken, user: parsedUser });
        setLoading(false);
        return;
      } catch (err) {
        console.error('Failed to parse stored user session:', err);
        logout();
      }
    }

    // 2. Fallback to Supabase native auth
    supabase.auth.getSession().then(({ data: { session: sbSession } }) => {
      if (sbSession) {
        setSession(sbSession);
        setUser(sbSession.user ?? null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sbSession) => {
      if (sbSession) {
        setSession(sbSession);
        setUser(sbSession.user ?? null);
      } else {
        // Only clear if we aren't using our custom session
        if (!localStorage.getItem('finsaathi_token')) {
          setSession(null);
          setUser(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SupabaseContext.Provider value={{ user, session, loading, supabase, login, logout }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};
