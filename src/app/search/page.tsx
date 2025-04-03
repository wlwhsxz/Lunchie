"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { MapPin, ChevronDown, Sun, Moon, Filter, Utensils, TrendingUp, Wallet, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Sample restaurant data
const sampleRestaurants = [
  {
    id: 1,
    name: "햇살 카페",
    distance: "350m",
    cuisine: "카페",
    rating: 4.5,
    price: "₩₩",
    image: "/placeholder.svg?height=120&width=200",
    trending: true,
  },
  {
    id: 1,
    name: "햇살 카페",
    distance: "350m",
    cuisine: "카페",
    rating: 4.5,
    price: "₩₩",
    image: "/placeholder.svg?height=120&width=200",
    trending: true,
  },
  {
    id: 1,
    name: "햇살 카페",
    distance: "350m",
    cuisine: "카페",
    rating: 4.5,
    price: "₩₩",
    image: "/placeholder.svg?height=120&width=200",
    trending: true,
  },
  {
    id: 1,
    name: "햇살 카페",
    distance: "350m",
    cuisine: "카페",
    rating: 4.5,
    price: "₩₩",
    image: "/placeholder.svg?height=120&width=200",
    trending: true,
  },{
    id: 1,
    name: "햇살 카페",
    distance: "350m",
    cuisine: "카페",
    rating: 4.5,
    price: "₩₩",
    image: "/placeholder.svg?height=120&width=200",
    trending: true,
  },
  {
    id: 2,
    name: "서울 키친",
    distance: "500m",
    cuisine: "한식",
    rating: 4.7,
    price: "₩₩₩",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 3,
    name: "신선한 샐러드",
    distance: "200m",
    cuisine: "건강식",
    rating: 4.2,
    price: "₩₩",
    image: "/placeholder.svg?height=120&width=200",
    trending: true,
  },
  {
    id: 4,
    name: "파스타 천국",
    distance: "450m",
    cuisine: "양식",
    rating: 4.4,
    price: "₩₩₩",
    image: "/placeholder.svg?height=120&width=200",
  },
  {
    id: 5,
    name: "버거 조인트",
    distance: "600m",
    cuisine: "패스트푸드",
    rating: 4.3,
    price: "₩₩",
    image: "/placeholder.svg?height=120&width=200",
  },
]

// Cuisine types
const cuisineTypes = ["전체", "한식", "카페", "건강식", "양식", "패스트푸드", "일식", "중식"]

// Restaurant Card Component
interface Restaurant {
  id: number;
  name: string;
  distance: string;
  cuisine: string;
  rating: number;
  price: string;
  image: string;
  trending?: boolean;
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg rounded-xl">
      <CardContent className="p-0">
        <div className="flex flex-row lg:flex-col">
          <div className="w-1/3 lg:w-full lg:h-40">
            <img
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="w-2/3 lg:w-full p-4">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-base lg:text-lg">{restaurant.name}</h3>
              <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded-full">
                ★ {restaurant.rating}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <Badge variant="outline" className="flex items-center gap-1 text-xs rounded-full py-1">
                <MapPin className="h-3 w-3" /> {restaurant.distance}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-xs rounded-full py-1">
                <Utensils className="h-3 w-3" /> {restaurant.cuisine}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-xs rounded-full py-1">
                <Wallet className="h-3 w-3" /> {restaurant.price}
              </Badge>
            </div>

            <Button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2" size="sm">
              상세 보기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

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
    </Button>
  );
}

