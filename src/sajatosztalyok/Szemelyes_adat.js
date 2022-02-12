import React, { Component } from 'react';
import { Text, TextInput, View,TouchableOpacity, Button, Image, ScrollView, Alert} from 'react-native-web';
import * as ImagePicker from 'expo-image-picker';

const ipcim="172.16.0.12";
export default class Szemelyesadat extends Component {
  constructor(props) {
    super(props);
    
    let dt=new Date();
    let teljesdat=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate();
    this.state = {

        lakcim:"",
        lakcim_kep:"",
        auto:"",
        auto_kep:"",
        autom:"",
        datum:teljesdat,
        date:dt,
        show:false,
        image:null,
        image2:null,
        text: '',


    };
  }

  kep_valaszto_galleria = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log(result);
    
    if (!result.cancelled)
    {
      this.setState({image:result.uri});
    }
    }

    kep_valaszto_kamera = async () =>{
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      
      console.log(result);
      
      if (!result.cancelled)
      {
        this.setState({image:result.uri});
      }
      }
  
    
  kep_valaszto_galleria2 = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    
    console.log(result);
    
    if (!result.cancelled)
    {
      this.setState({image2:result.uri});
    }
    }

    kep_valaszto_kamera2 = async () =>{
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      
      console.log(result);
      
      if (!result.cancelled)
      {
        this.setState({image2:result.uri});
      }
      }


  felvitel=async ()=>{
    //alert("Megnyomva")
    let bemenet={
      beviteld: this.state.datum,
      bevitel1: this.state.lakcim,
      bevitel2: this.state.auto,
      bevitel3: this.state.autom,

    }
      function custom_sort(a,b){
        return new Date(a.lastUpdated).getTime()-new Date(b.lastUpdated).getTime();
      }
    
    alert("Sikeres felvitel!")
    fetch('http://'+ipcim+':3000/szemadatfelvitel', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then((szoveg) => {

        //alert(szoveg)
        this.setState({lakcim:""})
        this.setState({auto:""})
        this.setState({autom:""})
        
        
      })
      .catch((error) =>{
        console.error(error);
      });



  }

  megjelenit=()=>{
    //alert("hello")
    this.setState({show:true})
  }

  valtoztatdate=(event,datum0)=>{
    //alert("barmi")
    this.setState({show:false})
    let dt=new Date();
    dt=datum0 || this.state.date;
    let teljesdat=dt.getFullYear()+"/"+(dt.getMonth()+1)+"/"+dt.getDate();
    this.setState({date:dt})
    this.setState({datum:teljesdat})

  }

  kepfeltoltes_alert = () =>
  Alert.alert(
    "Kép feltöltése",
    "",
    [
      {
        text: "Gallériából",
        onPress: () => this.kep_valaszto_galleria( ),
      },
      { text: "Kép készítése", onPress: () => this.kep_valaszto_kamera() }
    ],
    {
      cancelable: true,
    }
  );

  kepfeltoltes_alert2 = () =>
  Alert.alert(
    "Kép feltöltése",
    "",
    [
      {
        text: "Gallériából",
        onPress: () => this.kep_valaszto_galleria2( ),
      },
      { text: "Kép készítése", onPress: () => this.kep_valaszto_kamera2() }
    ],
    {
      cancelable: true,
    }
  );

  /*=================================================Kor kiszámítása=====================================================*/


  /*===========================================Beviteli mezők, ami látszik==============================================*/

  render() {
    return (
      <ScrollView>
          <View style={{alignItems:'center'}}>
        <Text style={{padding: 10, fontSize: 15,textAlign:'center'}}>
          Még nem adtad meg a személyes adataidat. Add meg itt:
        </Text>
      <View style={{padding: 10,width:400,backgroundColor:"#e4e5e0",alignItems:"center",borderRadius:20,marginLeft:20,marginRight:20,}}>
        
        <Text style={{padding: 10, fontSize: 20,color:"#52633a"}}>
         Születési dátumod:
        </Text>
        
           <Text style={{padding: 5, fontSize: 20, width:180,backgroundColor:"#ecb920",color:"white",textAlign:"center", marginBottom:10}}>
          {this.state.datum}
        </Text>
        {/*{this.state.show?
        <DateTimePicker
          testID="dateTimePicker"
          value={this.state.date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={(event,datum0)=>this.valtoztatdate(event,datum0)}
          style={{width:200, alignItems:"center",  backgroundColor:"#017f8d"}}
        />
        :
        null
        } */}

        <TouchableOpacity 
        onPress={()=>this.megjelenit()}>
          <View style={{width:150,backgroundColor:"#017f8d"}}>
            <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Dátum kiválasztása</Text>
          </View>
        </TouchableOpacity>
        
         <Text style={{padding: 10, fontSize: 20,color:"#52633a"}}>
         Lakcímed:
        </Text>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:40,width:300,textAlignVertical:"top"}}
          placeholder="Írd le a lakcímed!"
          onChangeText={(lakcim) => this.setState({lakcim})}
          value={this.state.lakcim}
        />
        {this.state.image && <Image source={{uri:this.state.image}} style={{width:300,height:200}} />}
        <TouchableOpacity 
        onPress={this.kepfeltoltes_alert}>
          <View style={{width:150,backgroundColor:"#017f8d",marginTop:10}}>
            <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Kép feltöltése</Text>
          </View>
        </TouchableOpacity>

        

      <Text style={{padding: 10, fontSize: 20,color:"#52633a"}}>
         Autód színe:
        </Text>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:40,width:300,textAlignVertical:"top"}}
          placeholder="Írd le az autód színét!"
          onChangeText={(auto) => this.setState({auto})}
          value={this.state.auto}
        />

      <Text style={{padding: 10, fontSize: 20,color:"#52633a"}}>
         Autód márkája:
        </Text>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:40,width:300,textAlignVertical:"top"}}
          placeholder="Írd le az autód márkáját!"
          onChangeText={(autom) => this.setState({autom})}
          value={this.state.autom}
        />

        {this.state.image2 && <Image source={{uri:this.state.image2}} style={{width:300,height:200}} />}
        <TouchableOpacity 
        onPress={this.kepfeltoltes_alert2}>
          <View style={{width:150,backgroundColor:"#017f8d",marginTop:10}}>
            <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Kép feltöltése</Text>
          </View>
        </TouchableOpacity>
        

        <TouchableOpacity 
        onPress={async ()=>this.felvitel()}>
          <View style={{width:200,backgroundColor:"#017f8d",marginTop:10}}>
            <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Mentés</Text>
          </View>
        </TouchableOpacity>
       


        <View>

      </View>
       
      </View>
      </View>
      </ScrollView>
      


    );


  }
}