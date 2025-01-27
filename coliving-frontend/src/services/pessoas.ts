import api from "../api";
import { Pessoa } from "./interface";
import * as qs from "qs";

export async function listarPessoas(filtros = {}): Promise<Pessoa[]> {
  const queryString = qs.stringify(filtros, { encode: true });
  console.log(queryString);
  const url = `/api/pessoas${queryString ? `?${queryString}` : ""}`;
  const response = await api.get(url);
  return response.data;
}

export const criarPessoa = async (
  novaPessoa: Omit<Pessoa, "id" | "dataDeCadastro">
): Promise<Pessoa> => {
  const response = await api.post(`/api/pessoas/`, novaPessoa);
  return response.data;
};

export async function obterPessoa(id: string): Promise<Pessoa> {
  const response = await api.get(`/api/pessoas/${id}`);
  return response.data;
}

export async function atualizarPessoa(
  id: string,
  atualizada: Partial<Pessoa>
): Promise<Pessoa> {
  const response = await api.put(`/api/pessoas/${id}`, atualizada);
  return response.data;
}

export async function deletarPessoa(id: string): Promise<void> {
  await api.delete(`/api/pessoas/${id}`);
}

export async function importarPessoas(): Promise<void> {
  await api.post(`/api/pessoas/importar`);
}
