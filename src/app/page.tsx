import { Header } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { StockFeature } from "@/components/landing/stock";
import { CryptoFeature } from "@/components/landing/crypto";
import { ForexFeature } from "@/components/landing/forex";
import { Testimonials } from "@/components/landing/testimonials";
import { Contacts } from "@/components/landing/contact";

export default function Home() {
  return (
    <div>
     <Header></Header>
     <Hero></Hero>

     <StockFeature></StockFeature>
     <CryptoFeature></CryptoFeature>
     <ForexFeature></ForexFeature>

     <Testimonials></Testimonials>
     <Contacts></Contacts>

     <Footer></Footer>
    </div>
  );
}
