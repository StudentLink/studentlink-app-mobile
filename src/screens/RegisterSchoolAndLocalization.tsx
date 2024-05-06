import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ButtonShadow from '../components/Button/ButtonShadow';
import { Constant } from '../utils/constant';
import { Colors } from '../utils/colors';
import citiesData from '../data/cities.json'
import { CapitalizeData, ValidateDataSchoolAndLocalization } from '../utils/verification';
import MultiSelectInput from '../components/selectInput/MultiSelectInput';
import SingleSelectInput from '../components/selectInput/singleSelectInput';
import SchoolType from '../data/customTypes/School';
import * as SecureStore from 'expo-secure-store'
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/Button/BackButton';
import decodeToken from '../utils/decodeToken';

const RegisterSchoolAndLocalization = () => {

    const navigation = useNavigation();

    const [localisations, setLocalisations] = useState<string[]>([""]);
    const [school, setSchool] = useState<{ label: string, value: string }[]>([{ label: "", value: "" }]);
    const [schoolData, setSchoolData] = useState<string>('');

    const getSchoolData = async () => {
        try {
            const response = await fetch('https://studentlink.etudiants.ynov-bordeaux.com/api/schools')
            const json = await response.json();
            setSchool(json.map((school: SchoolType) => ({ label: school.name, value: `${school.id}` })))
        } catch (error) {
            console.error(error);
        }
    }

    const setLocalisationsAndSchoolforUser = async () => {
        const token = decodeToken();
        if (!token) return;
        try {
            const response = await fetch(`https://studentlink.etudiants.ynov-bordeaux.com/api/users/${token.sub}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (await SecureStore.getItemAsync('token'))

                },
                body: JSON.stringify({
                    locations: localisations,
                    school: schoolData,
                })
            });
            const json = await response.json();
            if (json.message) {
                alert(json.message);
                return;
            }
            navigation.navigate('HomePage');
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSchoolData();
    }, []);

    return (
        <View style={styles.container}>
            <BackButton />
            <Text style={styles.text}>Tu viens</Text>
            <Text style={[styles.text, { color: Colors.BLUE, marginBottom: Constant.MARGIN_BOTTOM_TITLE }]}>d'où ?</Text>
            <SingleSelectInput data={school} onChange={({ value }) => setSchoolData(value)} icon='school-outline' />
            <MultiSelectInput
                onChange={setLocalisations}
                data={citiesData.map(city => (
                    {
                        label: `${city.zip_code} - ${CapitalizeData(city.label)}`
                        , value: parseInt(city.insee_code)
                    }
                ))}
            />
            <ButtonShadow
                label='Valider'
                onClick={() => {
                    if (ValidateDataSchoolAndLocalization(localisations, schoolData)) {
                        setLocalisationsAndSchoolforUser();
                    }
                }} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DARKEN_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: Colors.WHITE,
        fontWeight: '900',
        fontSize: Constant.TITLE_SIZE,
        textAlign: 'center',
    },
    subtitle: {
        color: Colors.WHITE,
        fontWeight: '600',
        fontSize: Constant.SUBTITLE_SIZE,
        marginBottom: Constant.MARGIN_BOTTOM_SUBTITLE,
    }
});

export default RegisterSchoolAndLocalization;