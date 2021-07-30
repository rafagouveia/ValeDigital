import React, {useState} from 'react';
import {Container, Content, Text, View} from 'native-base';
import {name as appName} from './../../app.json';
import styled from 'styled-components';
import {TextInput, Button} from 'react-native-paper';

const Box = styled(View)`
  display: flex;
`;
const InputText = styled(TextInput).attrs((props) => ({
  mode: 'outlined',
}))`
  margin: 10px;
`;
export default function Login({navigation}) {
  const [text, setText] = useState('');
  return (
    <Container>
      <Box>
        <View style={{alignItems: 'center', marginVertical: 70}}>
          <Text
            style={{
              fontSize: 26,
              fontStyle: 'italic',
              fontWeight: '700',
            }}>
            {appName}
          </Text>
        </View>
        <View style={{margin: 10}}>
          <InputText
            label="Usuário"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <InputText
            label="Senha"
            value={text}
            onChangeText={(text) => setText(text)}
          />
        </View>
        <View style={{margin: 15}}>
          <Button
            icon="camera"
            color={'#f61616'}
            mode="contained"
            onPress={() => navigation.navigate('Home')}>
            Entrar
          </Button>
        </View>
      </Box>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginHorizontal: 10,
          paddingBottom: 20,
        }}>
        <Text style={{textAlign: 'center', fontSize: 13, color: '#737373'}}>Esse aplicativo foi desenvolvido e idealizado pela BlackRed Solutions</Text>
      </View>
    </Container>
  );
}
