/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, ReactNode } from "react";

interface ClientSideOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * This component ensures its children are only rendered on the client side,
 * which helps prevent hydration errors when components rely on browser APIs.
 */
const ClientSideOnly: React.FC<ClientSideOnlyProps> = ({ 
  children, 
  fallback = null 
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <>{children}</> : <>{fallback}</>;
};

export default ClientSideOnly;
