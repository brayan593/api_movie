import React,{ useState} from 'react';
import {StyleSheet, Text, View,FlatList, TouchableOpacity, Image} from 'react-native';
import {SearchBar} from 'react-native-elements';

const Inicio = ({navigation}) => {
    const [lista,setLista]= useState([]);
    const [pelicula, setPelicula] = useState("");
    const [total,setTotal]= useState(0);
    const [consultado, setConsultado]= useState(false);


    const buscar = (peli) => {
        setConsultado(true);
        const api_url = `http://www.omdbapi.com/?s=${peli}&apikey=84070410`
        fetch(api_url)
            .then(data => {
                return data.json();
            })
            .then(resultado => {
                console.log(resultado);

                const { Search = [] } = resultado;

                setLista(Search);
                setTotal(Search.length);
                console.log(Search);
            });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Detalle', { movie: item })}
        >
            {
                item.Poster === "N/A"
                    ?
                    <Image
                        style={styles.images}
                        source={require('../imagenes/fran.jpg')}
                    />
                    :
                    <Image
                        style={styles.images}
                        source={{ uri: item.Poster }}
                    />
            }
        </TouchableOpacity>
    )

    
    return (
        <View style={styles.container}>
            <Text style={styles.texto}>
                Buscador de Peliculas
            </Text>
            <SearchBar
                round
                containerStyle={{
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                }}
                inputStyle={{ backgroundColor: 'white' }}
                onChangeText={(texto) => {
                    setPelicula(texto);
                    buscar(texto);
                }}
                onClear={() => {
                    setPelicula("");
                    setConsultado(false);
                    setLista([])
                }}
                value={pelicula}
                placeholder="Escribe aqui.."
            />
             <View style={{ margin: 10, fontSize: 20 }}>
                {
                    consultado
                        ?
                        <Text style={styles.text}>
                            Hay {total} resultados
                        </Text>
                        :
                        <Text style={styles.texto}>
                            Realiza una busqueda
                        </Text>
                }
            </View>
            <FlatList
                contentContainerStyle={{ alignItems: "center" }}
                data={lista}
                numColumns={3}
                keyExtractor={item => item.imdbID}
                renderItem={renderItem}
            />
        </View>
    );
}

export default Inicio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#4c4949',
    },
    images: {
        width: 100,
        height: 150,
        margin: 5,
        borderRadius: 10,
    },
    texto: {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        margin: 10,
        fontWeight:'bold',
    }
});
