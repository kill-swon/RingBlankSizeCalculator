import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TextInputComponent } from "react-native";

export default function Index() {
  const [ringSize, setRingSize] = useState("");

  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Desired Ring Size (US)..."
        onChangeText={newRingSize => setRingSize(newRingSize)}
        value={ringSize}
      />
      <Text>ringSize: {ringSize}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    width: 200,
  },
});
