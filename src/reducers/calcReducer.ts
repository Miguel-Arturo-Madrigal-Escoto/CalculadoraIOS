

interface CalcState {
    numero:         string;
    numeroAnterior: string;
}

type CalcAction = 
    | { type: 'reset' } 
    | { type: 'build-number', payload: string } 
    | { type: 'set-number', payload: string }
    | { type: 'set-prev', payload: string } 
    | { type: 'set-both', payload: CalcState }; 

export const calcReducer = (state: CalcState, action: CalcAction): CalcState => {
    switch(action.type)
    {
        case 'reset':
            return {
                ...state,
                numero: '0',
                numeroAnterior: '0'
            };
        
        case 'build-number':
            return {
                ...state,
                numero: state.numero += action.payload
            } 

        case 'set-number':
            return {
                ...state,
                numero: action.payload
            } 

        case 'set-prev':
            return {
                ...state,
                numeroAnterior: action.payload
            } 

        case 'set-both':
            return {
                ...state,
                numeroAnterior: action.payload.numeroAnterior,
                numero: action.payload.numero,
            } 

        default:
            return state;
    }
}