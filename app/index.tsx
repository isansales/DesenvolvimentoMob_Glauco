import axios from 'axios';
import { Link, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

interface Pokemon {
  name: string;
  image: string;
}

export default function QuizScreen() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Rastreia quais opções o usuário já clicou
  const [clickedOptions, setClickedOptions] = useState<string[]>([]);
  // Rastreia se o usuário já acertou (para evitar múltiplos carregamentos)
  const [hasWon, setHasWon] = useState(false);

  const fetchWrongOptions = async (correctName: string) => {
    let wrongNames = new Set<string>();
    while (wrongNames.size < 3) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (response.data.name !== correctName) {
        wrongNames.add(response.data.name);
      }
    }
    return Array.from(wrongNames);
  };

  const loadQuiz = async () => {
    setLoading(true);
    setClickedOptions([]); // Reseta as tentativas
    setHasWon(false);      // Reseta o estado de vitória
    try {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const correctName = response.data.name;
      const wrongNames = await fetchWrongOptions(correctName);
      const allOptions = [correctName, ...wrongNames].sort(() => Math.random() - 0.5);

      setPokemon({ 
        name: correctName, 
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomId}.png` 
      });
      setOptions(allOptions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const handlePress = (item: string) => {
    // Se já acertou, não faz nada até carregar o próximo
    if (hasWon) return;

    // Adiciona o item clicado à lista de tentativas
    if (!clickedOptions.includes(item)) {
      setClickedOptions((prev) => [...prev, item]);
    }

    if (item === pokemon?.name) {
      setHasWon(true);
      // Se acertar, espera um pouco e pula para o próximo
      setTimeout(() => {
        loadQuiz();
      }, 1000);
    }
  };

  if (loading && !pokemon) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz Pokemon</Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: pokemon?.image }} style={styles.pokemonImage} />
        </View>

        <Text style={styles.questionText}>Qual é esse Pokémon?</Text>

        <View style={styles.optionsContainer}>
          {options.map((item, index) => {
            const wasClicked = clickedOptions.includes(item);
            const isCorrect = item === pokemon?.name;
            
            // Lógica de Cores:
            let buttonStyle = styles.button;
            if (wasClicked) {
              buttonStyle = isCorrect ? styles.buttonSuccess : styles.buttonError;
            }

            return (
              <Pressable 
                key={index} 
                style={buttonStyle}
                onPress={() => handlePress(item)}
                // Desativa o botão apenas se ele já foi clicado ou se já acertou
                disabled={wasClicked || hasWon}
              >
                <Text style={styles.buttonText}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Link href="/about" asChild>
          <Pressable style={styles.backLink}>
            <Text style={styles.backText}>Voltar ao Início</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#2D3436' },
  contentContainer: { flexGrow: 1, justifyContent: 'space-between' },
  header: { backgroundColor: '#1c1c1c', padding: 20, paddingTop: 50 },
  headerTitle: { color: '#FFD700', fontSize: 20, fontWeight: 'bold' },
  mainContent: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imageContainer: { marginBottom: 20 },
  pokemonImage: { width: 200, height: 200, resizeMode: 'contain' },
  questionText: { color: '#FFF', fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  optionsContainer: { width: '100%', alignItems: 'center' },
  button: {
    backgroundColor: '#FFC300',
    width: '80%',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonSuccess: {
    backgroundColor: '#2ECC71', // Verde
    width: '80%',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonError: {
    backgroundColor: '#E74C3C', // Vermelho
    width: '80%',
    padding: 15,
    borderRadius: 25,
    marginBottom: 10,
    alignItems: 'center',
    opacity: 0.8, // Deixa o botão errado um pouco mais "apagado"
  },
  buttonText: { color: '#000', fontSize: 18, fontWeight: 'bold', textTransform: 'capitalize' },
  footer: { alignItems: 'center', paddingBottom: 40 },
  backLink: { padding: 10 },
  backText: { color: '#BDC3C7', fontSize: 16, textDecorationLine: 'underline' }
});