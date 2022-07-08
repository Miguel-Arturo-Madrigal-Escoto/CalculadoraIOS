import { Text, StyleSheet, Animated, Pressable } from 'react-native'
import React  from 'react'


export const BotonCalc: React.FC<{ 
    texto: string, 
    color?: string, 
    ancho?: boolean,
    accion: ( arg0: string ) => void
}> = ({ texto, color = '#2D2D2D', ancho = false, accion }) => {
    
    const opacity = new Animated.Value(1);

    // 1: NORMAL
    // 0: NOT VISIBLE
   
    const fadeIn = () => {
        // se hara un poco transparente al hacer click
        Animated.timing(opacity, {
            toValue: 0.4,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    const fadeOut = () => {
        // al soltar el click, si ira a clasi transparent
        Animated.timing(opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    return (
        <Pressable
            onPressIn={ fadeIn }
            onPressOut={ fadeOut }
            onPress={ () => accion(texto) } 
        >
            <Animated.View style={{ 
                ...styles.btn, 
                backgroundColor: color,
                width: ancho ? 160 : 70,
                opacity
            }}>
                <Text style={{
                    ...styles.btnTexto,
                    color: color === '#9B9B9B' ? '#000' : '#fff'
                }}>{ texto }</Text>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    btn: {
        width: 70,
        height: 70,
        borderRadius: 100,
        justifyContent: 'center', 
        marginHorizontal: 10
    },
    btnTexto: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },  
});

