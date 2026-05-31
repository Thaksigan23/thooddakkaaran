"use client"

import { OrderProvider } from "../../context/OrderContext"
import OrderDrawer from "./OrderDrawer"

export default function OrderShell({ children }) {
  return (
    <OrderProvider>
      {children}
      <OrderDrawer />
    </OrderProvider>
  )
}
