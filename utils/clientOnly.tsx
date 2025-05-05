import { useEffect, useState, ComponentType } from "react";

/**
 * This is a higher-order component to ensure a component is only rendered on the client side.
 * It helps prevent hydration errors when components rely on browser APIs.
 */
export function withClientOnly<P extends object>(Component: ComponentType<P>): ComponentType<P> {
  return function ClientOnlyComponent(props: P) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    if (!mounted) return null;
    
    return <Component {...props} />;
  };
}
