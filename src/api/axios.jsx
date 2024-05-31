import axios from 'axios'

export const api = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'https://api-ibama-kxuh4cg6oa-uw.a.run.app',
})
