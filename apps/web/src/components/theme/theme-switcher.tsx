'use client'

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

export function ThemeSwitcher() {
    const {setTheme} = useTheme()
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Sun className="size-4 dark:invisible dark:size-0"/>
                    <Moon className="invisible size-0 dark:visible dark:size-4"/>
                    <span className="sr-only">Toggle Theme</span>
                </Button>
            </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
                    <Separator className="bg-gray-700"/>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
                    <Separator className="bg-gray-700"/>
                    <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
                    <Separator className="bg-gray-700 invert:1"/>
                </DropdownMenuContent>
            
        </DropdownMenu>
    )
}