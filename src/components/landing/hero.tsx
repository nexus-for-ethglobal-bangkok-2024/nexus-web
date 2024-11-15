import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Hero = () => (
  <div className="w-full  py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">We&apos;re live!</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-lg tracking-tighter text-left font-regular">
            One Platform to Trade Them All : Stocks, Crypto, and Forex
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
            Our platform offers a unified solution for trading stocks, cryptocurrencies, and forex. Easily manage and swap your assets across these markets in real-time with a seamless, user-friendly interface. Whether you're diversifying your investments or seeking fast, flexible trading options, we bring all the tools you need to succeed in one powerful platform.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button size="lg" className="gap-4" variant="outline">
              Jump on a call <PhoneCall className="w-4 h-4" />
            </Button>
            <Button size="lg" className="gap-4">
              Sign up here <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="bg-muted rounded-md aspect-square"></div>
      </div>
    </div>
  </div>
);