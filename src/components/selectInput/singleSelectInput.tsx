import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../utils/colors';

type Props = {
    data: Array<{ label: string, value: string }>
    onChange: ((item: { label: string, value: string }) => void)
    icon: string,
}

const SingleSelectInput = ({ data, onChange, icon }: Props) => {
    const [selected, setSelected] = useState('');

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === selected && (
                    <Ionicons
                        style={styles.icon}
                        color={Colors.DARKEN_BLUE}
                        name="checkmark"
                        size={25}
                    />
                )}
            </View>
        );
    };

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Choisis ton école"
            searchPlaceholder="Recherche ton école..."
            value={selected}
            onChange={item => {
                onChange(item);
                setSelected(item.value);
            }}
            renderLeftIcon={() => (
                <Ionicons style={styles.icon} color={Colors.DARKEN_BLUE} name={icon} size={25} />
            )}
            renderItem={renderItem}
        />
    );
};

export default SingleSelectInput;

const styles = StyleSheet.create({
    dropdown: {
        width: 300,
        margin: 16,
        height: 50,
        backgroundColor: Colors.BLUE,
        borderRadius: 12,
        padding: 12,
        shadowColor: Colors.DARK_BLUE,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
    },
    placeholderStyle: {
        fontSize: 20,
    },
    selectedTextStyle: {
        fontSize: 20,
        fontWeight: '600',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});