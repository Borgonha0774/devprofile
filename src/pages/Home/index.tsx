import React from 'react';
import {
  Container,
  Header,
  Icon,
  LogoutButton,
  UseGreeting,
  UserAvatar,
  UserAvatarButton,
  UserInfo,
  UserInfoDetatil,
  UserName,
  UserWrapper,
} from './styles';
import avatarDefault from '../../assets/avatar02.png';
import { useAuth } from '../../context/AuthContext';
import { Alert } from 'react-native';

export const Home: React.FunctionComponent = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sair?', 'Deseja realmente sair da aplicação?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: () => signOut(),
      },
    ]);
  };
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton
              onPress={() => {
                console.log('Clicando aqui');
              }}
            >
              <UserAvatar
                source={
                  user.avatar_url ? { uri: user.avatar_url } : avatarDefault
                }
              />
            </UserAvatarButton>
            <UserInfoDetatil>
              <UseGreeting>Olá,</UseGreeting>
              <UserName>{user.name}</UserName>
            </UserInfoDetatil>
          </UserInfo>
          <LogoutButton onPress={handleSignOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
    </Container>
  );
};
