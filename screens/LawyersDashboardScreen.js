import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../components/constants";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Header from "../components/LawyersDashboard/Header";

function LawyersDashboardScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Text style={styles.textStyle}>Hello, User</Text>
        <View style={styles.cardStyle}>
          <Text>Categories</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: COLORS.lightGray, marginTop: 5, padding: 2 }}>
            <Text style={{ color: COLORS.gray }}>Lawyer Level</Text>
            <Text style={{ fontWeight: '500' }} >A2</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: COLORS.lightGray, marginTop: 5, padding: 2 }}>
            <Text style={{ color: COLORS.gray }}>Reviews</Text>
            <Text style={{ fontWeight: '500' }} >23</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
            <Text style={{ color: COLORS.gray }}>Rating</Text>
            <View style={{ flexDirection: 'row' }} >
              <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
              <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
              <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
              <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
              <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: "center" }}>
            <View style={{ alignItems: 'center' }} >
              <View style={styles.barStyle}>
                <Text style={{fontSize: 16}} >100+</Text>
              </View>
              <Text style={{ fontSize: 14, color: COLORS.gray }} >Profile Views</Text>
            </View>
            <View style={{ alignItems: 'center', marginLeft: 10 }} >
              <View style={styles.barStyle}>
                <Text style={{fontSize: 16}} >10+</Text>
              </View>
              <Text style={{ fontSize: 14, color: COLORS.gray }} >Reviews</Text>
            </View>

            <View style={{ alignItems: 'center', marginLeft: 10 }} >
              <View style={styles.barStyle}>
                <Text style={{fontSize: 16}} >4.9</Text>
              </View>
              <Text style={{ fontSize: 14, color: COLORS.gray }} >Rating</Text>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 24, paddingVertical: 10, fontWeight: '500', marginLeft: 10 }}>Messages</Text>
        {/* <View style={{elevation: 8, shadowColor: COLORS.black, paddingVertical: 10 }}> */}
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, width: '100%', alignSelf: 'center', padding: 10, margin: 5, borderRadius: 8, elevation: 2 }} >
            <View style={{ backgroundColor: "#EB5757", padding: 15, borderRadius: 50, alignItems: 'center' }} >
              <FontAwesome name="envelope-o" size={24} color={COLORS.white} />
            </View>
            <Text style={{ marginLeft: 5 }} >You have 2 new Messages</Text>
          </View>
        {/* </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    // paddingHorizontal: 20
  },
  textStyle: {
    fontSize: 27,
    paddingVertical: 10,
    fontWeight: '500',
  },
  cardStyle: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 5,
    paddingVertical: 10,
    elevation: 2
  },
  headerContainer: {
    flexDirection: 'row',
    padding: 5,
    paddingRight: 16,
    backgroundColor: "#000000",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  barStyle: {
    borderWidth: 2.5,
    borderColor: COLORS.success,
    width: 80,
    height: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputStyle: {
    borderWidth: 1,
    padding: 4,
    color: COLORS.white,
    paddingHorizontal: 10,
    width:'90%',
    marginLeft: 2,
    borderRadius: 5,
    backgroundColor: COLORS.secondary,
}
});
export default LawyersDashboardScreen;