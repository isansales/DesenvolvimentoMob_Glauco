import { FontAwesome } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Remove a barra branca do topo padrão do navegador */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* Cabeçalho superior */}
      <View style={styles.customHeader}>
        <Text style={styles.headerTitle}>Sobre</Text>
      </View>

      {/* Conteúdo Principal Centralizado */}
      <View style={styles.mainContent}>
        
        <Image 
          source={require('../assets/images/imagem.jpeg')}
          style={styles.logo}
        />
        
        <Text style={styles.title}>Pokemon Quiz</Text>
        <Text style={styles.subtitle}>Explorando o universo dos jogos</Text>

        {/* Bloco de informações centralizado */}
        <View style={styles.infoBlock}>
          <View style={styles.infoRow}>
            <FontAwesome name="gamepad" size={24} color="#FFD700" />
            <Text style={styles.infoText}>Versão: 1.0.0</Text>
          </View>

          <View style={styles.infoRow}>
            <FontAwesome name="users" size={20} color="#FFD700" />
            <Text style={styles.infoText}>Desenvolvido por: Game Dev Team</Text>
          </View>
        </View>

        {/* BOTÃO PARA VOLTAR À HOME (Página Principal) */}
        <Link href="/" asChild>
          <Pressable style={styles.buttonBack}>
            <Text style={styles.buttonText}>Quiz</Text>
          </Pressable>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D3436', // Cor de fundo escura
  },
  contentContainer: {
    flexGrow: 1,
  },
  customHeader: {
    backgroundColor: '#1c1c1c',
    width: '100%',
    padding: 20,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  headerTitle: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',    // Centraliza horizontalmente
    justifyContent: 'center', // Centraliza verticalmente
    paddingVertical: 40,
  },
  logo: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#BDC3C7',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 40,
    textAlign: 'center',
  },
  infoBlock: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 30, // Espaço antes do botão de voltar
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '80%',
    justifyContent: 'center',
  },
  infoText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 15,
  },
  buttonBack: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#1c1c1c',
    fontWeight: 'bold',
    fontSize: 16,
  }
});