"use client"

import { RoButton } from "./ro_button"
import { useEffect, useState } from "react"
import { AttributeBar } from "./attribute-bar";
import { TrashCounter } from "./trash-counter";
import { useGameData } from "@/context/GameDataProvider";

interface Attribute {
  name: string;
  value: number | string;
  color: string;
}
export interface MainProps {
  handleInventory: () => void;
  handleChat: () => void;
  handleFight: () => void;
}

export function Home({ handleInventory, handleChat, handleFight }: MainProps) {
  const { userInfo } = useGameData();
  const [attributes, setAttributes] = useState<Attribute[]>([]);




  useEffect(() => {
    console.log(userInfo)
    const attributes: Attribute[] = [] 
    attributes.push({ name: "Attack", value: userInfo?.robot?.attack || 0, color: "bg-red-500" })
    attributes.push({ name: "Energy", value: userInfo?.robot?.energy || 0, color: "bg-cyan-400" })

    attributes.push({ name: "Speed", value: userInfo?.robot?.speed || 0, color: "bg-yellow-400" })
    attributes.push({ name: "Personality", value: userInfo?.robot?.personality || 0, color: "bg-orange-400" })
    setAttributes(attributes)

  }, [userInfo]);




  return (
    <div className="flex flex-col items-center justify-between h-full">

      {/* Top Trash Counter */}
      <div className="w-full ">
        <TrashCounter value={userInfo?.trash || 0} />
      </div>


      {/* Attribute Bars */}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 w-[280px]">
          {attributes?.map((attr) => (
            <AttributeBar
              key={attr.name}
              name={attr.name}
              value={attr.value}
              color={attr.color}
            />
          ))}
        </div>
        
        {/* Bottom Buttons */}
        <div className="flex gap-4 mt-4">
          <RoButton variant="inventory" onClick={handleInventory}>
            Inventory
          </RoButton>
          <RoButton variant="fight" onClick={handleFight}>
            Fight
          </RoButton>
          <RoButton variant="chat" onClick={handleChat}>
            Chat
          </RoButton>
        </div>
      </div>
    </div>
  )
}

