import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

const API_KEY = ''
const BASE_URL = 'https://superheroapi.com/api/'

export default function App() {
  const [name, setName] = useState('')
  const [firstAppearance, setFirstAppearance] = useState('')
  const [publisher, setPublisher] = useState('')
  const [aligment, setAligment] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getSuperHeroData = async (randNmbr) => {
    const url = BASE_URL + API_KEY + '/' + randNmbr
    try {
      const response = await fetch(url)
      if (response.ok){
        const json = await response.json()
        setName(json.name)
        setFirstAppearance(json.biography['first-appearance'])
        setPublisher(json.biography.publisher)
        setAligment(json.biography.alignment)
        setImgUrl(json.image.url)
      } else {
        setError("Can't get SuperHero data! :( ")
      }
    } catch(error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const randHeroSetter = () => {
    const number = Math.floor(Math.random()*731) + 1
    getSuperHeroData(number)
  }

  const handlePress = () => {
    setLoading(true)
    randHeroSetter()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.head}>Random SuperHero</Text>
      {error ? (
        <>
        <Text style={styles.text}>{error}</Text>
        <Text style={styles.text}>Try again later..</Text>
        </>
      ) : (
        <>
          {name === '' ? (
            <Text style={styles.text}>Press button to start!</Text>
          ) : (
            <>  
              <Text style={styles.text}>
                {loading ? 'Loading name...' : `Name: ${name}`}
              </Text>
              <Text style={styles.text}>
                {loading ? 'Trying to remember where first met...' : `First time seen on: ${firstAppearance}`}
              </Text>
              <Text style={styles.text}>
                {loading ? 'Loading publisher...' : `Publisher: ${publisher}`}
              </Text>
              <Text style={styles.text}>
                {loading ? 'Was it good or bad?' : `Alignment: ${aligment}`}
              </Text>
  
              {loading ? (
                <Text style={styles.text}>Loading image...</Text>
              ) : imgUrl ? (
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: imgUrl,
                  }}
                />
              ) : (
                <Text style={styles.text}>No image found</Text>
              )}
            </>
          )}
        </>
      )}
      <Button title="Next" onPress={handlePress} />
      <StatusBar style="auto" />
    </View>
  );
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    color: 'white',
    fontSize: 32,
    marginBottom:24,
  },
  text: {
    color: 'white',
    marginBottom: 16,
    fontSize: 18,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginTop: 24,
    marginBottom: 24,
  }
});
