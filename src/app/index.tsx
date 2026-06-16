import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, LogBox, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [data, setData] = useState("");
  const MyObj = {
    name: "Deep",
    Pass: "123",
    age: 20,
    isDevelop: true,
  };
  //setItem
  const saveData = async function () {
    await AsyncStorage.setItem("user", "Deep");
  };

  //getItem
  const getData = async () => {
    const value=await AsyncStorage.getItem("user");
    setData(value!)
  };

  //remove Item
  const removeItem = async () => {
    await AsyncStorage.removeItem("user");
    // setData("")
  };

  const clearStorage = async () => {
    await AsyncStorage.clear();
    setData("");
  };
  const getKeys = async () => {
    const keys1=await AsyncStorage.getAllKeys();
    console.log(keys1);
    
  };
  const saveMultiple = async () => {
    await AsyncStorage.multiSet([
      ["user1", "DDD"],
      ["user2", "duhaue"],
    ]);
    // 
    

  };
  const getMultiple = async () => {
    const datas = await AsyncStorage.multiGet(["user1", "user2"]);
    console.log(datas);
    
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        gap: 12,
        padding: 20,
        justifyContent: "center",
      }}
    >
      <Button title="Save one Item" onPress={saveData} />
      <Button title="Get One Item" onPress={getData} />
      <Button title="remove one Item" onPress={removeItem} />
      <Button title="Save multiple Item" onPress={saveMultiple} />
      <Button title="Get multiple Item" onPress={getMultiple} />
      <Button title="Get  all keys" onPress={getKeys} />
      <Button title="delete all items" onPress={clearStorage} />
      <View>
        <Text style={{fontSize:18}}>OutPut is :</Text>
        <Text>{data}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
