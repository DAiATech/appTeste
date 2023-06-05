import React, { useEffect, useState, useContext } from 'react';
import { styles } from './style';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import url from '../../services/url';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, Entypo } from '@expo/vector-icons';
import {
    SafeAreaView,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
    StatusBar,
    Alert,

} from 'react-native';

import { getUserData } from '../../components/userData';
import Load from '../../components/Load';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import api from '../../services/api';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { useIsFocused } from '@react-navigation/native';

export default function UserProfile() {
    const navigation = useNavigation();

    /*  const [nome, setNome] = useState(null);
     const [email, setEmail] = useState(null);
     const [imgProfile, setImgProfile] = useState(null); 
 
      async function setarDados() {
         const valorNome = await AsyncStorage.getItem('@nome');
         setNome(valorNome);
 
         const nomeUrl = await AsyncStorage.getItem('@email');
         setEmail(nomeUrl.substring(1, nomeUrl.length - 1));
 
         const valorImg = await AsyncStorage.getItem('@imgProfileNome');
         setImgProfile(JSON.parse(valorImg));
 
         console.log({ imgProfile })
     }
     setarDados(); */
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserData();
            setUserData(data);
        };
        fetchUserData();
    }, []);
    return (
        <SafeAreaProvider style={styles.container}>
            <View style={styles.containerHeader}>
                <View style={styles.headerBackground}>
                    <TouchableOpacity
                        style={styles.menu}
                        onPress={() => navigation.push("Home")}
                    >
                        <Ionicons name="md-arrow-back-circle-outline" size={35} color="#000" style={styles.returnBtn}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.headerFooter}>
                    <Image style={styles.profilePicture} source={{
                        uri: url + "/tccBackupTeste/BD/tatuadores/imgsTatuadores" + "/" + userData?.imagem
                    }} />
                    <Text style={styles.headerUserName}>
                        {userData?.name}
                    </Text>
                </View>
            </View>
            <View style={styles.mainConatiner}>
                <View style={styles.userDataContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                        <FontAwesome name="map-marker" size={24} color="white" />
                        <Text style={styles.userDataText}>Cidade: Registro</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                        <Entypo name="drop" size={24} color="white" style={{ marginLeft: -5, }} />
                        <Text style={styles.userDataText}>Nome: {userData?.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                        <AntDesign name="hearto" size={25} color="white" style={{ marginLeft: -5, }} />
                        <Text style={styles.userDataText}>Preferências: fineline, Tribal</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                        <MaterialCommunityIcons name="cake" size={24} color="white" style={{ marginLeft: -5, }} />
                        <Text style={styles.userDataText}> Nasceu: 30/02/2005 </Text>
                    </View>
                </View>
            </View>
        </SafeAreaProvider>
    );
};