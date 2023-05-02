import React from "react";
import { useRouter } from "next/router";
import { authServices } from "../src/services/auth/authService";

export default function HomeScreen() {
  const router = useRouter();
  const [values, setValues] = React.useState({
    usuario: "leonardolima",
    senha: "safepassword",
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
          //onSubmit -> Controller (pega dados do usuário e passa pra um serviço)
          //authService -> Serviço
          event.preventDefault();
          authServices
            .login({
              username: values.usuario,
              password: values.senha,
            })
            .then(() => {
              // router.push('/auth-page-static');
              router.push("/auth-page-ssr");
            })
            .catch(() => {
              alert("Usuário ou a senha estão inválidos");
            });
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
