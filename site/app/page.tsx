import Navbar        from "@/components/Navbar"
import Hero          from "@/components/Hero"
import FoodShowcase  from "@/components/FoodShowcase"
import Menu          from "@/components/Menu"
import Delivery      from "@/components/Delivery"
import Location      from "@/components/Location"
import Footer        from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FoodShowcase />
        <Menu />
        <Delivery />
        <Location />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
