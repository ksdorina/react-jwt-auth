import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity,SafeAreaView,ScrollView } from 'react-native-web';

const ipcim="localhost";

export default class Adattorles extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  torles=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel1:szam
    }

  fetch("http://"+ipcim+":8080/torles", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    return fetch('http://'+ipcim+':8080/mostani')
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



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      
      <View style={{marginTop:10, alignItems:"center",marginLeft:15, marginRight:25,flexWrap: 'wrap',flexDirection:'row'}}> 
      {this.state.dataSource.map((item) => {

     return (
       <View style={{borderWidth:1,borderRadius:10,padding:10,width:330, marginLeft:13,paddingLeft:15,backgroundColor:"#055169", marginBottom:10}}>
     {/* Input field */}

         <Text style={{fontSize:20,padding:3,color:"white",fontFamily:"italic"}}>{item.datum} </Text>
         <Text style={{fontStyle:"italic",fontFamily:'italic',fontSize:15,padding:3,color:"white",height:50}}>{item.szoveg} </Text>
         <Image  source={{uri: 'http://'+ipcim+':8080/'+item.kep_id}} style={{width:300,height:300}} /> 
         <TouchableOpacity
        style={styles.kekgomb}
        onPress={async ()=>this.torles(item.elmeny_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Törlés</Text>
      </TouchableOpacity>
       </View>
     )})}
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
    marginTop:10,
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:10
  },
  

  
});