"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LunchieCharacter } from "./lunchie-character"

interface SplashScreenProps {
  onComplete: () => void
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  // 윙크 애니메이션을 위한 상태
  const [isWinking, setIsWinking] = useState(false)

  useEffect(() => {
    // 0.8초 후에 윙크 애니메이션 시작
    const winkTimer = setTimeout(() => {
      setIsWinking(true)
      // 0.3초 후에 윙크 애니메이션 종료
      setTimeout(() => setIsWinking(false), 300)
    }, 800)

    // 2초 후에 스플래시 화면 종료
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearTimeout(winkTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-amber-400 dark:bg-amber-500 z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* 햄버거 캐릭터 */}
        <div className="mb-6">
          <LunchieCharacter 
            width="w-48 h-48" 
            height="lg:w-56 lg:h-56" 
            isAnimated={true} 
          />
        </div>

        {/* 텍스트 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-zinc-700/80 dark:text-zinc-200/80"
        >
          오늘 점심은 뭐 먹지?
        </motion.h1>
      </motion.div>
    </motion.div>
  )
} 