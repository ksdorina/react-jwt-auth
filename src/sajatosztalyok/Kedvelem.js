import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ipcim="172.16.0.12";
export default class Kedvelem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      kedvelem1:"",
      kedvelem2:"",
      kedvelem3:"",
      kedvelem4:"",
      image:null,
      image2:null,
      image3:null,
      image4:null
    
    
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

    kepfeltoltes_alert = async () => {
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

        
    kepfeltoltes_alert2 = async () => {
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
    
    }

      kep_valaszto_galleria3 = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
        
        console.log(result);
        
        if (!result.cancelled)
        {
          this.setState({image3:result.uri});
        }
        }

        kep_valaszto_kamera3 = async () =>{
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          });
          
          console.log(result);
          
          if (!result.cancelled)
          {
            this.setState({image3:result.uri});
          }
          }

          
    kepfeltoltes_alert3 = async () => {
      Alert.alert(
        "Kép feltöltése",
        "",
        [
          {
            text: "Gallériából",
            onPress: () => this.kep_valaszto_galleria3( ),
          },
          { text: "Kép készítése", onPress: () => this.kep_valaszto_kamera3() }
        ],
        {
          cancelable: true,
        }
      );
    
    }

        kep_valaszto_galleria4 = async () =>{
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
          });
          
          console.log(result);
          
          if (!result.cancelled)
          {
            this.setState({image4:result.uri});
          }
          }

          kep_valaszto_kamera4 = async () =>{
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: false,
              aspect: [4, 3],
              quality: 1,
            });
            
            console.log(result);
            
            if (!result.cancelled)
            {
              this.setState({image4:result.uri});
            }
            }

            
    kepfeltoltes_alert4 = async () => {
      Alert.alert(
        "Kép feltöltése",
        "",
        [
          {
            text: "Gallériából",
            onPress: () => this.kep_valaszto_galleria4( ),
          },
          { text: "Kép készítése", onPress: () => this.kep_valaszto_kamera4() }
        ],
        {
          cancelable: true,
        }
      );
    
    }
      
    

  felvitel=async ()=>{
    


    //alert("Megnyomva")


    // ImagePicker saves the taken photo to disk and returns a local URI to it
let localUri = this.state.image;
let filename = localUri.split('/').pop();


// Infer the type of the image
let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image`;
//alert(filename)
// Upload the image using the fetch and FormData APIs
let formData = new FormData();
// Assume "photo" is the name of the form field the server expects
formData.append('photo', { uri: localUri, name: filename, type });

return await fetch('http://'+ipcim+':3000/upload', {
  method: 'POST',
  body: formData,
  headers: {
    'content-type': 'multipart/form-data',
  },
})

.then((response2)=>response2.text())
.then((fajlneve) => {
  //handle success
  //alert(fajlneve)
  console.log("Visszajött: "+fajlneve);

//feltoltes vege

    let bemenet={
      bevitel1: fajlneve,
      bevitel2: this.state.kedv_1,
      bevitel4: this.state.kedv_2,
      bevitel6: this.state.kedv_3,
      bevitel8: this.state.kedv_4,

    }
    
    
  
    
    alert("Sikeres felvitel!")
    fetch('http://'+ipcim+':3000/kedvelemfelvitel', {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
      } )
      .then((response) => response.text())
      .then((szoveg) => {

        //alert(szoveg)
        this.setState({kedv_1:""})
        this.setState({kedv_2:""})
        this.setState({kedv_3:""})
        this.setState({kedv_4:""})
        
        
      })
      .catch((error) =>{
        console.error(error);
      });

    })
    .catch((error) =>{
      console.error(error);
    });



  }



  


  render() {
    return (
      <ScrollView>
      <View style={{padding: 10}}>
        <Text style={{padding: 10, fontSize: 15}}>
          Írd le azokat a dolgokat amiket kedvelsz!
        </Text>

        <View style={{flexDirection:'row'}}>
          <View style={{flex:1}} >
          {this.state.image && <Image source={{uri:this.state.image}} style={{width:182,height:200}} />}
        <TouchableOpacity 
        onPress={async ()=>this.kepfeltoltes_alert()}>
          <View style={{backgroundColor:"#017f8d",marginTop:10,marginRight:5}}>
            <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Kép feltöltése</Text>
          </View>
        </TouchableOpacity>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:100,textAlignVertical:"top",marginTop:10,marginRight:5}}
          placeholder="Írd le a kép leírását!"
          onChangeText={(kedv_1) => this.setState({kedv_1})}
          value={this.state.kedv_1}
        />
        </View>

        <View style={{flex:1,}} >
        {this.state.image2 && <Image source={{uri:this.state.image2}} style={{width:182,height:200,marginLeft:5}} />}
        <TouchableOpacity
        style={{flex:1}} 
        onPress={async ()=>this.kepfeltoltes_alert2()}>
          <View style={{backgroundColor:"#017f8d",marginTop:10,marginLeft:5}}>
            <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Kép feltöltése</Text>
          </View>
        </TouchableOpacity>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:100,textAlignVertical:"top",marginLeft:5}}
          placeholder="Írd le a kép leírását!"
          onChangeText={(kedv_2) => this.setState({kedv_2})}
          value={this.state.kedv_2}
        />
        </View>
        </View>

        <View style={{flexDirection:'row',marginTop:50}}>
          <View style={{flex:1}} >
          {this.state.image3 && <Image source={{uri:this.state.image3}} style={{width:182,height:200}} />}
        <TouchableOpacity 
        onPress={async ()=>this.kepfeltoltes_alert3()}>
          <View style={{backgroundColor:"#017f8d",marginTop:10,marginRight:5}}>
            <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Kép feltöltése</Text>
          </View>
        </TouchableOpacity>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:100,textAlignVertical:"top",marginTop:10,marginRight:5}}
          placeholder="Írd le a kép leírását!"
          onChangeText={(kedv_3) => this.setState({kedv_3})}
          value={this.state.kedv_3}
        />
        </View>

        <View style={{flex:1}} >
        {this.state.image4 && <Image source={{uri:this.state.image4}} style={{width:182,height:200,marginLeft:5}} />}
        <TouchableOpacity
        style={{flex:1}} 
        onPress={async ()=>this.kepfeltoltes_alert4()}>
          <View style={{backgroundColor:"#017f8d",marginTop:10,marginLeft:5}}>
            <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Kép feltöltése</Text>
          </View>
        </TouchableOpacity>
        <TextInput
         placeholderTextColor="white"
          style={{color:"white",backgroundColor:"#ecb920",padding:10,borderRadius:10,height:100,textAlignVertical:"top",marginLeft:5}}
          placeholder="Írd le a kép leírását!"
          onChangeText={(kedv_4) => this.setState({kedv_4})}
          value={this.state.kedv_4}
        />
        </View>
        </View>

        <TouchableOpacity 
        onPress={async ()=>this.felvitel()}>
          <View style={{backgroundColor:"#017f8d",marginTop:20}}>
            <Text style={{textAlign:"center",padding:10, color:"#e4e5e0"}}>Rögzítés</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
      
    );
  }
}