import { Button } from "@/components/ui/button";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsCom({ children, defaultValue }: any) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      {children}
    </Tabs>
  );
}
import React from "react";

interface Tab {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface DynamicTabsProps {
  defaultValue: string;
  tabs: Tab[];
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({ defaultValue, tabs }) => {
  return (
    <div className="w-full">
      <TabsCom defaultValue={defaultValue}>
        <TabsList className="w-max">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="p-4">{tab.content}</div>
          </TabsContent>
        ))}
      </TabsCom>
    </div>
  );
};

export default DynamicTabs;
