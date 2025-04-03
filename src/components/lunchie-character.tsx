"use client"

import { useState, useEffect } from "react"

interface LunchieCharacterProps {
  width?: string
  height?: string
  isAnimated?: boolean
  className?: string
}

export function LunchieCharacter({
  width = "w-40 h-40",
  height = "lg:w-48 lg:h-48",
  isAnimated = false,
  className = ""
}: LunchieCharacterProps) {
  // 윙크 애니메이션을 위한 상태
  const [isWinking, setIsWinking] = useState(false)

  useEffect(() => {
    if (isAnimated) {
      // 0.8초 후에 윙크 애니메이션 시작
      const winkTimer = setTimeout(() => {
        setIsWinking(true)
        // 0.3초 후에 윙크 애니메이션 종료
        setTimeout(() => setIsWinking(false), 300)
      }, 800)

      return () => {
        clearTimeout(winkTimer)
      }
    }
  }, [isAnimated])

  return (
    <div className={`${width} ${height} relative ${className}`}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* 상단 번 */}
        <path
          d="M20,35 C20,30 80,30 80,35 L80,40 C80,45 20,45 20,40 L20,35"
          fill="#E67E22"
        />
        <path
          d="M20,35 C20,25 80,25 80,35"
          fill="#E67E22"
        />
        
        {/* 토마토 */}
        <path
          d="M28,48 C28,45 42,45 42,48 C42,51 28,51 28,48"
          fill="#E74C3C"
        />
        <path
          d="M58,48 C58,45 72,45 72,48 C72,51 58,51 58,48"
          fill="#E74C3C"
        />
        
        {/* 상추 */}
        <path
          d="M25,50 C25,47 75,47 75,50 C75,53 25,53 25,50"
          fill="#2ECC71"
        />
        
        {/* 하단 번 */}
        <path
          d="M20,60 C20,55 80,55 80,60 L80,80 C80,85 20,85 20,80 L20,60"
          fill="#E67E22"
        />
        <path
          d="M20,65 C20,60 80,60 80,65"
          fill="none"
          stroke="#5E4B28"
          strokeWidth="2"
        />
        
        {/* 참깨 */}
        <circle cx="30" cy="37" r="1.5" fill="#5E4B28" />
        <circle cx="45" cy="39" r="1.5" fill="#5E4B28" />
        <circle cx="60" cy="37" r="1.5" fill="#5E4B28" />
        <circle cx="70" cy="40" r="1.5" fill="#5E4B28" />
        
        <path
          d="M30,83 L70,83"
          stroke="#5E4B28"
          strokeWidth="1"
        />
        
        {/* 햄버거 얼굴 */}
        {/* 왼쪽 눈 */}
        <circle cx="40" cy="70" r="2.5" fill="#4A4A4A" />
        
        {/* 오른쪽 눈 (윙크하는 애니메이션) */}
        {isWinking ? (
          <path
            d="M60,70 C58,68 62,68 60,70"
            stroke="#4A4A4A"
            strokeWidth="2"
            fill="none"
          />
        ) : (
          <circle cx="60" cy="70" r="2.5" fill="#4A4A4A" />
        )}
        
        {/* 입 */}
        <path
          d="M45,75 C45,78 55,78 55,75"
          stroke="#4A4A4A"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  )
} 