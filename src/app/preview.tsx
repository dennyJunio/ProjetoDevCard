import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Tipagem dos parâmetros recebidos
type SearchParams = {
  nome: string;
  cargo: string;
  empresa?: string;
  anos: string;
  tecnologia: string;
  cor: string;
};

export default function Preview() {
  const router = useRouter();
  const params = useLocalSearchParams<SearchParams>();

  const { nome, cargo, empresa, anos, tecnologia, cor } = params;

  // Lógica condicional para Cor do Cartão
  let cardBgColor = '#2980b9'; // Default Azul
  if (cor === 'Verde') cardBgColor = '#27ae60';
  if (cor === 'Roxo') cardBgColor = '#8e44ad';

  // Lógica condicional para a Badge de Experiência
  const anosNum = parseInt(anos || '0', 10);
  let nivel = 'Júnior';
  let badgeColor = '#95a5a6'; // Cinza

  if (anosNum >= 3 && anosNum <= 5) {
    nivel = 'Pleno';
    badgeColor = '#2980b9'; // Azul
  } else if (anosNum >= 6) {
    nivel = 'Sênior';
    badgeColor = '#f1c40f'; // Dourado
  }

  // Captura a primeira letra do nome para o Avatar
  const primeiraLetra = nome ? nome.charAt(0).toUpperCase() : 'D';

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Seu Cartão</Text>

      {/* Cartão Estilizado */}
      <View style={[styles.card, { backgroundColor: cardBgColor }]}>
        <View style={styles.avatar}>
          <Text style={[styles.avatarText, { color: cardBgColor }]}>
            {primeiraLetra}
          </Text>
        </View>

        <Text style={styles.cardNome}>{nome}</Text>
        <Text style={styles.cardCargo}>
          {cargo} {empresa ? `at ${empresa}` : ''}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.cardTechTitle}>Especialista em</Text>
        <Text style={styles.cardTech}>{tecnologia}</Text>

        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{nivel}</Text>
        </View>
        <Text style={styles.cardAnos}>{anosNum} anos de experiência</Text>
      </View>

      {/* Botões de Ação */}
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Editar dados</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.finalBtn} 
          onPress={() => router.replace('/sucesso')}
        >
          <Text style={styles.finalBtnText}>Finalizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 24,
    justifyContent: 'space-between',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#333',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  cardNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  cardCargo: {
    fontSize: 14,
    color: '#E0E0E0',
    marginBottom: 16,
    textAlign: 'center',
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
  },
  cardTechTitle: {
    fontSize: 12,
    color: '#E0E0E0',
    textTransform: 'uppercase',
  },
  cardTech: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 6,
  },
  badgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardAnos: {
    fontSize: 11,
    color: '#E0E0E0',
  },
  actions: {
    gap: 12,
    marginBottom: 20,
  },
  backButton: {
    borderWidth: 1,
    borderColor: '#6C5CE7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#6C5CE7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finalBtn: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  finalBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});