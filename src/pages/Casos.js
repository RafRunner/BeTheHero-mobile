"use strict";

import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import api from "../services/api";
import Constants from "expo-constants";

import logoImg from "../assets/logo.png";
import formataValorReais from "../utils";

export default function Casos() {
  const [casos, setCasos] = useState([]);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function goToDetalhes(caso) {
    navigation.navigate("Detalhes", { caso });
  }

  async function carregarCasos() {
    if (loading) {
      return;
    }

    if (total > 0 && casos.length === total) {
      return;
    }

    setLoading(true);

    const response = await api.get("casos", {
      params: { page: pagina }
    });

    setCasos([...casos, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPagina(pagina + 1);
    setLoading(false);
  }

  useEffect(() => {
    carregarCasos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem-vindo!</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        style={styles.casos}
        data={casos}
        keyExtractor={caso => String(caso.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={carregarCasos}
        onEndReachedThreshold={0.7}
        renderItem={({ item: caso }) => (
          <View style={styles.caso}>
            <Text style={styles.porpriedadeCaso}>ONG:</Text>
            <Text style={styles.valorCaso}>{caso.nome}</Text>
            <Text style={styles.porpriedadeCaso}>CASO:</Text>
            <Text style={styles.valorCaso}>{caso.titulo}</Text>
            <Text style={styles.porpriedadeCaso}>Valor:</Text>
            <Text style={styles.valorCaso}>
              {formataValorReais(caso.valor)}
            </Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => goToDetalhes(caso)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={16} color="#e02141" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Constants.statusBarHeight + 20
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  headerText: {
    fontSize: 15,
    color: "#737380"
  },

  headerTextBold: {
    fontWeight: "bold"
  },

  title: {
    fontSize: 30,
    marginBottom: 16,
    marginTop: 48,
    color: "#13131a",
    fontWeight: "bold"
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#737380"
  },

  casos: {
    marginTop: 32
  },

  caso: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16
  },

  porpriedadeCaso: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold"
  },

  valorCaso: {
    marginTop: 8,
    fontSize: 15,
    marginBottom: 24,
    color: "#737380"
  },

  detailsButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  detailsButtonText: {
    color: "#e02041",
    fontSize: 15,
    fontWeight: "bold"
  }
});
