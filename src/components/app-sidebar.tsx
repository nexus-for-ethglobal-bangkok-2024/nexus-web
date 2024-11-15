import * as React from "react"
import { GalleryVerticalEnd, Minus, Plus } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      items: [
        {
          title: "MarketOverview",
          url: "/dashboard/market-overview",
          isActive: true,
        },
      ]
    },
    {
      title: "Assets Balance",
      items: [
        {
          title: "Overview",
          url: "/dashboard/assets-balance/overview",
          isActive: true,
        },
        {
          title: "Crypto Asset",
          url: "/dashboard/assets-balance/crypto",
        },
        {
          title: "Stock Asset",
          url: "/dashboard/assets-balance/stock",
        },
        {
          title: "Forex Asset",
          url: "/dashboard/assets-balance/forex",
        },
      ],
    },
    {
      title: "Trade Crypto",
    
      items: [
        {
          title: "Crypto Market",
          url: "/dashboard/trade-crypto/market",
          
        },
        {
          title: "Crypto Swap",
          url: "/dashboard/trade-crypto/swap",
        },
        {
          title: "Crypto Buy",
          url: "/dashboard/trade-crypto/buy",
        },
        {
          title: "Crypto Sell",
          url: "/dashboard/trade-crypto/sell",
        },
      ],
    },
    {
      title: "Trade Stock",
     
      items: [
        {
          title: "Stock Market",
          url: "/dashboard/trade-stock/market",
          
        },
        {
          title: "Stock Buy",
          url: "/dashboard/trade-stock/buy",
        },
        {
          title: "Stock Sell",
          url: "/dashboard/trade-stock/sell",
        },
      ],
    },
    {
      title: "Trade Forex",
     
      items: [
        {
          title: "Forex Market",
          url: "/dashboard/trade-forex/market",
        },
        {
          title: "Forex Swap",
          url: "/dashboard/trade-forex/swap",
        },
        {
          title: "Forex Buy",
          url: "/dashboard/trade-forex/buy",
        },
        {
          title: "Forex Sell",
          url: "/dashboard/trade-forex/sell",
        },
      ],
    },
    // {
    //   title: "Community",
    //   url: "#",
    //   items: [
    //     {
    //       title: "Contribution Guide",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Nexus</span>
                  <span className="">Trade Stock,Crypto,Forex</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
       
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item, index) => (
              <Collapsible
                key={item.title}
                defaultOpen={index === 0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={item.isActive}
                            >
                              <a href={item.url}>{item.title}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
