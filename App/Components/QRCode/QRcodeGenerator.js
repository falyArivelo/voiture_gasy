import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import global from '../../Shared/style/style';
import moment from 'moment';

const QRcodeGenerator = ({ navigation, route }) => {

    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId =setCurrentDateTime(new Date());
    }, []);

    const data = {
        "email": "arivelo@gmail.com",
        "dateTime": moment(currentDateTime).format('YYYY-MM-DD HH:mm')
    };

    return (
        <View style={global.center}>
            <QRCode value={JSON.stringify(data)} size={300} />
            {/* <View >
                <Text style={global.h5}>{data.dateTime}</Text>
            </View> */}

        </View>
    );
};

export default QRcodeGenerator;
