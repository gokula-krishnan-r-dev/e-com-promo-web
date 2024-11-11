"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsCom({ children, defaultValue, onchange }: any) {
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
  method?: string;
  router?: any;
}

const DynamicTabs: React.FC<DynamicTabsProps> = ({
  defaultValue,
  tabs,
  method,
  router,
}) => {
  return (
    <div className="w-full">
      <TabsCom defaultValue={defaultValue}>
        <TabsList className="w-max">
          {tabs.map((tab) => (
            <TabsTrigger
              disabled={method && defaultValue !== tab.value ? true : false}
              key={tab.value}
              value={tab.value}
              onClick={() => {
                if (router) {
                  router.push(`?tab=${tab.value}`);
                } else {
                  return;
                }
              }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <div className="pt-3">{tab.content}</div>
          </TabsContent>
        ))}
      </TabsCom>
    </div>
  );
};

export default DynamicTabs;
