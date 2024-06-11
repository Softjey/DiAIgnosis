import { Popover, PopoverTrigger, PopoverContent, PopoverProps } from "@nextui-org/react";
import React, { useState } from "react";

interface Props extends Omit<PopoverProps, "children"> {
  children: React.ReactElement;
}

const SoonAvailablePopover: React.FC<Props> = ({ children, ...rest }) => {
  const [open, setOpen] = useState(false);

  const modifiedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
    });
  });

  return (
    <Popover isOpen={open} onOpenChange={setOpen} color="warning" showArrow {...rest}>
      <PopoverTrigger>
        <div>{modifiedChildren}</div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-tiny">This feature will be available soon</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SoonAvailablePopover;
