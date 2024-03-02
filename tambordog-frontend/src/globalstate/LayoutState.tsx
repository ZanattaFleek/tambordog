import React, { useState } from "react"

export interface LayoutStateInterface {
  titulo: string
}

export function useLayoutState() {
  const [layoutState, setLayoutState] = useState<LayoutStateInterface>({
    titulo: "Titulo do APP",
  })

  return { layoutState, setLayoutState }
}
