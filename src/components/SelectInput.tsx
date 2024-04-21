import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { Colors } from '../utils/colors'

type Props = {}

const SelectInput = (props: Props) => {

    const [selected, setSelected] = React.useState([]);

    return (
        <View>
            <MultipleSelectList
                search={true}
                placeholder='Select an option...'
                label='Localisation'
                setSelected={(val) => setSelected(val)}
                data={[
                    { label: 'Option 1', value: 'option1' },
                    { label: 'Option 2', value: 'option2' },
                    { label: 'Option 3', value: 'option3' },
                ]}
                boxStyles={styles.boxStyles}
                labelStyles={styles.labelStyles}
                inputStyles={styles.inputStyles}
                dropdownTextStyles={styles.dropdownItemTextStyles}
                checkBoxStyles={styles.checkboxStyles}

            />
        </View>
    )
}

export default SelectInput

const styles = StyleSheet.create({
    boxStyles: {
        borderColor: Colors.BLUE,
        borderWidth: 2,
        borderRadius: 10,
        width: 300,
        height: 50,
        marginBottom: 20,
    },
    labelStyles: {
        color: Colors.BLUE,
        fontSize: 20,
    },
    inputStyles: {
        color: 'white',
        fontSize: 20,
    },
    dropdownItemStyles: {
        backgroundColor: 'transparent',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
    },
    dropdownItemTextStyles: {
        color: 'white',
        fontSize: 20,
    },
    checkboxStyles: {
        backgroundColor: 'transparent',
        borderColor: 'white',
    },
    closeIcon: {
        color: 'white',
    }

})