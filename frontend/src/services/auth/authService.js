import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "./tokenService";

export const authServices = {
  async login({ username, password }) {
    return HttpClient(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/login`, {
      method: "POST",
      body: { username, password },
    }).then(async (repostaDoServidor) => {
      if (!repostaDoServidor.ok) throw new Error("Usuário ou senha inválidos!");
      const body = repostaDoServidor.body;
      console.log(body.data.access_token);

      tokenService.save(body.data.access_token);
    });
  },

  async getSession(ctx) {
    const token = tokenService.get(ctx);
    return HttpClient(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/session`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if(!response.ok) throw new Error("Não autorizado!")
      return response.body.data;
    });
  },
};
