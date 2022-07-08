import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center'
    },
    calculadoraContainer: {
        paddingRight: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end' ,
    },
    resultado: {
        color: '#fff',
        fontSize: 60,
        alignSelf: 'flex-end',
        paddingRight: 10,
        marginBottom: 5
    },
    resultadoPequeno: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 30,
        alignSelf: 'flex-end',
        paddingRight: 10,
    },
    fila: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 18,
    },

});