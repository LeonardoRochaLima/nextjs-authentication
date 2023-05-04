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
};
