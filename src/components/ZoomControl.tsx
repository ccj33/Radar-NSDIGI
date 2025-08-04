import { useState, useEffect } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ZoomControl() {
  const [zoom, setZoom] = useState(100)

  const applyZoom = (value: number) => {
    const clamped = Math.max(50, Math.min(150, value))
    setZoom(clamped)
    
    // Aplicar zoom no body
    document.body.style.zoom = `${clamped}%`
    
    // Salvar no localStorage
    localStorage.setItem('dashboard-zoom', clamped.toString())
  }

  const resetZoom = () => {
    applyZoom(100)
  }

  useEffect(() => {
    // Carregar zoom salvo do localStorage
    const savedZoom = localStorage.getItem('dashboard-zoom')
    if (savedZoom) {
      const zoomValue = parseInt(savedZoom, 10)
      if (zoomValue >= 50 && zoomValue <= 150) {
        applyZoom(zoomValue)
      }
    }
  }, [])

  return (
    <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => applyZoom(zoom - 10)}
        className="h-7 w-7 p-0 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        title="Diminuir Zoom"
        disabled={zoom <= 50}
      >
        <Minus className="w-3 h-3" />
      </Button>
      
      <span className="w-12 text-center text-sm font-medium text-gray-700 select-none">
        {zoom}%
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => applyZoom(zoom + 10)}
        className="h-7 w-7 p-0 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        title="Aumentar Zoom"
        disabled={zoom >= 150}
      >
        <Plus className="w-3 h-3" />
      </Button>
      
      <div className="w-px h-4 bg-gray-300 mx-1"></div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={resetZoom}
        className="h-7 px-2 text-xs font-medium hover:text-blue-600 hover:bg-blue-50 transition-colors"
        title="Redefinir Zoom"
      >
        Redefinir
      </Button>
    </div>
  )
} 