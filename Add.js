import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import datasource from './Data';

const Add = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');

    const addItem = () => {
        const newItem = {
            id: (datasource.length + 1).toString(),
            name,
            price: parseFloat(price),
            quantity: parseInt(quantity),
            category,
            image,
        };
        datasource.push(newItem);
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Add Item</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Item Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter name"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Price:</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={setPrice}
                        placeholder="Enter price"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Quantity:</Text>
                    <TextInput
                        style={styles.input}
                        value={quantity}
                        onChangeText={setQuantity}
                        placeholder="Enter quantity"
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Image URL:</Text>
                    <TextInput
                        style={styles.input}
                        value={image}
                        onChangeText={setImage}
                        placeholder="Enter image URL"
                    />
                    {image ? (
                        <Image source={{ uri: image }} style={styles.image} />
                    ) : null}
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
                        style={{
                            inputAndroid: styles.input,
                            inputIOS: styles.input,
                        }}
                    />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={addItem}>
                    <Text style={styles.buttonText}>Save Item</Text>
                </TouchableOpacity>
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
    saveButton: {
        backgroundColor: '#6B2D26',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Add;
