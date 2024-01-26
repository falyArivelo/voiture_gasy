import React from 'react'
import { Text, View, FlatList, Pressable, TouchableOpacity } from 'react-native'
import { Image } from 'react-native';
import infos from '../Shared/notifications'
import global from './../Shared/style/style';

const notifications = infos.notifications;

const Notifications = () => {

    const Notification = ({ notification }) => {
        return (
            <View style={global.notifProprio}>
                <View style={global.notifPdp}>
                    <Image style={global.notifPdpImage}
                        source={{ uri: notification.photo }}
                    />
                </View>
                <Text style={global.notifMessage}>
                    <Text style={global.notificationProprioName}> {notification.nom} </Text>
                    <Text style={global.notificationDescription}> {notification.description} </Text>
                    <Text style={global.notificationDate}> {notification.date} </Text>
                </Text>
            </View>
        )
    }

    return (
        <View>
            <View className="flex">
            </View>
            <FlatList
                style={global.list}
                decelerationRate={0.2}
                ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
                data={notifications}
                renderItem={({ item }) => <Notification notification={item} />}
            />
        </View>
    )
}

export default Notifications