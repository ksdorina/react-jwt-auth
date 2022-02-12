import React, { Component } from 'react';
import { Text, TextInput, View,TouchableOpacity, Image, FlatList, Alert, SafeAreaView, ScrollView } from 'react-native-web';
import FileUpload from "./upload";




const ipcim="localhost";

export default class Elmeny extends Component {
  constructor(props) {
    super(props);
    this.state = {

        komment:"",
        image:null,
        dataSource:[],
        dataSource2:[],
        
    };

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
   

 

   

  olvasas=()=>{
    return fetch('http://'+ipcim+':8080/mostani')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson,
      }, function(){
          var seged=this.state.dataSource
          for( var item of seged)
          {
            var kecske=item.datum.split("T")
            item.datum=kecske[0]
          }
          this.setState({dataSource:seged})

      });
      //alert(JSON.stringify(this.state.dataSource))
      
    })
    .catch((error) =>{
      console.error(error);
    });

  }

  kereses=async () =>{
    let bemenet ={
      bevitel1:this.state.eredmeny
    }

    fetch('http://'+ipcim+':8080/kereses', {
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
        var seged=this.state.dataSource
        for( var item of seged)
        {
          var kecske=item.datum.split("T")
          item.datum=kecske[0]
        }
        this.setState({dataSource:seged})

       });
       //alert(JSON.stringify(this.state.dataSource))

     })
     .catch((error) =>{
       console.error(error);
     });
   }



 


  felvitel=async ()=>{
    //alert("Megnyomva")
    //feltoltes
  }


  render() {
    return (
      <SafeAreaView style={{flex:1}}>
        <ScrollView nestedScrollEnabled={true}>
      {/*-------------------------------------------------emlék bekérés-------------------------------------------------------------------*/}
    <View style={{alignItems:'center',marginLeft:-30}}>
    <View style={{flexDirection:'row',alignItems:'center'}}>
    <TextInput
        placeholderTextColor="white"
        style={{width:300,color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,textAlignVertical:"top"}}
        placeholder="Élmény kereső"
        onChangeText={(eredmeny) => this.setState({eredmeny})}
        />
        

        <TouchableOpacity 
          onPress={async ()=>this.kereses()}>
                    <Image source={{uri: "https://i.imgur.com/nioiC4c.png"}} style={{width:30,height:30}} /> 
          
        </TouchableOpacity>



     
        </View>
        </View>
        

            <View style={{padding: 10,backgroundColor:"#e4e5e0",alignItems:"center",alignSelf:'center',borderRadius:20,marginLeft:-20,marginRight:20,marginTop:10,width:350}}>
            

              <View>
               <Text style={{padding: 10, fontSize: 20,color:"#52633a"}}>
               Élmény leírása:
              </Text>
              <TextInput
               placeholderTextColor="white"
                style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:80,width:300,textAlignVertical:"top"}}
                placeholder="Írd le az élményed!"
                onChangeText={(komment) => this.setState({komment})}
                value={this.state.komment}
              />
              </View>
      
      {/*---------------------------------------------------------------------------------Kép-------------------------------------------------- */} 
              <View style={{alignItems:"center"}}>
              <FileUpload komment={this.state.komment}>
                
              </FileUpload>
              
              </View>
      {/*--------------------------------------------------rögzít gomb----------------------------------------------------------------------------- */}
              <View style={{alignItems:"center"}}>
              <TouchableOpacity 
              onPress={async ()=>this.felvitel()}>
                <View style={{width:200,backgroundColor:"#017f8d",marginTop:10,borderRadius:7}}>
                  <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Rögzítés</Text>
                </View>
              </TouchableOpacity> 
              </View>  
              </View>  
      {/*-----------------------------------------Emlékek-------------------------------------------------------------------------------------------*/}
             


        <View style={{marginTop:10, alignItems:"center",marginLeft:15, marginRight:25,flexWrap: 'wrap',flexDirection:'row'}}> 
         {this.state.dataSource.map((item) => {

        return (
          <View style={{borderWidth:1,borderRadius:10,padding:10,width:330, marginLeft:13,paddingLeft:15,backgroundColor:"#055169", marginBottom:10}}>
        {/* Input field */}

            <Text style={{fontSize:20,padding:3,color:"white",fontFamily:"italic"}}>{item.datum} </Text>
            <Text style={{fontStyle:"italic",fontFamily:'italic',fontSize:15,padding:3,color:"white",height:50}}>{item.szoveg}</Text>
            <Image source={{uri: "http://localhost:8080/"+item.kep_id}} style={{width:300,height:300}} /> 
            <TouchableOpacity
        style={{    
          alignItems: "center",
        backgroundColor: "#ecb920",
        padding: 10,
        width:300,
        marginTop:10,
        marginLeft:"auto",
        marginRight:"auto",
        borderRadius:10}}
        onPress={async ()=>this.torles(item.elmeny_id)}
      >
        <Text style={{color:"white",fontWeight:"bold",fontSize:15}}  >Törlés</Text>
      </TouchableOpacity>
          </View>
        )})}
        </View>
  

        

      </ScrollView>
  </SafeAreaView>



        
      
        
    );

    
  }
  
}
