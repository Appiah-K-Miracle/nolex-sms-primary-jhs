"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
  online?: boolean;
  subject?: string;
  className?: string;
};

type AuthContextValue = {
  user: User | null;
  setUser: (u: User | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }){
  const [user, setUser] = useState<User | null>({ id: 'st1', name: 'Akua Owusu', email: 'akua@nolex.edu.gh', online: true, subject: 'Mathematics', className: 'JHS 2' });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(){
  const ctx = useContext(AuthContext);
  if(!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
