/* eslint-disable react/no-unescaped-entities */
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full overflow-hidden bg-pattern">
      <main className="w-full max-w-full overflow-hidden">{children}</main>
    </div>
  );
};

export default Layout;
