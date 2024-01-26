import React from 'react'
import global from '../Shared/style/style'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, TextInput, ScrollView } from 'react-native'

const PublierInformation = () => {
    const [text, setText] = useState('');

    const handleInputChange = (input) => {
        setText(input);
    }

    return (
        <View>
            <View>
                <Text style={global.publier_label}>Marque</Text>
                <TextInput
                    style={global.publier_input}
                    onChangeText={handleInputChange}
                    value={text}
                />
            </View>
            <View>
                <Text style={global.publier_label}>Model</Text>
                <TextInput
                    style={global.publier_input}
                    onChangeText={handleInputChange}
                    value={text}
                />
            </View>
            <View>
                <Text style={global.publier_label}>Prix</Text>
                <TextInput
                    style={global.publier_input}
                    onChangeText={handleInputChange}
                    value={text}
                />
            </View>
            <View>
                <Text style={global.publier_label}>Description</Text>
                <TextInput
                    style={global.publier_input}
                    onChangeText={handleInputChange}
                    value={text}
                />
            </View>
            <View>
                <Text style={global.publier_label}>Label</Text>
                <TextInput
                    style={global.publier_input}
                    onChangeText={handleInputChange}
                    value={text}
                />
            </View>
            <View>
                <Text style={global.publier_label}>Label</Text>
                <TextInput
                    style={global.publier_input}
                    onChangeText={handleInputChange}
                    value={text}
                />
            </View>
            <View>
                <Text style={global.publier_label}>Label</Text>
                <TextInput
                    style={global.publier_input}
                    onChangeText={handleInputChange}
                    value={text}
                />
            </View>
            <View>
                <Text style={global.publier_label}>Label</Text>
                <TextInput
                    style={global.publier_input}
                    onChangeText={handleInputChange}
                    value={text}
                />
            </View>

        </View>
    )
}

export default PublierInformation