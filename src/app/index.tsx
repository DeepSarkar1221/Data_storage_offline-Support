// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useState } from "react";
// import { Button, LogBox, StyleSheet, Text, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function Index() {
//   const [data, setData] = useState("");
//   const MyObj = {
//     name: "Deep",
//     Pass: "123",
//     age: 20,
//     isDevelop: true,
//   };
//   //setItem
//   const saveData = async function () {
//     await AsyncStorage.setItem("user", "Deep");
//   };

//   //getItem
//   const getData = async () => {
//     const value=await AsyncStorage.getItem("user");
//     setData(value!)
//   };

//   //remove Item
//   const removeItem = async () => {
//     await AsyncStorage.removeItem("user");
//     // setData("")
//   };

//   const clearStorage = async () => {
//     await AsyncStorage.clear();
//     setData("");
//   };
//   const getKeys = async () => {
//     const keys1=await AsyncStorage.getAllKeys();
//     console.log(keys1);

//   };
//   const saveMultiple = async () => {
//     await AsyncStorage.multiSet([
//       ["user1", "DDD"],
//       ["user2", "duhaue"],
//     ]);
//     //

//   };
//   const getMultiple = async () => {
//     const datas = await AsyncStorage.multiGet(["user1", "user2"]);
//     console.log(datas);

//   };

//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         gap: 12,
//         padding: 20,
//         justifyContent: "center",
//       }}
//     >
//       <Button title="Save one Item" onPress={saveData} />
//       <Button title="Get One Item" onPress={getData} />
//       <Button title="remove one Item" onPress={removeItem} />
//       <Button title="Save multiple Item" onPress={saveMultiple} />
//       <Button title="Get multiple Item" onPress={getMultiple} />
//       <Button title="Get  all keys" onPress={getKeys} />
//       <Button title="delete all items" onPress={clearStorage} />
//       <View>
//         <Text style={{fontSize:18}}>OutPut is :</Text>
//         <Text>{data}</Text>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// =========================================================================

// import * as SecureStore from "expo-secure-store";
// import React, { useState } from "react";
// import { StyleSheet, Text, View } from "react-native";

// const index = () => {
//   const [output, setOutput] = useState("");

//   const setItem = async () => {
//     await SecureStore.setItemAsync("token", "Deep123");
//     setOutput("Token Saved");
//   };

//   const getToken = async () => {
//     const result = await SecureStore.getItemAsync("token");
//     setOutput(result!);
//   };

//   const deleteToken = async () => {
//     await SecureStore.deleteItemAsync("token");
//     setOutput("token deleted");
//   };

//   const checkAvailability = async () => {
//     const available = await SecureStore.isAvailableAsync();
//     setOutput(
//       available ? "secureStore Available" : "SecureStore Not Available",
//     );
//   };

//   return (
//     <View>
//       <Text>index</Text>
//     </View>
//   );
// };

// export default index;

// const styles = StyleSheet.create({});

// ==============================================================

import * as SQLite from "expo-sqlite";
import { StyleSheet, Text, View } from "react-native";

import React, { useEffect, useState } from "react";

const db = SQLite.openDatabaseSync("demo.db");
const index = () => {
  const [output, setOutput] = useState("");
  const createTable = () => {
    db.execSync(`
      Create table if not exists users(
      id integer primary key autoincrement,
      name text,
      age integer
      );
      `);
    setOutput("Table Created");
  };

  const insertData = () => {
    db.runSync("Insert into users (name,age) values(?,?)", "Deep", 20);
    setOutput("DAta Inserted");
  };

  const getUsers = () => {
    const data = db.getAllSync(`
      select * from users
      `);
    setOutput(JSON.stringify(data, null, 2));
  };

  const getFirstUser = () => {
    const data = db.getFirstSync(`
      select * from users
      `);
    setOutput(JSON.stringify(data, null, 2));
  };

  const updateUser = () => {
    db.runSync(`update users set age=? where id=?`, 25, 1);
    setOutput("User Data Updated");
  };
  const DeleteUser = () => {
    db.runSync(`Delete from users where id=?`, 1);
    setOutput("User Deleted");
  };

  const dropTable = () => {
    db.execSync(`Drop  table if exists users`);
    setOutput("Table Dropped");
  };
  // ***************
  const statement = db.prepareSync(`insert into users (name,age) values (?,?)`);
  statement.executeSync(["Deep", 23, "Ris", 23]);
  //************

  useEffect(() => {
    createTable();
  }, []);
  return (
    <View>
      <Text>index</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
