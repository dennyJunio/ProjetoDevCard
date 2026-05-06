import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { useRouter } from 'expo-router';

export default function Cadastro() {
  const router = useRouter();

  // Estados dos campos
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [anos, setAnos] = useState('');
  const [tecnologia, setTecnologia] = useState('');
  const [cor, setCor] = useState('Azul'); // Valor padrão padrão

  // Estados de erro
  const [erros, setErros] = useState<{ [key: string]: string }>({});

  const validarFormulario = () => {
    let errosAtuais: { [key: string]: string } = {};

    if (!nome.trim() || nome.trim().length < 3) {
      errosAtuais.nome = 'Nome obrigatório (mínimo 3 caracteres).';
    }
    if (!cargo.trim()) {
      errosAtuais.cargo = 'Cargo é obrigatório.';
    }
    const anosNum = parseInt(anos, 10);
    if (!anos.trim() || isNaN(anosNum) || anosNum <= 0) {
      errosAtuais.anos = 'Anos de experiência deve ser maior que 0.';
    }
    if (!tecnologia.trim()) {
      errosAtuais.tecnologia = 'Tecnologia favorita é obrigatória.';
    }

    setErros(errosAtuais);
    return Object.keys(errosAtuais).length === 0;
  };

  const handleGerarCartao = () => {
    if (validarFormulario()) {
      router.push({
        pathname: '/preview',
        params: { nome, cargo, empresa, anos, tecnologia, cor },
      });
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.subtitle}>Preencha seus dados de dev</Text>

        {/* Nome */}
        <Text style={styles.label}>Nome completo *</Text>
        <TextInput 
          style={[styles.input, erros.nome && styles.inputError]} 
          value={nome} 
          onChangeText={setNome} 
          placeholder="Ex: João Silva"
        />
        {erros.nome && <Text style={styles.errorText}>{erros.nome}</Text>}

        {/* Cargo */}
        <Text style={styles.label}>Cargo *</Text>
        <TextInput 
          style={[styles.input, erros.cargo && styles.inputError]} 
          value={cargo} 
          onChangeText={setCargo} 
          placeholder="Ex: Desenvolvedor Mobile"
        />
        {erros.cargo && <Text style={styles.errorText}>{erros.cargo}</Text>}

        {/* Empresa */}
        <Text style={styles.label}>Empresa (opcional)</Text>
        <TextInput 
          style={styles.input} 
          value={empresa} 
          onChangeText={setEmpresa} 
          placeholder="Ex: Tech Solutions"
        />

        {/* Anos de Experiência */}
        <Text style={styles.label}>Anos de experiência *</Text>
        <TextInput 
          style={[styles.input, erros.anos && styles.inputError]} 
          value={anos} 
          onChangeText={setAnos} 
          keyboardType="numeric" 
          placeholder="Ex: 4"
        />
        {erros.anos && <Text style={styles.errorText}>{erros.anos}</Text>}

        {/* Tecnologia Favorita */}
        <Text style={styles.label}>Tecnologia favorita *</Text>
        <TextInput 
          style={[styles.input, erros.tecnologia && styles.inputError]} 
          value={tecnologia} 
          onChangeText={setTecnologia} 
          placeholder="Ex: React Native"
        />
        {erros.tecnologia && <Text style={styles.errorText}>{erros.tecnologia}</Text>}

        {/* Cor do Cartão */}
        <Text style={styles.label}>Cor do cartão *</Text>
        <View style={styles.radioContainer}>
          {['Azul', 'Verde', 'Roxo'].map((opcao) => (
            <TouchableOpacity
              key={opcao}
              style={[
                styles.radioButton,
                cor === opcao && styles.radioButtonSelected
              ]}
              onPress={() => setCor(opcao)}
            >
              <View style={[
                styles.radioCircle, 
                opcao === 'Azul' && { backgroundColor: '#2980b9' },
                opcao === 'Verde' && { backgroundColor: '#27ae60' },
                opcao === 'Roxo' && { backgroundColor: '#8e44ad' }
              ]} />
              <Text style={styles.radioLabel}>{opcao}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleGerarCartao}>
          <Text style={styles.buttonText}>Gerar Cartão</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 4,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#6C5CE7',
    backgroundColor: '#F3EFFFF',
  },
  radioCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#6C5CE7',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});