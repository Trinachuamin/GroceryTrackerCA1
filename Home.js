import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import datasource from './Data';

const Home = ({ navigation }) => {
    const [items, setItems] = useState(datasource);
    const [searchQuery, setSearchQuery] = useState('');

    const calculateTotalCost = () => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    const adjustQuantity = (id, delta) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const categoryEmojis = {
        Fruits: '🍎',
        Vegetables: '🥦',
        Snacks: '🍪',
        Cooking: '🍳',
        Beverages: '🥤',
    };

    const groupedItems = items.reduce((grouped, item) => {
        if (!grouped[item.category]) {
            grouped[item.category] = [];
        }
        grouped[item.category].push(item);
        return grouped;
    }, {});

    const renderCategory = (category) => (
        <View key={category}>
            <Text style={styles.categoryTitle}>
                {categoryEmojis[category]} {category}
            </Text>
            <FlatList
                data={groupedItems[category]}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.categoryList}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Edit', { item })}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}> ${item.price.toFixed(2)}/kg</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    onPress={() => adjustQuantity(item.id, -1)}
                    style={styles.quantityButton}
                >
                    <MaterialIcons name="remove" size={20} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                    onPress={() => adjustQuantity(item.id, 1)}
                    style={styles.quantityButton}
                >
                    <MaterialIcons name="add" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const groupedFilteredItems = filteredItems.reduce((grouped, item) => {
        if (!grouped[item.category]) {
            grouped[item.category] = [];
        }
        grouped[item.category].push(item);
        return grouped;
    }, {});

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Grocery Tracker 🛒</Text>
            <TextInput
                style={styles.searchBar}
                placeholder="🔍 Search for an item..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {Object.keys(groupedFilteredItems).map(renderCategory)}
            </ScrollView>
            <View style={styles.footer}>
                <Text style={styles.totalText}>💰 Total: ${calculateTotalCost()}</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('Add')}
                >
                    <MaterialIcons name="add" size={28} color="white" />
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
    scrollContent: {
        paddingBottom: 80, // Ensure there's space for the footer
    },
    header: {
        marginTop: 40,
        fontSize: 26,
        fontWeight: 'bold',
        color: '#6B2D26',
        textAlign: 'center',
        marginVertical: 15,
    },
    searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        margin: 15,
        fontSize: 16,
        backgroundColor: '#F9F9F9',
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#6B2D26',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        textAlign: 'center',
        alignSelf: 'center',
        marginHorizontal: 15,
        marginVertical: 10,
        overflow: 'hidden',
        width: 370,
    },
    categoryList: {
        paddingHorizontal: 15,
    },
    card: {
        width: 175,
        marginRight: 15,
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 10,
        borderWidth: 1,
        borderColor: '#6B2D26',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20,
    },
    image: {
        width: 140,
        height: 120,
        borderRadius: 8,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        textAlign: 'center',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginVertical: 5,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        backgroundColor: '#6B2D26',
        padding: 5,
        borderRadius: 5,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 10,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#6B2D26',
        padding: 15,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    addButton: {
        backgroundColor: '#F47C57',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Home;
