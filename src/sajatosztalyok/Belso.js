import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, Image } from 'react-native-web';

export default class Belso extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textInputValue: '',
            textInputValue2: '',
            kivalasztjo:""
        }
    }

    render() {
        let kivalasztjo = this.state.kivalasztjo;
        let index = 0;
        const jo = [
            { key: index++, label: 'Kedves' },
            { key: index++, label: 'Jószívű' },
            { key: index++, label: 'Szeretek egyedül lenni'},
            { key: index++, label: 'Szeretek felnőttekkel lenni'},
            { key: index++, label: 'Okos'},
            { key: index++, label: 'Figyelmes'},
            { key: index++, label: 'Lelkiismeretes'},
            { key: index++, label: 'Bátor'},
            { key: index++, label: 'Engedelmes'},
            { key: index++, label: 'Őszinte'},
            { key: index++, label: 'Válogatós'},
        ];

        const rossz = [
          { key: index++, label: 'Hirtelen haragú' },
          { key: index++, label: 'Rosszkedvű' },
          { key: index++, label: 'Túl lelkiismeretes'},
          { key: index++, label: 'Túl engedelmes'},
          { key: index++, label: 'Túl őszinte'},
          { key: index++, label: 'Válogatós'},
          { key: index++, label: 'Szégyenlős'},
          { key: index++, label: 'Zaklatott'},
          { key: index++, label: 'Nyugtalan'},
          { key: index++, label: 'Türelmetlen'},
          { key: index++, label: 'Beszédes'},
      ];

        return (
            <View style={{flex:1, justifyContent:'space-around', padding:50}}>
                <Text>Tesztelés alatt.</Text>


               
            </View>
        );
    }
}
