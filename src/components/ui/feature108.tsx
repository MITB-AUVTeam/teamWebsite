import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge = "Technical Details",
  heading = "Engineered for performance",
  description = "Discover the cutting-edge technology that powers our autonomous underwater vehicle.",
  tabs = [],
}: Feature108Props) => {
  if (!tabs.length) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <Badge variant="outline" className="tracking-widest uppercase text-blue-500 border-blue-500/50">{badge}</Badge>
          <h1 className="max-w-2xl text-4xl md:text-5xl font-semibold tracking-tight">
            {heading}
          </h1>
          <p className="text-slate-400 text-lg">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10 mb-8">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-400 transition-colors hover:text-slate-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-3xl bg-slate-900/50 border border-slate-800 p-6 lg:p-16 shadow-2xl">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-16 outline-none animate-in fade-in-50 duration-500 data-[state=inactive]:hidden"
              >
                <div className="flex flex-col gap-5 order-2 lg:order-1">
                  <Badge variant="outline" className="w-fit bg-black text-blue-400 border-blue-500/30">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-4xl tracking-tight text-slate-50">
                    {tab.content.title}
                  </h3>
                  <p className="text-slate-400 lg:text-lg leading-relaxed">
                    {tab.content.description}
                  </p>
                  <Button className="mt-4 w-fit gap-2 rounded-full px-8 bg-blue-600 hover:bg-blue-500 text-white" size="lg">
                    {tab.content.buttonText}
                  </Button>
                </div>
                <div className="order-1 lg:order-2 w-full rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
                  <img
                    src={tab.content.imageSrc}
                    alt={tab.content.imageAlt}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature108 };
