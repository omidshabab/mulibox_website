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

     const [email, setEmail] = React.useState<string>("")

     const form = useForm<AuthFormSchema>({
          resolver: zodResolver(registerSchema),
          defaultValues: {
               email,
          },
     })

     async function onSubmit(values: AuthFormSchema) {
          setIsLoading(true);

          toast.loading(`${tRegister("in_progress")}`,)

          const signInResult = await signIn("email", {
               email: values.email,
               redirect: false,
          })

          setIsLoading(false)

          toast.dismiss()

          if (!signInResult?.ok) {
               return toast.error("Something went wrong. Try again later.", { duration: Infinity, closeButton: true })
          }

          return toast.success("Check your email to verify and register", { duration: Infinity, closeButton: true })
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
               <div className="text-[25px] sm:text-[30px] text-slate-800 font-bold leading-[3rem] sm:leading-[3.5rem] cursor-text">
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
                                             "text-[25px] sm:text-[30px] caret-primary border-b text-slate-800 border-black/5 focus:border-black/10 transition-opacity duration-500 text-center py-3",
                                             englishBricolageGrotesqueFont.className,
                                        )}
                                        {...field} />
                              )}
                         />
                         <div
                              className="relative flex gap-5">
                              <Button
                                   onClick={() => { }}
                                   size="lg"
                                   disabled={isLoading || isGoogleLoading}
                                   className="flex w-min font-bold px-[20px] py-[25px] sm:px-[25px] sm:py-[30px] rounded-[12px] transform hover:-translate-y-1"
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