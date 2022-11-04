import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { api } from '../services/api';
import { IUser } from '../model/user';

interface IAuthState {
  token: string;
  user: IUser;
}

interface ICredentials {
  email: string;
  password: string;
}

interface IAuthContext {
  user: IUser;
  signIn(credentials: ICredentials): void;
  signOut(): void;
}

interface IProps {
  children: React.ReactElement;
}

export const AuthContext = React.createContext<IAuthContext>(
  {} as IAuthContext,
);

const tokenData = '@DevProfile:token';
const userData = '@DevProfile:user';

export const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [data, setData] = React.useState<IAuthState>({} as IAuthState);

  React.useEffect(() => {
    async function loadAuthdata() {
      const token = await AsyncStorage.getItem(tokenData);
      const user = await AsyncStorage.getItem(userData);
      if (token && user) {
        setData({ token, user: JSON.parse(user) });
      }
    }
    loadAuthdata();
  });
  /* Rota para abrir uma sessão */
  const signIn = async ({ email, password }: ICredentials) => {
    try {
      const response = await api.post('sessions', { email, password });
      const { token, user } = response.data;

      await AsyncStorage.setItem(tokenData, token);
      await AsyncStorage.setItem(userData, JSON.stringify(user));
      setData({ token, user });
    } catch (error) {
      /* throw new Error(error as string); */
      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro ao fazer login. verifique as credenciais',
      );
    }
  };

  /*  Ao sair do app é removido as informações que esta em memoria e no storage */
  const signOut = async () => {
    await AsyncStorage.removeItem(tokenData);
    await AsyncStorage.removeItem(userData);
    setData({} as IAuthState);
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado em um AuthProvider');
  }

  return context;
};
