import axios from "axios";

const base = "https://rxnav.nlm.nih.gov";

export const getDrugs = (value) => {
  return axios.get(`${base}/REST/drugs.json?name=${value}`).then(({ data }) => {
    return data;
  });
};

export const getSpellingSuggestions = (value) =>
  axios
    .get(`${base}/REST/spellingsuggestions.json?name=${value}`)
    .then(({ data }) => {
      return data;
    });

export const getNDCs = (value) =>
  axios.get(`${base}/REST/rxcui/${value}/ndcs.json`).then(({ data }) => {
    return data;
  });
