import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity,SafeAreaView,ScrollView, TextInput } from 'react-native-web';

const ipcim="localhost";

export default class Adattorles extends React.Component {

  constructor(props){
    super(props);
    this.state ={ 
        isLoading: true,
        showAlert: false
    }
  }


  torles=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch("http://"+ipcim+":8080/torles_felh", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    return fetch('http://'+ipcim+':8080/felhasznalok')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  kereses=async () =>{
    let bemenet ={
      bevitel1:this.state.eredmeny
    }

    fetch('http://'+ipcim+':8080/kereses_felh', {
     method: "POST",
     body: JSON.stringify(bemenet),
     headers: {"Content-type": "application/json; charset=UTF-8"}
   }
   )
     .then((response) => response.json())
     .then((responseJson) => {

       this.setState({
         isLoading: false,
         dataSource: responseJson,
       }, function(){
        
       });
       //alert(JSON.stringify(this.state.dataSource))

     })
     .catch((error) =>{
       console.error(error);
     });
   }



  render(){

    const { showAlert } = this.state;
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(

      <View style={{alignItems:'center'}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <TextInput
        placeholderTextColor="white"
        style={{width:300,color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,textAlignVertical:"top"}}
        placeholder="Felhasználó kereső"
        onChangeText={(eredmeny) => this.setState({eredmeny})}
        />
        

        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
                    <Image source={{uri: "https://i.imgur.com/nioiC4c.png"}} style={{width:30,height:30}} /> 
          
        </TouchableOpacity>
        </View>
      <View style={{marginTop:10, alignItems:"center",marginLeft:15, marginRight:25,flexWrap: 'wrap',flexDirection:'row'}}> 


      {this.state.dataSource.map((item) => {

     return (
       <View style={{borderWidth:1,borderRadius:10,padding:10,width:330, marginLeft:13,paddingLeft:15,backgroundColor:"#055169", marginBottom:10}}>
     {/* Input field */}

         <Text style={{fontSize:20,padding:3,color:"white",fontFamily:"italic"}}>{item.username} </Text>
         <Text style={{fontStyle:"italic",fontFamily:'italic',fontSize:15,padding:3,color:"white",height:50}}>{item.email} </Text>
         <TouchableOpacity
        style={styles.kekgomb2}
        onPress={async ()=>this.torles(item.id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Adminjog adása</Text>
      </TouchableOpacity>
         <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.torles(item.id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Törlés</Text>
      </TouchableOpacity>
       </View>
     )})}
     </View>
     </View>


    );
  }
}

const styles = StyleSheet.create({
  
  kekgomb: {
    alignItems: "center",
    backgroundColor: "#ecb920",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:10,
  },

  kekgomb2: {
    alignItems: "center",
    backgroundColor: "#ecb920",
    padding: 10,
    width:300,
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:10,
    marginBottom:10
  },
  

  
});