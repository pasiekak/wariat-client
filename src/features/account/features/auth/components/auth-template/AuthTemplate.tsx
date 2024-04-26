import background from "../../../../../../assets/engine-dark-show.jpg";
import Logo from "../../../../../../components/logo/Logo.tsx";

import "../../styles/auth-template.css";
import "../../styles/auth-outlet.css";
import { PropsWithChildren } from "react";

const AuthTemplate = ({ children }: PropsWithChildren) => {
  return (
    <section
      className="auth-template"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Logo pathTo="/" />
      {children}
    </section>
  );
};

export default AuthTemplate;
