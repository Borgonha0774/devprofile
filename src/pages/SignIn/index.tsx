import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from '../../services/api';

import { Button } from '../../components/Form/Button';
import {
  Container,
  Content,
  CreateAccount,
  CreateAccountTitle,
  ForgotPasswordButton,
  ForgotPasswordTitle,
  Icon,
  Logo,
  Title,
} from './styles';
import logo from '../../assets/logo.png';
import { InputControl } from '../../components/Form/InputControl';
import { AuthContext } from '../../context/AuthContext';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

interface IFormInputs {
  [name: string]: any;
}

/* Definir os squemas de validação dos campos */
const formSchema = yup.object({
  email: yup.string().email('Email inválido').required('Informe o email.'),
  password: yup.string().required('Informe a senha'),
});

export const SignIn: React.FC = () => {
  /* Aqui recebe o contexto de autenticação */
  const auth = React.useContext(AuthContext);
  console.log(auth);
  /* Controlando o estado do botão enviar */
  const [loading, setLoading] = React.useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors } /* yup */,
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const { navigate } = useNavigation<ScreenNavigationProp>();

  const handleSignIn = (form: IFormInputs) => {
    const data = {
      email: form.email,
      password: form.password,
    };
    setLoading(true);
    /* Usando o metodo do contexto de autenticação */
    auth.signIn();
  };

  return (
    <KeyboardAvoidingView
      /* Aplicase ao ios para não cobrir a tela com o teclado */
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Content>
            <Logo source={logo}></Logo>
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name={'email'}
              placeholder="Email"
              keyboardType="email-address"
              error={errors.email && errors.email.message}
            />
            <InputControl
              control={control}
              name={'password'}
              placeholder="Senha"
              secureTextEntry
              error={errors.password && errors.password.message}
            />
            <Button
              title="Entrar"
              disabled={
                loading || errors.email || errors.password
              } /* ||errors.email ||errors.password */
              onPress={handleSubmit(handleSignIn)}
            />
            <ForgotPasswordButton>
              <ForgotPasswordTitle>Esqueci minha senha</ForgotPasswordTitle>
            </ForgotPasswordButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccount
        onPress={() => {
          navigate('SignUp');
        }}
      >
        <Icon name="log-in" />
        <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
      </CreateAccount>
    </KeyboardAvoidingView>
  );
};
