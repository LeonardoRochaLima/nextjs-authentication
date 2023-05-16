import { authServices } from "./authService";

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

  export default withSession