import React, {} from "react"
import {Container, Content, Text, View, Header} from "native-base"
import { Avatar, List, Divider } from "react-native-paper";


export default function PerfilPatrao(){
  return(
    <Container>
     <Content>
       <View>
         <View
           style={{marginTop: 10, marginBottom: 10, marginLeft: 14, flexDirection: 'row', alignItems: 'center'}}
         >
           <View>
             <Avatar.Image
               size={48}
               source={{uri: 'https://i.imgur.com/RKU6Pbp.jpg'}}
             />
           </View>
           <View>
             <Text
               style={{paddingLeft: 20, color: '#454545', fontSize: 18, fontWeight: '700'}}
             >
               Rafael Gomes
             </Text>
           </View>

         </View>
         <Divider />
         <List.Item
           title="Perfil"
           left={props => <List.Icon {...props} icon="account" />}
         />

         <List.Item
           title="Configurações"
           left={props => <List.Icon {...props} icon="folder" />}
         />
         <List.Item
           title="Sair"
           left={props => <List.Icon {...props} icon="exit-to-app" />}
         />
       </View>
     </Content>
    </Container>
  )
}
