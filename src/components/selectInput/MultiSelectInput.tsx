import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../utils/colors'
import { AntDesign, Feather } from '@expo/vector-icons';
import { MultiSelect } from 'react-native-element-dropdown';

type Props = {
    data: Array<{ label: string, value: string }>,
    onChange: ((items: string[]) => void),
}

const MultiSelectInput = ({ data, onChange }: Props) => {
    const [selected, setSelected] = useState([]);

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Choisis ta ou tes villes..."
                value={selected}
                search
                activeColor={Colors.BLUE}
                searchPlaceholder="Search..."
                onChange={items => {
                    onChange(items);
                    setSelected(items);
                }}
                renderLeftIcon={() => (
                    <Feather
                        style={styles.icon}
                        color={Colors.WHITE}
                        name="map-pin"
                        size={20}
                    />
                )}
                renderItem={renderItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                            <AntDesign color={Colors.WHITE} name="delete" size={17} />
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View >
    );
};

export default MultiSelectInput;

const styles = StyleSheet.create({
    container: {
        width: 300,
        marginBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    dropdown: {
        alignSelf: 'stretch',
        height: 50,
        borderRadius: 12,
        borderColor: Colors.BLUE,
        borderWidth: 2,
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
    placeholderStyle: {
        fontSize: 16,
        color: Colors.WHITE
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: Colors.BLUE,
        alignItems: 'center',
        borderRadius: 14,
        shadowColor: Colors.DARKEN_BLUE,
        color: Colors.WHITE,
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
        color: Colors.WHITE,
    },
})