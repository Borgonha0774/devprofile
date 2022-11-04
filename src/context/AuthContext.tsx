import React from 'react';
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
  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
