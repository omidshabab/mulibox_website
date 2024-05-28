import { registerSchema } from "@/lib/validations/auth";

export type Direction = "ltr" | "rtl";

export type AuthFormSchema = z.infer<typeof registerSchema>;

export type RegisterStatus = "success" | "error";
