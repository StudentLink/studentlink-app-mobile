import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ButtonShadow from '../components/Button/ButtonShadow';
import { updateUser } from '../data/reducer/userReducer';
import { Constant } from '../utils/constant';
import { Colors } from '../utils/colors';
import citiesData from '../data/cities.json'
import { CapitalizeData } from '../utils/verification';
import MultiSelectInput from '../components/selectInput/MultiSelectInput';
import SingleSelectInput from '../components/selectInput/singleSelectInput';
import { SchoolType } from '../types/Schooltype';
import * as SecureStore from 'expo-secure-store'

const RegisterSchoolAndLocalization = async () => {

    const [data, setData] = useState<string[]>([""]);
    const [school, setSchool] = useState<{ label: string, value: string }[]>([{ label: "", value: "" }]);
    const [schoolData, setSchoolData] = useState<{ label: string, value: string }>({ label: "", value: "" });

    const dispatch = useDispatch();

    const handleMultipleData = (items: Array<string>) => {
        setData(items);
    }

    const handleSingleData = (item: { label: string, value: string }) => {
        setSchoolData(item);
    }

    const getSchoolData = async () => {
        try {
            const response = await fetch('https://studentlink.etudiants.ynov-bordeaux.com/api/schools')
            const json = await response.json();
            setSchool(json.map((school: SchoolType) => ({ label: school.name, value: school.id })))
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSchoolData();
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tu viens</Text>
            <Text style={[styles.text, { color: Colors.BLUE, marginBottom: Constant.MARGIN_BOTTOM_TITLE }]}>d'où ?</Text>
            <SingleSelectInput data={school} onChange={handleSingleData} />
            <MultiSelectInput
                onChange={handleMultipleData}
                data={citiesData.map(city => (
                    {
                        label: `${city.zip_code} - ${CapitalizeData(city.label)}`
                        , value: parseInt(city.insee_code)
                    }
                ))}
            />
            <ButtonShadow
                label='Suivant'
                onClick={() => {
                    dispatch(updateUser({ localisations: data, schoolId: schoolData.value }));
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