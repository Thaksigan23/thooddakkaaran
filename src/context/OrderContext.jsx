"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react"

const OrderContext = createContext(null)

const EMPTY_CUSTOMER = {
  name: "",
  phone: "",
  delivery: "",
  notes: "",
}

export function OrderProvider({ children }) {
  const [items, setItems] = useState([])
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const triggerRef = useRef(null)

  const totalItemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const getQuantity = useCallback(
    (key) => items.find((item) => item.key === key)?.quantity ?? 0,
    [items]
  )

  const addItem = useCallback((key) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { key, quantity: 1 }]
    })
  }, [])

  const setQuantity = useCallback((key, quantity) => {
    const next = Math.max(0, Math.min(99, quantity))
    setItems((prev) => {
      if (next === 0) {
        return prev.filter((item) => item.key !== key)
      }
      const existing = prev.find((item) => item.key === key)
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: next } : item
        )
      }
      return [...prev, { key, quantity: next }]
    })
  }, [])

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((item) => item.key !== key))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setCustomer(EMPTY_CUSTOMER)
  }, [])

  const setCustomerField = useCallback((field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }))
  }, [])

  const openDrawer = useCallback((trigger = null) => {
    if (trigger instanceof HTMLElement) {
      triggerRef.current = trigger
    }
    setDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    const trigger = triggerRef.current
    if (trigger && typeof trigger.focus === "function") {
      requestAnimationFrame(() => trigger.focus())
    }
    triggerRef.current = null
  }, [])

  const value = useMemo(
    () => ({
      items,
      customer,
      drawerOpen,
      totalItemCount,
      getQuantity,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      setCustomerField,
      openDrawer,
      closeDrawer,
    }),
    [
      items,
      customer,
      drawerOpen,
      totalItemCount,
      getQuantity,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      setCustomerField,
      openDrawer,
      closeDrawer,
    ]
  )

  return (
    <OrderContext.Provider value={value}>
      {children}
      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        data-testid="order-cart-announcer"
      >
        {totalItemCount > 0
          ? `${totalItemCount} item${totalItemCount === 1 ? "" : "s"} in order`
          : ""}
      </div>
    </OrderContext.Provider>
  )
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrder must be used within OrderProvider")
  }
  return context
}
