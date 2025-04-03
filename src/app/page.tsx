"use client"

import { useState, useEffect } from "react"
import { MapPin, ChevronDown, Sun, Moon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { SplashScreen } from "@/components/splash-screen"
import { AnimatePresence, motion } from "framer-motion"
import { LunchieCharacter } from "@/components/lunchie-character"

// Sample locations
const locations = ["강남역", "마포구", "홍대입구", "여의도", "종로", "이태원"]

// 테마 토글 버튼을 위한 클라이언트 컴포넌트
function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // 마운트 이후에만 렌더링하여 하이드레이션 오류 방지
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return <div className="w-9 h-9" />; // 마운트 전에는 빈 공간만 표시
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full"
    >
      {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">테마 변경</span>
    </Button>
  );
}

export default function Home() {
  const [location, setLocation] = useState("")
  const [detectingLocation, setDetectingLocation] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const router = useRouter()

  // Simulate location detection
  const detectLocation = () => {
    setDetectingLocation(true)
    setTimeout(() => {
      setLocation("강남역")
      setDetectingLocation(false)
    }, 1500)
  }

  // Handle search
  const handleSearch = () => {
    if (location) {
      router.push(`/search?location=${encodeURIComponent(location)}`)
    }
  }

  return (
    <main className="min-h-screen bg-background transition-colors duration-300 flex flex-col lg:py-24 bg-orange-200">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      
      {/* 데스크톱에서 배경 구분을 위한 요소 */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-b from-orange-50 to-amber-50 dark:from-orange-950/10 dark:to-amber-950/10 -z-10"></div>
      
      <div className="container max-w-md lg:max-w-4xl mx-auto px-4 py-8 flex-grow flex flex-col rounded-xl lg:border-1 lg:border-white">
        {/* Header */}
        <header className="flex justify-end items-center mb-4 lg:mb-6 lg:px-4">
          <ThemeToggle />
        </header>

        {/* Main Content - Centered */}
        <div className="flex-grow flex flex-col items-center">
          <div className="w-full max-w-sm lg:max-w-full text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-2"
            >
              <LunchieCharacter className="opacity-90" />
            </motion.div>
            
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-orange-500">점심 메뉴 추천</h2>
            <p className="text-muted-foreground mb-8 lg:text-lg">지금 위치에서 딱 맞는 점심 메뉴를 찾아드려요</p>
            
            <div className="flex flex-col m-4 p-4 lg:p-8 rounded-xl bg-orange-300 lg:w-[80%] lg:mx-auto">
              <div className="relative mb-4">
                <Input
                  placeholder="현재 위치를 입력하세요"
                  value={location}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                  className="pr-10 rounded-xl h-12 lg:h-14 text-base lg:text-lg shadow-md"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground" />
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs lg:text-sm text-muted-foreground p-0 h-auto"
                  onClick={detectLocation}
                  disabled={detectingLocation}
                >
                  {detectingLocation ? "위치 찾는 중..." : "현재 위치 사용하기"}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="link" size="sm" className="text-xs lg:text-sm text-muted-foreground p-0 h-auto ml-4">
                      최근 위치
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {locations.map((loc) => (
                      <DropdownMenuItem key={loc} onClick={() => setLocation(loc)}>
                        {loc}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button
                className="w-full py-6 lg:py-7 text-lg lg:text-xl font-bold rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg mb-4 flex items-center justify-center"
                onClick={handleSearch}
                disabled={!location}
              >
                <Search className="mr-2 h-5 w-5 lg:h-6 lg:w-6" />
                <span>맛집 찾기</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm lg:text-base text-muted-foreground pt-4 lg:mt-8">
          <p>점심 메뉴 고민 끝! © 2025 점심이</p>
        </footer>
      </div>
    </main>
  )
}

