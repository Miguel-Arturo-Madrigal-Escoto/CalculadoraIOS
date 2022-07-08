import { View, Text } from 'react-native';
import React, { useReducer, useRef } from 'react';
import { styles } from '../theme/appTheme';
import { BotonCalc } from '../components/BotonCalc';
import { calcReducer } from '../reducers/calcReducer';

enum Operadores {
    suma,
    resta,
    multiplicacion,
    division
}

export const CalculadoraScreen = () => {

    const [{ numero, numeroAnterior }, dispatch] = useReducer(calcReducer, {
        numero: '0',
        numeroAnterior: '0'
    });

    // El useRef al cambiar su valor no vuelve a renderizar el componente/screen
    const ultimaOperacion = useRef<Operadores>();

    const clear = () => {
        dispatch({
            type: 'reset'
        }); 
    }

    const buildNumber = ( numTexto: string ) => {
        // Validar solo 1 punto decimal
        if (numero.includes('.') && numTexto === '.') return;

        // No permitir multiples 0 o -0
        if ((numero.startsWith('0') || numero.startsWith('-0')) && numTexto === '0') return;

        // Reemplazar el 0 por n
        if(numero === '0' && !isNaN(Number(numTexto))){
            dispatch({
                type: 'set-number',
                payload: numTexto
            });
        }

        // Reemplazar el -0 por -n
        else if(numero == '-0' && !isNaN(Number(numTexto))){
            dispatch({
                type: 'set-number',
                payload: '-' + numTexto
            });
        }

        // Lo demas, concatenarlo al numero
        else {
            dispatch({
                type: 'build-number',
                payload: numTexto
            });
        }

    }

    const cambiarNumPorAnterior = () => {
        if (numero.endsWith('.')){
            dispatch({
                type: 'set-prev',
                payload: numero.slice(0, -1)
            });
        } else {
            dispatch({
                type: 'set-prev',
                payload: numero
            });
        }
        dispatch({
            type: 'set-number',
            payload: '0'
        });
    }

    const btnOperacion = (operador: string) => {
        cambiarNumPorAnterior();

        switch (operador) {
            case '/':
                ultimaOperacion.current = Operadores.division;
                break;
            case 'X':
                ultimaOperacion.current = Operadores.multiplicacion;
                break;
            case '-':
                ultimaOperacion.current = Operadores.resta;
                break;
            case '+':
                ultimaOperacion.current = Operadores.suma;
                break;
        }
    }

    // Borrar el ultimo caracter al hacer click
    const btnDel = () => {
        let negativo = (numero.includes('-'))? '-' : '';
        let numeroTemp = (numero.includes('-'))? numero.substring(1) : numero;

        dispatch({
            type: 'set-number',
            payload: (numeroTemp.length > 1) 
                     ? `${ negativo }${ numeroTemp.slice(0, -1) }` : '0'
        });
    }

    const positiveNegative = () => {
        dispatch({
            type: 'set-number',
            payload: (numero.includes('-'))
                     ? numero.replace('-', '')
                     : '-' + numero
        });
    }

    const calcular = () => {
        const num1 = Number(numero);
        const num2 = Number(numeroAnterior);

        // Ignorar si ambos numeros son 0
        if(num1 === 0 && num2 === 0) return;

        // Validar, no permitir hacer operaciones si no hay un num2 (num de arriba)
        if (num1 && !num2){
            return dispatch({
                type: 'set-number',
                payload: `${ num1 }`
            });
        }

        switch (ultimaOperacion.current) {
            case Operadores.suma:
                dispatch({
                    type: 'set-number',
                    payload: `${ num2 + num1 }`
                });
                break;

            case Operadores.resta:
                dispatch({
                    type: 'set-number',
                    payload: `${ num2 - num1 }`
                });
                break;

            case Operadores.multiplicacion:
                dispatch({
                    type: 'set-number',
                    payload: `${ num2 * num1 }`
                });
                break;

            case Operadores.division:
                if (isFinite(num2 / num1)){
                    dispatch({
                        type: 'set-number',
                        payload: `${ num2 / num1 }`
                    });
                }
                break;

        }
        dispatch({
            type: 'set-prev',
            payload: '0'
        });
    }

    return (
        <View style={ styles.calculadoraContainer }>
            {
                (numeroAnterior !== '0') && (
                    <Text style={ styles.resultadoPequeno }>{ numeroAnterior }</Text>
                )
            }
            <Text 
                style={ styles.resultado }
                numberOfLines={ 1 }
                adjustsFontSizeToFit
            >
                { numero }
            </Text>
            {/*  Fila de botones en row */}
            <View style={ styles.fila }>
                <BotonCalc texto="C" color="#9B9B9B" accion={ clear } />
                <BotonCalc texto="+/-" color="#9B9B9B" accion={ positiveNegative } />
                <BotonCalc texto="del" color="#9B9B9B"  accion={ btnDel } />
                <BotonCalc texto="/" color="#FF9427" accion={ btnOperacion } />
            </View>
            <View style={ styles.fila }>
                <BotonCalc texto="7" accion={ buildNumber } />
                <BotonCalc texto="8" accion={ buildNumber } />
                <BotonCalc texto="9" accion={ buildNumber } />
                <BotonCalc texto="X" color="#FF9427" accion={ btnOperacion } />
            </View>
            <View style={ styles.fila }>
                <BotonCalc texto="5" accion={ buildNumber } />
                <BotonCalc texto="6" accion={ buildNumber } />
                <BotonCalc texto="7" accion={ buildNumber } />
                <BotonCalc texto="-" color="#FF9427" accion={ btnOperacion } />
            </View>
            <View style={ styles.fila }>
                <BotonCalc texto="1" accion={ buildNumber } />
                <BotonCalc texto="2" accion={ buildNumber } />
                <BotonCalc texto="3" accion={ buildNumber } />
                <BotonCalc texto="+" color="#FF9427" accion={ btnOperacion } />
            </View>
            <View style={ styles.fila }>
                <BotonCalc texto="0" accion={ buildNumber } ancho  />
                <BotonCalc texto="." accion={ buildNumber } />
                <BotonCalc texto="=" color="#FF9427" accion={ calcular } />
            </View>
        </View>
    )
}