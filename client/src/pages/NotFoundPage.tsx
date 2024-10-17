import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <h2 className="text-4xl text-gray-600 mb-3">Page Not Found</h2>
      <p className="mb-3 text-gray-800">The page you're looking for doesn't exist.</p>
      <Button color="default" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </div>
  );
}
