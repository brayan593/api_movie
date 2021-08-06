import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Inicio from '../components/Inicio';
import Detalle from '../components/Detalle';

const Stack = createStackNavigator();

export default function StackNavigator1(){
    return(
        <Stack.Navigator>
            <Stack.Screen
               name="Inicio"
               component={Inicio}
               options={{headerShown: false}}
            />

            <Stack.Screen
                name="Detalle"
                component={Detalle}
                options={({route})=>({
                    title: route.params.movie.Title
                })

                }
                    
            />


        </Stack.Navigator>
    )
}