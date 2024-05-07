import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React from "react";

export type SelectOptions = {
  label: string;
  value: string;
};

export interface SelectProps {
  className?: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  options: SelectOptions[];
  heading: string;
}

export function SelectInput({
  options,
  onChange,
  value,
  placeholder,
  heading,
}: SelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command
          onKeyDown={(e) => {
            if (e.key === "Escape" || e.key === "Enter") {
              setOpen(false);
            }
          }}
        >
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No Result</CommandEmpty>
            <CommandGroup heading={heading} onClick={() => setOpen(false)}>
              {options.map((item) => (
                <CommandItem
                  value={item.value}
                  key={item.value}
                  onSelect={onChange}
                  className="capitalize"
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      item.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
