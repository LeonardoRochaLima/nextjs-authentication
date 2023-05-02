import React from "react";
import { useRouter } from "next/router";
import { route } from "next/dist/server/router";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = React.useState({
    usuario: "leonardolima",
    senha: "leole122",
  });

  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;

    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          // router.push('/auth-page-static');
          router.push('/auth-page-ssr');
        }}
      >
        <input
          placeholder="Usuário"
          name="usuario"
          defaultValue="omariosouto"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          defaultValue="safepassword"
          value={values.senha}
          onChange={handleChange}
        />
        {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}
