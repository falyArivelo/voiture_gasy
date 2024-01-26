import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Pressable } from 'react-native'
import { StyleSheet } from 'react-native'
import Colors from '../../Shared/Colors';
import infos from '../../Shared/tasks';

const tasks = infos.taches;

const Tasks = ({ navigation }) => {

    const [dateEntree, setDateEntree] = useState('');
    const [resultat, setResultat] = useState('');

    function calculerDifference() {
        const dateEntreeObjet = new Date(dateEntree);
        const dateAujourdHui = new Date();
        const differenceJours = Math.floor((dateAujourdHui - dateEntreeObjet) / (1000 * 60 * 60 * 24));
        if (differenceJours === 0) {
            setResultat("aujourd'hui");
        } else if (differenceJours === 1) {
            setResultat('hier');
        } else {
            setResultat(`Il y a ${differenceJours} jours`);
        }
    };
    useEffect(() => {
        dateAjd()
      }, []);


    function dateAjd() {
        let date = new Date();
        let formattedDate = date.toISOString().split('T')[0];
        setDateEntree("2023-12-02");
        calculerDifference();
    }

    function formatHour(notFormatedDate) {
        // let timestamp = "2023-12-05T10:30:00.000Z";
        let timestamp = notFormatedDate;

        let date = new Date(timestamp);

        let hours = date.getHours();
        let minutes = date.getMinutes();

        let formattedTime = `${hours}h${minutes}`;

        return formattedTime;
    }

    const Task = ({ task }) => {

        return (
            <Pressable
                onPress={() => navigation.navigate('TaskDetails', task)}>
                <View style={styles.task}>
                    <View style={styles.flex}>
                        <Text style={styles.entete} >{task.entete}</Text>
                        <View style={styles.hours}>
                            <Text style={styles.hour}>{formatHour(task.dateDebut)}</Text>
                            <Text style={styles.hour}>{formatHour(task.dateFin)}</Text>
                        </View>
                    </View>
                    <Text style={styles.descri}>{task.descri}</Text>
                    <Text style={styles.status}>{task.etat}</Text>
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.flex}>
                <Text style={styles.h1}>Annonces</Text>
                <Text style={styles.date}>{resultat}</Text>
            </View>
            <FlatList
                style={styles.list}
                data={tasks}
                renderItem={({ item }) => <Task task={item} style={styles.task} />}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    list: {
        padding: 15

    },
    h1: {
        fontSize: 27,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingLeft: 20
    },
    task: {
        backgroundColor: Colors.WHITE,
        borderRadius: 5,
        padding: 15,
        paddingTop: 5,
        marginBottom: 10,
        minHeight: 150,
        // borderWidth: 1,
        // borderColor: 'black',
        // borderStyle: 'solid',
    },
    entete: {
        fontSize: 23,
        fontWeight: 'bold',
        width: '80%',
        // borderWidth: 1,
        // borderColor: 'black',
        // borderStyle: 'solid',
    }, date: {
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 50,
        backgroundColor: Colors.PRIMARY,
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        // borderWidth: 1,
        // borderColor: 'black',
        // borderStyle: 'solid',
    },
    status: {
        position: 'absolute',
        bottom: 5,
        left: 5,
        padding: 3,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 50,
        backgroundColor: Colors.GREEN,
        color: Colors.WHITE,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    hours: {
        alignSelf: 'flex-start',
        // borderWidth: 1,
        // borderColor: 'black',
        // borderStyle: 'solid',
        width: '20%',
        fontSize: 20,
        color: "red"

    },
    hour: {
        fontSize: 20,
        color: Colors.YELLOW
    },
    descri: {
        fontSize: 18
    }

});

export default Tasks