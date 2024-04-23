import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import ButtonShadow from '../components/ButtonShadow';
import { updateUser } from '../data/reducer/userReducer';
import { Constant } from '../utils/constant';
import { Colors } from '../utils/colors';
import citiesData from '../data/cities.json'
import { CapitalizeData } from '../utils/verification';
import MultiSelectInput from '../components/MultiSelectInput';

const RegisterSchoolAndLocalization = () => {

    const [data, setData] = useState<string[]>([""]);

    const dispatch = useDispatch();

    const handleData = (items: Array<string>) => {
        setData(items);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Tu viens</Text>
            <Text style={[styles.text, { color: Colors.BLUE, marginBottom: Constant.MARGIN_BOTTOM_TITLE }]}>d'où ?</Text>
            <MultiSelectInput
                onChange={handleData}
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
                    dispatch(updateUser({ localisations: data }));
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