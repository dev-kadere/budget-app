import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  className?: string;
}

function StatsCard({ title, value, className }: StatsCardProps) {
  return (
    <Card className={`text-center ${className || ""}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-xl font-bold text-primary">
          ksh {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default StatsCard;
