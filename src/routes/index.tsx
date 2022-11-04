import React from 'react';
import * as authRoute from './public/auth.route';
import { AppRoutes } from './private/app.routes';
import { useAuth } from '../context/AuthContext';

export const Routes: React.FC = () => {
  const { user } = useAuth();
  /* Aqui colocamos uma condição para o usuario acessar as rotas privadas */
  return user?.id ? <AppRoutes /> : <authRoute.AuthRoutes />;
};
