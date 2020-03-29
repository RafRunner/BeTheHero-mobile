"use strict";

import React from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import * as MailComposer from "expo-mail-composer";
import formataValorReais from "../utils";
import Constants from "expo-constants";

import logoImg from "../assets/logo.png";

export default function Detalhes() {
  const navigation = useNavigation();
  const route = useRoute();

  const caso = route.params.caso;
  const message = `Olá ${
    caso.nome
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    caso.titulo
  }" com o valor de ${formataValorReais(caso.valor)}`;

  function goBack() {
    navigation.goBack();
  }

  function mandarEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${caso.titulo}`,
      recipients: [caso.email],
      body: message
    });
  }

  function mandarWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${caso.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" size={28} color="#e82041" />
        </TouchableOpacity>
      </View>
      <View style={styles.casos}>
        <View style={styles.caso}>
          <Text style={[styles.porpriedadeCaso, { marginTop: 0 }]}>ONG:</Text>
          <Text style={styles.valorCaso}>
            {caso.nome} de {caso.cidade}/{caso.uf}
          </Text>
          <Text style={styles.porpriedadeCaso}>CASO:</Text>
          <Text style={styles.valorCaso}>{caso.titulo}</Text>
          <Text style={styles.porpriedadeCaso}>Valor:</Text>
          <Text style={styles.valorCaso}>{formataValorReais(caso.valor)}</Text>
        </View>
      </View>
      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={mandarWhatsapp}>
            <Text style={styles.actionText}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={mandarEmail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
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

  casos: {
    marginTop: 48
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
    fontWeight: "bold",
    marginTop: 24
  },

  valorCaso: {
    marginTop: 8,
    fontSize: 15,
    color: "#737380"
  },

  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 16
  },

  heroTitle: {
    fontSize: 20,
    color: "#13131a",
    fontWeight: "bold"
  },

  heroDescription: {
    fontSize: 15,
    color: "#737380",
    marginTop: 16
  },

  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  action: {
    backgroundColor: "#e02041",
    borderRadius: 8,
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center"
  },

  actionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold"
  }
});
