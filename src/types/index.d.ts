import { registerSchema } from "@/lib/validations/auth";

export type Direction = "ltr" | "rtl";

export type AuthFormSchema = z.infer<typeof registerSchema>;

export type RegisterStatus = "success" | "error";

export interface CardProps {
  front: string;
  back: string;
  reviewed: boolean;
  active: boolean;
}
