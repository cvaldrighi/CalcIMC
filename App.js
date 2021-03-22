import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// or any pure javascript modules available in npm
import { TextInput, Button } from 'react-native-paper';

export default class App extends React.Component {
  state = {
    weight: 0,
    height: 0,
    imc: 0,
    legend: 'undefined',
    color: '#bdc3c7'
  };

  calcIMC = () => {
    const result = this.state.weight / (this.state.height * this.state.height);

    this.setState({
      imc: Math.ceil(result)
    });

    if(result < 18.5) {
      this.setState({
        legend: 'Thinness',
        color: '#e74c3c'
      });
    } else if (result >= 18.5 && result < 25) {
      this.setState({
        legend: 'Normal',
        color: '#2ecc71'
      });
    } else if (result >= 25 && result < 30){
      this.setState({
        legend: 'Overweight',
        color: '#f1c40f'
      });
    } else if (result >= 30 && result < 40){
      this.setState({
        legend: 'Obesity',
        color: '#e67e22'
      });
    } else if (result >= 40) {
      this.setState({
        legend: 'Severe obesity',
        color: '#e74c3c'
      });
    }
  }

  render () { 
   return (
      <View style={styles.app}>
        <Text style={styles.legend}> Your IMC </Text>
       
        <View style={[styles.panel, {backgroundColor: this.state.color}]}>
          <Text style={styles.result}> {this.state.imc} </Text>
          <Text style={styles.diagnostic}> {this.state.legend} </Text>
        </View>

        <View> 
          <TextInput 
            style={styles.weight} 
            label="weight"
            onChangeText={value => {
              this.setState({weight: value.replace(',','.')});
            }}
          />

          <TextInput 
            style={styles.height} 
            label="height"
            onChangeText={value => {
              this.setState({height: value.replace(',','.')});
            }} 
          />

          <Button mode='contained' onPress={this.calcIMC}>
            OK
          </Button>
            
        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  app: {
    padding: 10,
    paddingTop: 30,
  },

  panel: {
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 10,
    padding: 8,
    width: 150, 

  },

  legend: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
  },

  result: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'Bold'
  },

  diagnostic: {
    textAlign: 'center',
    fontSize: 26,
  },

  weight: {
    marginVertical: 10,
  },

  height: {
    marginVertical: 10,
  }
});
