import { Form, FormField } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { englishBricolageGrotesqueFont } from "@/lib/fonts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { registerSchema } from "@/lib/validations/auth"
import React from "react"
import { AuthFormSchema } from "@/types"
import GoogleButton from "./GoogleButton"
import { signIn } from "next-auth/react"

const AuthForm = () => {
     const tRegister = useTranslations("register")

     const [isLoading, setIsLoading] = React.useState<boolean>(false)
     const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)

     const form = useForm<AuthFormSchema>({
          resolver: zodResolver(registerSchema)
     })

     async function onSubmit(values: AuthFormSchema) {
          setIsLoading(true);

          toast.promise(signIn("email", {
               email: values.email,
               redirect: false,
          }).then(async (callback) => {
               if (!callback) return

               console.log("values are: ", values.email)
          }).finally(() => {
               setIsLoading(false)
          }), {
               loading: `${tRegister("in_progress")}`,
          })
     }

     function googleRegister() {
          setIsGoogleLoading(true);

          toast.promise(signIn("google", {
               redirect: false,
          }).then((_) => {
               setIsGoogleLoading(false);
          }), {
               loading: `${tRegister("in_progress")}`,
          })
     }

     function onError(values: AuthFormSchema) {
          return toast.error(`${values}`)
     }

     return (
          <div className="flex flex-col gap-y-10">
               <div className="flex gap-2">
                    <GoogleButton
                         onClick={googleRegister}
                         disabled={isLoading || isGoogleLoading}>
                         {tRegister("google")}
                    </GoogleButton>
               </div>
               <div className="text-[30px] text-slate-800 font-bold leading-[3.5rem] cursor-text">
                    {tRegister("description")}
               </div>
               <Form {...form} formState={form.formState}>
                    <form
                         onSubmit={form.handleSubmit(onSubmit)}
                         onError={form.handleSubmit(onError)}
                         className="flex flex-col gap-y-10">
                         <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                   <Input
                                        id="email"
                                        dir="ltr"
                                        placeholder="hey@mulibox.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        autoFocus
                                        aria-autocomplete="none"
                                        disabled={isLoading || isGoogleLoading}
                                        className={cn(
                                             "text-[30px] caret-primary border-b text-slate-800 border-opacity-20 text-center py-3",
                                             englishBricolageGrotesqueFont.className,
                                        )}
                                        {...field} />
                              )}
                         />
                         <div
                              className={cn("relative")}>
                              <Button
                                   onClick={() => { }}
                                   size="lg"
                                   disabled={isLoading || isGoogleLoading}
                                   className="flex w-min text-[20px] font-bold py-[30px] px-[25px] rounded-[12px] transform hover:-translate-y-1 transition duration-400 z-20"
                                   variant="default">
                                   {tRegister("submit_email")}
                              </Button>
                         </div>
                    </form>
               </Form>
          </div>
     );
}

export default AuthForm;