// 검색 파라미터를 사용하는 컴포넌트를 분리합니다
function SearchContent() {
  const searchParams = useSearchParams()
  const location = searchParams.get("location") || ""
  const router = useRouter()

  const [restaurants, setRestaurants] = useState(sampleRestaurants)
  const [filteredRestaurants, setFilteredRestaurants] = useState(sampleRestaurants)
  const [selectedCuisine, setSelectedCuisine] = useState("전체")
  const [priceRange, setPriceRange] = useState([1, 3])
  const [maxDistance, setMaxDistance] = useState(1000)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 검색 위치에 따라 맛집 데이터 로딩 (실제로는 API 호출)
    const loadRestaurants = async () => {
      setIsLoading(true)
      // API 호출 대신 샘플 데이터 사용
      setTimeout(() => {
        // 결과를 랜덤하게 섞어서 다른 결과처럼 보이게 함
        const shuffled = [...sampleRestaurants].sort(() => 0.5 - Math.random())
        setRestaurants(shuffled)
        setFilteredRestaurants(shuffled)
        setIsLoading(false)
      }, 1000)
    }

    if (location) {
      loadRestaurants()
    } else {
      // 위치 정보가 없으면 홈으로 리다이렉트
      router.push("/")
    }
  }, [location, router])

  // Apply filters to restaurants
  const applyFilters = () => {
    let filtered = restaurants

    // Filter by cuisine
    if (selectedCuisine !== "전체") {
      filtered = filtered.filter((restaurant) => restaurant.cuisine === selectedCuisine)
    }

    // Filter by price (₩ count)
    filtered = filtered.filter((restaurant) => {
      const priceCount = restaurant.price.length
      return priceCount >= priceRange[0] && priceCount <= priceRange[1]
    })

    // Filter by distance
    filtered = filtered.filter((restaurant) => Number.parseInt(restaurant.distance.replace("m", "")) <= maxDistance)

    setFilteredRestaurants(filtered)
  }

  // Apply filters when filter values change
  useEffect(() => {
    applyFilters()
  }, [selectedCuisine, priceRange, maxDistance, restaurants])
  
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-4 lg:mb-8">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.push("/")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </Button>
          <h1 className="text-xl lg:text-2xl font-semibold text-orange-600">{decodeURIComponent(location)} 주변 맛집</h1>
        </div>
        <ThemeToggle />
      </header>

      {/* 필터 섹션 */}
      <div className="mb-4 lg:mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-medium">맛집 검색 결과</h2>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4" />
            필터
          </Button>
        </div>

        {isFilterOpen && (
          <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 shadow-md mb-4 animate-in slide-in-from-top">
            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">음식 종류</h3>
              <div className="flex flex-wrap gap-2">
                {cuisineTypes.map((cuisine) => (
                  <Badge
                    key={cuisine}
                    variant={selectedCuisine === cuisine ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer",
                      selectedCuisine === cuisine
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "hover:bg-orange-100 dark:hover:bg-orange-900/20"
                    )}
                    onClick={() => setSelectedCuisine(cuisine)}
                  >
                    {cuisine}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-medium mb-2">가격대: {Array(priceRange[1]).fill("₩").slice(priceRange[0] - 1).join("")}</h3>
              <Slider
                defaultValue={priceRange}
                min={1}
                max={3}
                step={1}
                onValueChange={setPriceRange}
                className="mb-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>저렴</span>
                <span>보통</span>
                <span>고급</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">최대 거리: {maxDistance}m</h3>
              <Slider
                defaultValue={[maxDistance]}
                min={100}
                max={1000}
                step={100}
                onValueChange={(value) => setMaxDistance(value[0])}
              />
            </div>
          </div>
        )}
      </div>

      {/* 맛집 목록 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {isLoading ? (
          // 로딩 상태
          Array(4).fill(0).map((_, index) => (
            <Card key={index} className="overflow-hidden transition-all rounded-xl animate-pulse">
              <CardContent className="p-0">
                <div className="flex flex-row lg:flex-col">
                  <div className="w-1/3 lg:w-full h-32 lg:h-40 bg-slate-200 dark:bg-slate-800"></div>
                  <div className="w-2/3 lg:w-full p-4">
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded mb-3 w-2/3"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded mb-2 w-1/2"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded mb-4 w-1/3"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-full mt-3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredRestaurants.length > 0 ? (
          filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id + Math.random()} restaurant={restaurant} />
          ))
        ) : (
          <div className="col-span-2 py-12 text-center">
            <p className="text-muted-foreground">
              검색 조건에 맞는 맛집이 없습니다. 필터를 조정해 보세요.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// 메인 컴포넌트에서는 Suspense로 감싸줍니다
export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background transition-colors duration-300">
      {/* 데스크톱에서 배경 구분을 위한 요소 */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-b from-orange-50 to-amber-50 dark:from-orange-950/10 dark:to-amber-950/10 -z-10"></div>
      
      <div className="container max-w-md lg:max-w-4xl mx-auto px-4 py-4 lg:py-8">
        <Suspense fallback={
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        }>
          <SearchContent />
        </Suspense>
      </div>
    </main>
  )
} 