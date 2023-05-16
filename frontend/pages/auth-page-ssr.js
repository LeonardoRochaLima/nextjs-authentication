import { redirect } from "next/dist/server/api-utils";
import { authServices } from "../src/services/auth/authService";
import { tokenService } from "../src/services/auth/tokenService";

function AuthPageSSR(props) {
  return (
    <div>
      <h1>Auth Page Server Side Render</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}

export default AuthPageSSR;

//Decorator Patter
function withSession(funcao) {
  return async (ctx) => {
    try {
      const session = await authServices.getSession(ctx);
      const modifiedContext = {
        ...ctx,
        req: {
          ...ctx.req,
          session,
        },
      };
      return funcao(modifiedContext);
    } catch (err) {
      return {
        redirect: {
          permanent: false,
          destination: "/?error=401",
        },
      };
    }
  };
}

export const getServerSideProps = withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});

// export async function getServerSideProps(ctx) {
//   try {
//     const session = await authServices.getSession(ctx);
//     return {
//       props: {
//         session,
//       },
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/?error=401",
//       },
//     };
//   }
// }
