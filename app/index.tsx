// Currently using Picker component instead of Dropdown (glitchy) component
// TODO dark theme
// TODO mm - gauge conversion
// TODO ring size nationalization
// TODO dynamic update instead of clicking button
// TODO web styling
// TODO ios

import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider, TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
// import { Dropdown } from 'react-native-paper-dropdown';

export default function Index() {
  // const [isGauge, setIsGauge] = useState(false);
  const [metalThickness, setMetalThickness] = useState('');
  const [metalWidth, setMetalWidth] = useState('');
  const [blankLength, setBlankLength] = useState('');
  const [ringSize, setRingSize] = useState(''); // PICKER
  const ringSizes = ['Select a ring size', 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5]; // PICKER
  // const [ringSize, setRingSize] = useState<string>(); // DROPDOWN
  // const ringSizeOptions = [ // DROPDOWN
  //   { label: '1', value: '1' },
  //   { label: '1½', value: '1.5' },
  //   { label: '2', value: '2' },
  //   { label: '2½', value: '2.5' },
  //   { label: '3', value: '3' },
  //   { label: '3½', value: '3.5' },
  //   { label: '4', value: '4' },
  //   { label: '4½', value: '4.5' },
  //   { label: '5', value: '5' },
  //   { label: '5½', value: '5.5' },
  //   { label: '6', value: '6' },
  //   { label: '6½', value: '6.5' },
  //   { label: '7', value: '7' },
  //   { label: '7½', value: '7.5' },
  //   { label: '8', value: '8' },
  //   { label: '8½', value: '8.5' },
  //   { label: '9', value: '9' },
  //   { label: '9½', value: '9.5' },
  //   { label: '10', value: '10' },
  //   { label: '10½', value: '10.5' },
  //   { label: '11', value: '11' },
  //   { label: '11½', value: '11.5' },
  //   { label: '12', value: '12' },
  //   { label: '12½', value: '12.5' },
  //   { label: '13', value: '13' },
  //   { label: '13½', value: '13.5' },
  //   { label: '14', value: '14' },
  //   { label: '14½', value: '14.5' },
  // ];

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'tomato',
      secondary: 'yellow',
    },
  };

  const calculateBlankLength = () => {
    // Error handling
    if (!ringSize || !metalThickness || !metalWidth) {
      setBlankLength('No numbers, no math...');
      return;
    }
    const ringSizeNum = parseFloat(ringSize || '0');
    let metalThicknessNum = parseFloat(metalThickness);
    const metalWidthNum = parseFloat(metalWidth);

    // Error handling
    if (isNaN(ringSizeNum) || isNaN(metalWidthNum) || isNaN(metalThicknessNum)) {
      setBlankLength('Invalid input. Please enter numbers.');
      return;
    }



    // if (isGauge) {
    //   // Gauge to mm conversion (simplified example - you might want a more comprehensive table)
    //   const gaugeToMM: { [key: number]: number } = {
    //     10: 2.59, 12: 2.05, 14: 1.63, 16: 1.29, 18: 1.02, 20: 0.81,
    //   };

    //   metalThicknessNum = gaugeToMM[metalThicknessNum] || metalThicknessNum; // Default to entered value if gauge not found
    // }



    // Key:Value list of ring sizes and their inner diameters in millimeters
    const ringSizeToId: { [key: number]: number } = { 1: 12.37, 1.5: 12.78, 2: 13.21, 2.5: 13.61, 3: 14.05, 3.5: 14.45, 4: 14.90, 4.5: 15.26, 5: 15.70, 5.5: 16.10, 6: 16.51, 6.5: 16.92, 7: 17.35, 7.5: 17.75, 8: 18.19, 8.5: 18.59, 9: 19.00, 9.5: 19.41, 10: 19.82, 10.5: 20.24, 11: 20.68, 11.5: 21.08, 12: 21.49, 12.5: 21.79, 13: 22.22, 13.5: 22.61, 14: 23.01, 14.5: 23.42 };

    const innerDiameter = ringSizeToId[ringSizeNum];

    // Error handling
    if (!innerDiameter) {
      setBlankLength('Invalid ring size');
      return;
    }

    let calculatedLength = (innerDiameter + metalThicknessNum) * Math.PI;

    if (metalWidthNum > 4) {
      calculatedLength += 0.5;
    }

    setBlankLength('Blank Length: ' + calculatedLength.toFixed(2) + ' (mm)');
  };


  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>

        {/* <View style={styles.switchContainer}>
          <Text>Gauge</Text>
          <Switch value={isGauge} onValueChange={newIsGauge => setIsGauge(newIsGauge)} />
          <Text>mm</Text>
        </View> */}



        {/* <View>
          <Dropdown
            label="Desired Ring Size"
            placeholder="Select a ring size"
            options={ringSizeOptions}
            value={ringSize}
            onSelect={setRingSize}
            mode="outlined"
          />
        </View> */}



        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={ringSize}
            style={styles.picker}
            onValueChange={setRingSize}
          >
            {ringSizes.map((size) => (
              <Picker.Item key={size} label={size.toString()} value={size.toString()} />
            ))}
          </Picker>
        </View>


        {/* <TextInput
        style={{ marginTop: 15 }}
        placeholder="Ring Size (US)"
        keyboardType="numeric"
        value={ringSize}
        onChangeText={newRingSize => setRingSize(newRingSize)}
      /> */}


        <TextInput
          style={styles.input}
          label="Metal Thickness (mm)" // Label prop for floating label (part of react-native-paper)
          mode="outlined" // Optional: adds an outline (part of react-native-paper)
          // placeholder={isGauge ? "Metal Thickness (Gauge)" : "Metal Thickness (mm)"} // (just a part of core but react-native-paper is better)
          keyboardType="numeric"
          value={metalThickness}
          onChangeText={setMetalThickness}
        />
        <TextInput
          style={styles.input}
          label="Metal Width (mm)" // Label prop for floating label (part of react-native-paper)
          mode="outlined" // Optional: adds an outline (part of react-native-paper)
          // placeholder="Metal Width (mm)" // (just a part of core but react-native-paper is better)
          keyboardType="numeric"
          value={metalWidth}
          onChangeText={setMetalWidth}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={calculateBlankLength}
        >
          Calculate
        </Button>
        {/* {blankLength !== '' && <Text style={styles.result}>Blank Length: {blankLength}</Text>} */}
        <Text style={styles.result}>{blankLength}</Text>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    // backgroundColor: '#f0f0f0', // Light gray background for the container
  },
  output: {
    marginTop: 15,
  },
  input: {
    marginTop: 8,
  },
  button: {
    marginTop: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerContainer: { // Style for the Picker
    borderWidth: 1,
    borderColor: '#ccc', // Light gray border color
    borderRadius: 5, // Rounded corners
    backgroundColor: 'white', // White background for the Picker
  },
  picker: {
    // height: 40,
  },
});
