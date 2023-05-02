export const authServices = {
  async login({ username, password }) {
    return fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(async (repostaDoServidor) => {
        if (!repostaDoServidor.ok) throw new Error("Usuário ou senha inválidos!");
        const body = await repostaDoServidor.json();
        console.log(body);
      })
  },
};
