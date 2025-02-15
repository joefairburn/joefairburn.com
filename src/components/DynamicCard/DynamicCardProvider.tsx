'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { getKey } from './util'

export const DynamicCardContext = createContext<{
  components: {
    component: ReactNode
    link: string
    title: string
  }[]
  history: {
    component: ReactNode
    link: string
    title: string
    key: number | string
  }[]
  currentPage: {
    component: ReactNode
    link: string
    title: string
    key: number | string
  }
  goToLink: (link: string) => void
  goBack: () => void
  firstPage: string
}>({
  components: [],
  history: [],
  currentPage: {
    component: null,
    link: '',
    title: '',
    key: ''
  },
  goToLink: () => {},
  goBack: () => {},
  firstPage: ''
})

export const DynamicCardProvider = ({
  children,
  components,
  firstPage
}: {
  children: ReactNode
  components: {
    component: ReactNode
    link: string
    title: string
  }[]
  firstPage: string
}) => {
  const firstComponent =
    components.find((c) => c.link === firstPage) ?? components[0]

  const [history, setHistory] = useState<
    {
      component: ReactNode
      link: string
      title: string
      key: number | string
    }[]
  >([{ ...firstComponent, key: getKey(firstComponent.link) }])
  const goBack = () => {
    setHistory((prev) => prev.slice(0, -1))
  }

  const goToLink = (link: string) => {
    if (link === history[history.length - 1].link) {
      return
    }

    const component = components.find((c) => c.link === link)
    if (!component) {
      throw new Error(`Component not found for link: ${link}`)
    }

    setHistory((prev) => [
      ...prev,
      { ...component, key: getKey(component.link) }
    ])
  }

  return (
    <DynamicCardContext.Provider
      value={{
        components,
        history,
        goToLink,
        currentPage: history[history.length - 1],
        goBack,
        firstPage
      }}
    >
      {children}
    </DynamicCardContext.Provider>
  )
}

export const useDynamicCard = () => {
  const context = useContext(DynamicCardContext)

  if (!context) {
    throw new Error(
      'useDynamicCard must be used within a DynamicCardProvider'
    )
  }

  return context
}
