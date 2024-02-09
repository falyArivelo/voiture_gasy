import { StyleSheet } from "react-native";
import Colors from "../Colors";
import { width } from "deprecated-react-native-prop-types/DeprecatedImagePropType";


const global = StyleSheet.create({
    root: {
        primaryColor: '#8E49A8',
        lightPrimary: '#f4d6ff',
        blackColor: '#000',
        grayColor: '#A1A1A1',
        // whiteColor: '#fff',
        yellowColor: '#fabd07',
        darkGrayColor: '#434347',
        bgColor: '#ededed',
        tabColor: '#A6A6A6',
        greenColor: '#7CC99A',
    },
    myFlex: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },
    myFlexSpaceBetween: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        backgroundColor: Colors.BG_COLOR

    },
    container: {
        flex: 1,
        // backgroundColor: Colors.BG_COLOR,
        // padding: 20,
        paddingTop: 10,
        // position:'relative'
    },
    myIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
        // backgroundColor: Colors.BG_COLOR,
        padding: 0,
    },

    plus: {
        backgroundColor: '#434347', // Remplace --darkgray-color
        padding: 6,
        paddingHorizontal: 15, // Ajustement pour la marge horizontale
        borderRadius: 20,
        color: '#fff', // Remplace --white-color
    },

    logo: {
        fontWeight: '700',
        fontSize: 34,
    },
    notifsContainer: {
        position: 'relative',
    },
    notifsNombre: {
        position: 'absolute',
        right: 14,
        top: 12,
        width: 10,
        height: 10,
        // padding: 3,
        // paddingHorizontal: 8,
        borderRadius: 200,
        backgroundColor: '#FF0000', // Remplace --red-color
        color: '#fff', // Remplace --white-color
        fontSize: 16,
        zIndex: 100,
        fontWeight: 'bold',
    },
    home: {
        flex: 1,
        display: 'flex',
        marginTop: 5,
        flexDirection: 'column',
        gap: 5,
        // boxShadow n'est pas directement pris en charge, vous pouvez utiliser elevation sur Android
        elevation: 1,
        backgroundColor: '#ededed', // Remplace --bg_color
    },

    card: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.BG_COLOR,
        borderRadius: 5,
        // padding: 15,
        // paddingTop: 5,
        marginBottom: 10,
        minHeight: 150,
        width: '100%',
    },
    proprietaire: {
        padding: 10,
        color: 'rgb(63, 2, 58)',
        fontSize: 18,
    },
    proprio: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        padding: 10,
    },
    pdp: {
        width: 40,
        height: 40,
        borderRadius: 100,
        overflow: 'hidden',
    },
    pdpImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    proprioName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#434347', // Remplace --darkgray-color
        width: 'auto', // Remplace max-content
    },
    imageContainer: {
        position: 'relative',
        paddingHorizontal: 5,

    },
    imageContainer_details: {
        position: 'relative',
        width: '100%',
        height: 400,
        marginBottom: 5,
        paddingHorizontal: 5,
        backgroundColor: Colors.LIGHT_GRAY
    },

    cardImage: {
        width: '100%',
        height: 400,
        borderRadius: 10,

    },

    none: {
        width: '100%',
        height: 400,
        borderRadius: 10,
        backgroundColor: Colors.LIGHT_GRAY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noneDetails: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    removeImage: {
        position: 'absolute',
        right: 3,
        top: 3,
        zIndex: 1000,
        backgroundColor: Colors.WHITE,
        borderRadius: 50,
        width: 40,
        height: 40,
        // padding:10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    // ANNONCES

    annonces: {
    },
    annonceButtons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        // backgroundColor:'red'

    },
    annonceDate: {
        position: 'absolute',
        right: 15,
        top: 5,
        color: '#A1A1A1', // Remplace --gray-color
        fontSize: 13,
    },
    informations: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 12,
    },
    marque: {
        fontSize: 21,
        fontWeight: 'bold',
        width: '100%',
        color: Colors.DARK_GRAY,

    },
    list: {
        width: '100%',
        backgroundColor: Colors.BG_COLOR,
        // paddingBottom: 350,

    },
    date: {
        textAlign: 'center',
        verticalAlign: 'middle',
        height: '100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 50,
        backgroundColor: Colors.PRIMARY,
        color: Colors.BG_COLOR,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    status: {
        position: 'absolute',
        top: 5,
        right: 0,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 10,
        // borderRadius: 50,  // Laissez ce commentaire s'il n'y a pas d'équivalent dans votre application
        backgroundColor: '#fff',  // Utilisez la couleur appropriée ou une variable si elle est définie
        color: '#000',  // Utilisez la couleur appropriée ou une variable si elle est définie
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    nombrePhotos: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        right: 5,
        paddingVertical: 3,
        paddingHorizontal: 5,
        borderRadius: 5,
        backgroundColor: '#000',
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    nombrePhotosNombre: {
        color: '#fff', // Remplace --white-color
        fontSize: 13,
    },

    flex: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    },

    descri: {
        fontSize: 16,
        color: Colors.GRAY,

    },
    prix: {
        fontSize: 20,
        fontWeight:'normal',
        color: Colors.DARK_GRAY,
    },
    profile: {
        flex: 1,
        backgroundColor: Colors.BG_COLOR,
        paddingTop: 20,
    },

    profileInformations: {
        padding: 10,
        paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profilePdp: {
        width: 80,
        height: 80,
        borderRadius: 100,
        overflow: 'hidden',
    },
    profilePdpImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileCoords: {
        paddingLeft: 5,
        marginBottom: 15,
    },
    name: {
        fontSize: 34,
    },
    email: {
        fontSize: 16,
        color: Colors.GRAY,
    },

    mesAnnonces: {
        display: 'flex',
        padding: 10,
    },
    mesAnnoncesTitre: {
        padding: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#434347', // Remplace --darkgray-color
    },
    profileModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    profileModalContent: {
        width: '100%',
        height: 280,
        backgroundColor: '#ededed', // Remplace --bg_color
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalClose: {
        position: 'absolute',
        right: 10,
        top: 0,
        zIndex: 100,
    },
    modalList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        zIndex: -1,
        paddingTop: 30,
    },
    modalListElement: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 10,
        justifyContent: 'flex-start',
        borderRadius: 5,
        backgroundColor: '#ededed', // Remplace la couleur par défaut
        zIndex: -1,
    },
    modalListElementText: {
        fontSize: 18,
        fontWeight: '600',
    },
    modalListElement_logout: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 10,
        paddingBottom: 20,
        justifyContent: 'flex-start',
        borderRadius: 5,
        backgroundColor: '#ededed', // Remplace la couleur par défaut
        zIndex: -1,
        marginBottom: 15, // Ajoutez une marge inférieure au besoin
        backgroundColor: Colors.DARK_GRAY, // Remplace --light_blue-color
        borderRadius: 15,
    },
    logout: {
        backgroundColor: '#add8e6', // Remplace --light_blue-color
        paddingVertical: 20, // Ajustez la taille du bouton
        borderRadius: 15,
    },
    logoutText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: Colors.WHITE
    },

    notifProprio: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        alignItems: 'flex-start',
        padding: 10,
    },
    notifPdp: {
        width: 45,
        height: 45,
        borderRadius: 100,
        overflow: 'hidden',
    },
    notifPdpImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    notifMessage: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '80%',
        flexWrap: 'wrap',
        padding: 2,
    },

    notificationContainer: {
        marginLeft: 5,
    },
    notificationProprioName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#434347', // Remplace --darkgray-color
    },
    notificationDescription: {
        color: '#434347', // Remplace --darkgray-color
    },
    notificationDate: {
        color: '#A1A1A1', // Remplace --gray-color
        fontSize: 13,
    },
    // FAVCARD
    favCard: {
        position: 'relative',
        width: 210,
        height: 210,
    },

    // SEARCH
    searchBar: {
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 25,
        gap: 5,
        alignItems: 'center',
        backgroundColor: '#ffffff', // Remplacez Colors.WHITE par la couleur correspondante
        borderRadius: 50,
    },
    searchBarInput: {
        backgroundColor: '#ffffff', // Remplacez Colors.WHITE par la couleur correspondante
        width: '80%',
        color: '#333333', // Remplacez Colors.PRIMARY par la couleur correspondante
        fontSize: 20,
        padding: 5,
    },
    searchBarIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#ffffff', // Remplacez Colors.WHITE par la couleur correspondante
        padding: 0,
    },
    searchBarFlatListContent: {
        paddingRight: 20,
    },
    searchBarCategoryItem: {
        borderRadius: 15,
        marginRight: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#000000', // Remplacez 'black' par la couleur correspondante
        alignItems: 'center',
    },
    categoryItemSelected: {
        backgroundColor: 'black',
    },
    categoryItemUnselected: {
        backgroundColor: 'white',
    },


    // PUBLIER
    publier: {
        paddingHorizontal: 10
    },
    publier_titre: {
        fontSize: 30,
        paddingTop: 20
    },
    uploadImage_Container: {
        width: '100%',
        height: 400,
        backgroundColor: Colors.LIGHT_PRIMARY,
        marginBottom: 5,
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        overflow: 'hidden'
    },
    pickImage_Button: {
        right: 0,
        backgroundColor: Colors.BLACK,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 20,
        paddingHorizontal: 15,
        maxWidth: 80,
        marginLeft: '80%'
    },
    pickImage_Button_text: {
        color: Colors.WHITE,
        fontSize: 25
    },
    uploadImage_Button: {
        backgroundColor: 'blue',
        padding: 20
    },
    publier_annonceForm: {
        padding: 15,
        paddingTop: 20,
        flex: 1,
        width: '100%',
        // backgroundColor: 'black',
    },
    publier_liste_marques: {
        display: 'flex',
        flexDirection: 'row',
        width: 500,
        flexWrap: 'wrap',
        padding: 5
    },

    publier_liste_marques_radio: {
        display: 'flex',
        marginBottom: 5,
        backgroundColor: Colors.WHITE,
        width: '40%',
        borderRadius: 10,
        marginLeft: 10,
    },
    publier_label: {
        fontSize: 20,
        paddingBottom: 0,
        color: Colors.DARK_GRAY,
        fontWeight: 'bold'
    },
    publier_input: {
        height: 60,
        // borderColor: Colors.LIGHT_PRIMARY,
        // borderWidth: 1,
        backgroundColor: Colors.WHITE,
        borderRadius: 3,
        padding: 10,
        marginBottom: 5,
        width: '100%',
        borderRadius: 10,
        fontSize: 16

        // backgroundColor:'red'
    },
    publier_input_descri: {
        height: 100,
        // borderColor: Colors.LIGHT_PRIMARY,
        // borderWidth: 1,
        backgroundColor: Colors.WHITE,
        borderRadius: 3,
        padding: 10,
        marginBottom: 5,
        width: '100%',
        borderRadius: 10,
        textAlignVertical: 'top',
        fontSize: 16
        // textAlign:'start'
        // backgroundColor:'red'
    },
    publier_next_button: {
        backgroundColor: Colors.DARK_GRAY,
        padding: 15,
        borderRadius: 20,
        width: '95%',
        marginBottom: 15,
        textAlign: 'center'
    },
    publier_next_button_disable: {
        backgroundColor: Colors.DARK_GRAY_disable,
        padding: 15,
        borderRadius: 20,
        width: '95%',
        marginBottom: 15,
        textAlign: 'center'
    },
    publier_next_button_text: {
        fontSize: 24,
        // fontWeight: 'bold',
        color: Colors.WHITE,
        textAlign: 'center'
    },
    publier_previous_button: {
        backgroundColor: Colors.BLUE,
        padding: 15,
        borderRadius: 20,
        width: '15%',
        marginBottom: 15,
        textAlign: 'center'
    },
    publier_previous_button_text: {
        fontSize: 24,
        // fontWeight: 'bold',
        color: Colors.WHITE,
        textAlign: 'center'
    },
    publier_apercu_button: {
        backgroundColor: Colors.BLUE,
        padding: 15,
        borderRadius: 20,
        width: 'max-content',
        marginBottom: 15,
        textAlign: 'center',
        paddingHorizontal: 50,
    },
    publier_apercu_button_disable: {
        backgroundColor: Colors.DARK_GRAY_disable,
        padding: 15,
        borderRadius: 20,
        width: 'max-content',
        marginBottom: 15,
        textAlign: 'center',
        paddingHorizontal: 50,
    },
    publier_apercu_button_text: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: Colors.WHITE,
        textAlign: 'center'
    },
    publier_vendre_button: {
        backgroundColor: Colors.BLACK,
        padding: 10,
        borderRadius: 10,
        width: 200,
        marginTop: 15,
        textAlign: 'center',
        marginLeft: 15
        // paddingHorizontal:20,
    },
    publier_vendre_button_text: {
        fontSize: 20,
        // fontWeight: 'bold',
        color: Colors.WHITE,
        textAlign: 'center'
    },
    finish: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 350,
        paddingHorizontal: 150,

    },
    finish_disable: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingVertical: 350,
        paddingHorizontal: 150,
        backgroundColor: 'red'
    },
    check: {
        backgroundColor: Colors.BLACK,
        width: 150,
        height: 150,
        borderRadius: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backUploading: {
        position: 'absolute',
        right: 10,
        top: 80,
        zIndex: 100,
    }, bgPicture: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -10
    },
    choosePdpPage: {
        height: '92%',
        backgroundColor: Colors.BG_COLOR,
        padding: 100,
        display: 'flex',
        // justifyContent:'center',
        alignItems: 'center'

    },
    choosePdp: {
        // marginTop: 500,
        // paddingTop: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupPdp: {
        width: 250,
        height: 250,
        borderRadius: 250,
        overflow: 'hidden',
        backgroundColor: Colors.GRAY, position: 'relative',
        zIndex: -1
    },
    signupPdpImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', zIndex: -10
    },
    signupPdpvide: {
        width: 250,
        height: 250,
        borderRadius: 250,
        overflow: 'hidden',
        backgroundColor: Colors.GRAY
    },
    removePdpImage: {
        position: 'relative',
        left: 10,
        bottom: -40,
        zIndex: 1000,
        backgroundColor: Colors.WHITE,
        borderRadius: 50,
        width: 40,
        height: 40,
        // padding:10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    choosePdpText: {
        fontSize: 35,
        textAlign: 'center',
        padding: 20,
        color: Colors.GRAY,
        fontWeight: 'bold'
    },
    dcategoryList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        paddingBottom:0
    },
    dcategoryItem: {
        backgroundColor: Colors.LIGHT_BLUE,
        color: Colors.WHITE,
        padding: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginRight: 10,
        // marginBottom: 10,
        fontSize: 18,
    },
    additionalDetails: {
        // marginVertical: 20,
        padding: 20,
        paddingBottom: 50,
        // backgroundColor:'red'r
    },
    detailsSection: {
        marginBottom: 20,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailsName: {
        color: Colors.GRAY, // Assuming your gray color is similar to #888
        fontSize: 14,
    },
    detailsValue: {
        color: Colors.DARK_GRAY, // Assuming your black color is similar to #000
        fontSize: 18,
        fontWeight: 'bold',
    },
    erreur: {
        // backgroundColor:'red',
        // padding:40,
        width:'95%'
    },
    messageErreur:{
        color: Colors.ERREUR,
        paddingHorizontal:15,

    },
    messageErreur_center:{
        color: Colors.ERREUR,
        textAlign:'center',
        fontSize:30
    }

})

export default global;