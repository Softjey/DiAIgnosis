import { useContext, useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../store/userContext";
import { users } from "../store/users";
import { EyeButton } from "../components/buttons/EyeButton";

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validate = (email: string, password: string) => {
    if (
      password === users.find((user) => user.email.toLowerCase() === email.toLowerCase())?.password
    ) {
      return true;
    }

    return false;
  };

  return (
    <form className="flex flex-col items-center">
      <h1 className="text-6xl font-medium mb-6">Login</h1>
      <div className="flex flex-col w-60 flex-wrap md:flex-nowrap gap-3 mb-3">
        <Input
          type="email"
          size="sm"
          autoComplete="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <Input
          size="sm"
          type={isPasswordVisible ? "text" : "password"}
          label="Password"
          autoComplete="current-password"
          isInvalid={isPasswordError}
          errorMessage="Password is incorrect"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          onBlur={(e) => {
            if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.value === "") {
              setIsPasswordError(false);
            }
          }}
          endContent={
            <EyeButton
              isClosed={!isPasswordVisible}
              className="focus:outline-none h-full"
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          }
        />
      </div>

      <Button
        onClick={() => {
          if (validate(email, password)) {
            setUser(users.find((user) => user.email === email) ?? null);
            navigate("/consultation");
          } else {
            setIsPasswordError(true);
          }
        }}
        variant="solid"
        size="md"
        color="primary"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginPage;
