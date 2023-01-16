import React, { Component } from 'react';
import {Modal, StyleSheet, TextInput, TouchableOpacity, Text, View } from 'react-native';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            modal: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    onPress = () => {
        this.setState({
            value: this.state.input,
            modal: !this.state.modal
        });
    };

    render() {
        return (
            <View style={{alignItems:'flex-end',flexDirection:'row-reverse'}}>
                <Modal
                    animationType="slide"
                    visible={this.state.modal}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        this.setState({ modal: false });
                    }}
                >
                    <View style={styles.container }>
                        <View>
                            <Text style={[styles.setFontMedium ]}>Category</Text>
                        </View>
                        <View>
                            <Text style={[styles.setFontMedium]}>Description</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            editable
                            multiline
                            numberOfLines={15}
                            placeholder={"                                                                               "}
                            onChangeText={(text) => this.setState({ input: text })}
                            value={this.state.input}
                        />
                        <TouchableOpacity style={styles.button} onPress={this.onPress}>
                            <Text style={[styles.setFontSubmitB]}>Submit</Text>
                        </TouchableOpacity>
                        <View>
                            <Text>{this.state.value}</Text>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onPress}
                >
                    <Text style={styles.setFontSubmitB}>M</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000000',
        borderWidth: 1,
        marginLeft: 25,
        marginRight: 25,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 20,
        marginBottom: 20,
        marginTop:30,
    },
    setFontMedium: {
        fontSize: 50,
        marginBottom: 10,
        marginTop: 10,
    },
    setFontSubmitB: {
        fontSize: 30,
        marginLeft: 5,
        marginRight: 5,
    },
    input: {
        height: 200,
        width: 350,
        borderWidth: 1,
        padding: 10,
        fontSize: 18,
        textAlign: 'left',
        textAlignVertical: 'top',
        flex: 1
    },
});

export default App;