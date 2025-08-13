'use client'

import type { FC, ReactNode } from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface LayoutProps {
  children : ReactNode
}

const queryClient = new QueryClient()



const Layout : FC<LayoutProps> = ({children}) => {
  return <>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </>;
}

export default Layout