import { format } from "date-fns";
import {
  Button,
  DatePicker,
  Popover,
  PopoverAction,
  PopoverContent,
} from "keep-react";
import { Calendar } from "phosphor-react";
import { useState } from "react";

const DatePickerComponent = ({ selectedDate, onDateChange, placeholder }) => {
  const [date, setDate] = useState(selectedDate);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateChange(newDate);
  };

  return (
    <Popover showArrow={false} placement="bottom-start">
      <PopoverAction asChild>
        <Button
          color="secondary"
          size="lg"
          className="justify-start gap-2 border border-metal-100"
          variant="outline"
        >
          <Calendar size={20} className="text-metal-400 dark:text-white" />
          {date ? (
            format(date ?? new Date(), "PPP")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverAction>
      <PopoverContent className="z-50 max-w-min">
        <DatePicker
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          showOutsideDays={true}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerComponent;
