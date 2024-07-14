import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { Context } from "./context/Context";

export default function App() {
  return (
    <>
      <Context>
        <StackNavigator />
      </Context>
    </>
  );
}

const styles = StyleSheet.create({});
