import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import datasource from './Data';

const Edit = ({ route, navigation }) => {
    const { item } = route.params;
    const [name, setName] = useState(item.name);
    const [price, setPrice] = useState(item.price.toString());
    const [quantity, setQuantity] = useState(item.quantity.toString());
    const [image, setImage] = useState(item.image);
    const [category, setCategory] = useState(item.category);

    const saveChanges = () => {
        const itemIndex = datasource.findIndex((data) => data.id === item.id);
        if (itemIndex !== -1) {
            datasource[itemIndex] = { ...item, name, price: parseFloat(price), quantity: parseInt(quantity), category, image };
        }
        navigation.navigate('Home');
    };

    const deleteItem = () => {
        Alert.alert('Delete Item', 'Are you sure you want to delete this item?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Yes',
                onPress: () => {
                    const itemIndex = datasource.findIndex((data) => data.id === item.id);
                    if (itemIndex !== -1) {
                        datasource.splice(itemIndex, 1);
                    }
                    navigation.navigate('Home');
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Edit Item</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Item Name:</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Price:</Text>
                    <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Quantity:</Text>
                    <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Image URL:</Text>
                    <TextInput style={styles.input} value={image} onChangeText={setImage} />
                    {image ? <Image source={{ uri: image }} style={styles.image} /> : null}
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Category:</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setCategory(value)}
                        placeholder={{ label: "Select a category", value: null }}
                        items={[
                            { label: "Fruits", value: "Fruits" },
                            { label: "Vegetables", value: "Vegetables" },
                            { label: "Snacks", value: "Snacks" },
                            { label: "Cooking", value: "Cooking" },
                            { label: "Beverages", value: "Beverages" },
                        ]}
                        value={category}
                        style={{
                            inputAndroid: styles.input,
                            inputIOS: styles.input,
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                        <Text style={styles.buttonText}>Save Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={deleteItem}>
                        <Text style={styles.buttonText}>Delete Item</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headerContainer: {
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: 'center',
        marginTop: 15,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#6B2D26',
    },
    form: {
        padding: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#6B2D26',
    },
    fieldContainer: {
        borderWidth: 1,
        borderColor: '#6B2D26',
        borderRadius: 10,
        backgroundColor: '#FFF',
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    input: {
        borderWidth: 0,
        borderColor: 'transparent',
        padding: 10,
        borderRadius: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
        alignSelf: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between buttons
        marginTop: 10,
    },
    saveButton: {
        flex: 1, // Take up equal space
        backgroundColor: '#6B2D26',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginRight: 5, // Space between buttons
    },
    deleteButton: {
        flex: 1, // Take up equal space
        backgroundColor: '#F47C57',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 5, // Space between buttons
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Edit;
