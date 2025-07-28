import React from "react";
import { toPersianDigits } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PersianNumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showSeparator?: boolean; // اگر true باشد سه‌رقمی جدا می‌کند
}

export const PersianNumberInput: React.FC<PersianNumberInputProps> = ({
  value,
  onChange,
  showSeparator = true,
  className,
  ...props
}) => {
  // تبدیل مقدار به انگلیسی برای ذخیره
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // تبدیل ارقام فارسی به انگلیسی
    const persianToEnglish = (str: string) =>
      str.replace(/[۰-۹]/g, d => String.fromCharCode(d.charCodeAt(0) - 1728));
    // حذف جداکننده‌ها برای مقدار اصلی
    const raw = persianToEnglish(e.target.value.replace(/[,٬]/g, ""));
    // ساخت یک event جدید با مقدار انگلیسی
    const event = {
      ...e,
      target: {
        ...e.target,
        value: raw
      }
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  // مقدار نمایشی: فارسی و جداشده
  let displayValue = value?.toString() || "";
  if (showSeparator && displayValue) {
    // فقط ارقام را جداکننده بزن
    const number = Number(displayValue.replace(/[^\d]/g, ""));
    if (!isNaN(number)) {
      displayValue = number.toLocaleString("fa-IR").replace(/٬/g, ",");
    }
  }
  displayValue = toPersianDigits(displayValue);

  return (
    <input
      {...props}
      className={cn(className)}
      value={displayValue}
      onChange={handleChange}
      inputMode="numeric"
      autoComplete="off"
    />
  );
}; 