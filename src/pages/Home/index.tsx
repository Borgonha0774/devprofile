import React from 'react';
import {
  Container,
  Header,
  Icon,
  UseGreeting,
  UserAvatar,
  UserAvatarButton,
  UserInfo,
  UserInfoDetatil,
  UserName,
  UserWrapper,
} from './styles';
import avatarDefault from '../../assets/avatar02.png';

export const Home: React.FunctionComponent = () => {
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
              <UserAvatar source={avatarDefault} />
            </UserAvatarButton>
            <UserInfoDetatil>
              <UseGreeting>Olá,</UseGreeting>
              <UserName>Seu Jorge</UserName>
            </UserInfoDetatil>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
};
